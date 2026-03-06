import React, { useState } from 'react';
import { Button, Row, Col, Card, ProgressBar, Alert, Badge } from 'react-bootstrap';
import { UploadCloud, CheckCircle2, AlertCircle, ArrowLeft, RefreshCw, Hand, Activity, Camera, Video, Download } from 'lucide-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import JSZip from 'jszip';

export default function Confirmation({ patientData, trialCode, capturedMedia, measurements, onBack, onComplete }) {
    const { t } = useTranslation();
    const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle' | 'uploading' | 'success' | 'error'
    const [progress, setProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [downloadStatus, setDownloadStatus] = useState('idle'); // 'idle' | 'zipping' | 'success' | 'error'
    const [hasDownloaded, setHasDownloaded] = useState(false);

    const handleDownloadZip = async () => {
        if (!patientData.patient_id) return;
        setDownloadStatus('zipping');

        try {
            const zip = new JSZip();
            const safeDate = patientData.enrollmentDate ? patientData.enrollmentDate.replace(/\//g, '') : 'nodate';
            const folderName = `${patientData.patient_id}_${safeDate}`;
            const folder = zip.folder(folderName);

            const joints = [
                'Thumb_CMC', 'Thumb_MCP', 'Thumb_IP',
                'Index_MCP', 'Index_PIP', 'Index_DIP',
                'Middle_MCP', 'Middle_PIP', 'Middle_DIP',
                'Ring_MCP', 'Ring_PIP', 'Ring_DIP',
                'Pinky_MCP', 'Pinky_PIP', 'Pinky_DIP'
            ];

            const headers = ['Name', 'Patient ID', 'Enrollment Date', 'Exported At', 'Trial Code'];
            joints.forEach(j => headers.push(`Left_${j}`));
            joints.forEach(j => headers.push(`Right_${j}`));

            const row = [
                `"${patientData.name || ''}"`,
                `"${patientData.patient_id || ''}"`,
                `"${patientData.enrollmentDate || ''}"`,
                `"${new Date().toISOString()}"`,
                `"${trialCode || ''}"`
            ];

            joints.forEach(j => row.push(`"${measurements?.left?.[j] || ''}"`));
            joints.forEach(j => row.push(`"${measurements?.right?.[j] || ''}"`));

            const csvString = headers.join(',') + '\n' + row.join(',');

            // Generate a Uint8Array with the UTF-8 BOM to ensure Excel opens it properly
            const encoder = new TextEncoder();
            const csvUint8Array = new Uint8Array([0xEF, 0xBB, 0xBF, ...encoder.encode(csvString)]);

            folder.file("patient_data.csv", csvUint8Array);

            const addMediaToFolder = (mediaArray, sidePrefix) => {
                mediaArray.forEach((media, index) => {
                    const ext = media.type === 'image' ? 'jpg' : 'webm';
                    const filename = `${patientData.patient_id}_${sidePrefix}_${index}.${ext}`;
                    folder.file(filename, media.blob);
                });
            };

            addMediaToFolder(capturedMedia.leftThumb, 'leftThumb');
            addMediaToFolder(capturedMedia.leftFull, 'leftFull');
            addMediaToFolder(capturedMedia.rightThumb, 'rightThumb');
            addMediaToFolder(capturedMedia.rightFull, 'rightFull');

            const content = await zip.generateAsync({ type: "blob" });
            const url = URL.createObjectURL(content);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${folderName}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setDownloadStatus('success');
            setHasDownloaded(true);
            setTimeout(() => setDownloadStatus('idle'), 3000);
        } catch (err) {
            console.error("ZIP Generation error:", err);
            setDownloadStatus('error');
            setTimeout(() => setDownloadStatus('idle'), 3000);
        }
    };

    const handleUpload = async () => {
        if (!patientData.patient_id) return;

        setUploadStatus('uploading');
        setProgress(0);

        // Utility to convert Blob to Base64
        const blobToBase64 = (blob) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        };

        try {
            const formData = new FormData();
            formData.append('patient_id', patientData.patient_id);
            formData.append('enrollment_date', patientData.enrollmentDate);

            // Generate CSV string internally for upload
            const joints = [
                'Thumb_CMC', 'Thumb_MCP', 'Thumb_IP',
                'Index_MCP', 'Index_PIP', 'Index_DIP',
                'Middle_MCP', 'Middle_PIP', 'Middle_DIP',
                'Ring_MCP', 'Ring_PIP', 'Ring_DIP',
                'Pinky_MCP', 'Pinky_PIP', 'Pinky_DIP'
            ];
            const headers = ['Name', 'Patient ID', 'Enrollment Date', 'Exported At', 'Trial Code'];
            joints.forEach(j => headers.push(`Left_${j}`));
            joints.forEach(j => headers.push(`Right_${j}`));
            const row = [
                `"${patientData.name || ''}"`,
                `"${patientData.patient_id || ''}"`,
                `"${patientData.enrollmentDate || ''}"`,
                `"${new Date().toISOString()}"`,
                `"${trialCode || ''}"`
            ];
            joints.forEach(j => row.push(`"${measurements?.left?.[j] || ''}"`));
            joints.forEach(j => row.push(`"${measurements?.right?.[j] || ''}"`));
            const csvString = headers.join(',') + '\n' + row.join(',');
            formData.append('csv_data', '\uFEFF' + csvString); // GAS can handle string with BOM directly

            // Convert and append Media
            const appendMediaFiles = async (mediaArray, prefix) => {
                for (let i = 0; i < mediaArray.length; i++) {
                    const base64 = await blobToBase64(mediaArray[i].blob);
                    formData.append(`file_${prefix}_${i}`, base64);
                }
            };

            await appendMediaFiles(capturedMedia.leftThumb, 'leftThumb');
            await appendMediaFiles(capturedMedia.leftFull, 'leftFull');
            await appendMediaFiles(capturedMedia.rightThumb, 'rightThumb');
            await appendMediaFiles(capturedMedia.rightFull, 'rightFull');

            // Artificial progress for GAS since it doesn't give real-time upload progress for base64 well
            const progressInterval = setInterval(() => {
                setProgress(prev => (prev < 90 ? prev + 10 : prev));
            }, 500);

            const API_URL = 'https://script.google.com/macros/s/AKfycbxgee-TmBYPDEE8CyzDOMeXehATqsKElySrgQz5xdxWUDBo4-TDvanZQFanh5yNs1b3/exec';

            const response = await axios.post(API_URL, formData);
            clearInterval(progressInterval);
            setProgress(100);

            if (response.data.status === 'success') {
                setUploadStatus('success');
            } else {
                throw new Error(response.data.message || 'Unknown GAS error');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            setProgress(0);
            setUploadStatus('error');
            setErrorMessage(error.message || t('confirmation.upload_failed'));
        }
    };

    const renderMediaGallery = (mediaArray = [], title, sideKey) => {
        if (mediaArray.length === 0) return (
            <Card className="border-0 bg-light text-center p-4 h-100 d-flex align-items-center justify-content-center">
                <Hand size={32} className="text-muted opacity-50 mb-2" />
                <small className="text-muted">{t('confirmation.no_captures', { side: t(sideKey) })}</small>
            </Card>
        );

        return (
            <Card className="border-0 bg-light p-2 h-100">
                <div className="fw-bold small text-muted mb-2 px-1 text-uppercase">{t(sideKey)} ({mediaArray.length})</div>
                <div className="d-flex overflow-auto gap-2 pb-2" style={{ scrollbarWidth: 'thin' }}>
                    {mediaArray.map((media) => (
                        <div key={media.id} className="position-relative flex-shrink-0 bg-dark rounded overflow-hidden" style={{ width: 100, height: 100 }}>
                            {media.type === 'image' ? (
                                <img src={media.url} alt="preview" className="w-100 h-100 object-fit-cover opacity-75" />
                            ) : (
                                <>
                                    <video src={media.url} className="w-100 h-100 object-fit-cover opacity-50" />
                                    <Video size={20} className="position-absolute top-50 start-50 translate-middle text-white z-1" />
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </Card>
        );
    };

    if (uploadStatus === 'success') {
        return (
            <div className="p-5 text-center">
                <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle mb-4" style={{ width: 80, height: 80 }}>
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="fw-bold mb-3">{t('confirmation.upload_complete')}</h2>
                <p className="text-muted mb-5">
                    {t('confirmation.complete_msg1')}<strong className="text-dark">{patientData.patient_id}</strong>{t('confirmation.complete_msg2')}
                    <br />{t('confirmation.uploaded_files', {
                        count: capturedMedia.leftThumb.length + capturedMedia.leftFull.length + capturedMedia.rightThumb.length + capturedMedia.rightFull.length
                    })}
                </p>
                <Button onClick={onComplete} variant="primary" size="lg" className="w-100 d-flex align-items-center justify-content-center gap-2 rounded-pill py-3 fw-bold shadow-sm transition-all">
                    {t('confirmation.capture_another')}
                </Button>
            </div>
        );
    }

    return (
        <div className="p-4 p-md-5">
            <div className="d-flex align-items-center mb-4 gap-3">
                <Button variant="light" className="rounded-circle d-flex align-items-center justify-content-center p-2 border-0 shadow-sm" onClick={onBack} disabled={uploadStatus === 'uploading'}>
                    <ArrowLeft size={24} />
                </Button>
                <h3 className="mb-0 fw-bold">{t('confirmation.title')}</h3>
            </div>

            <Card className="border-0 bg-light shadow-sm rounded-4 mb-4">
                <Card.Body>
                    <Row className="g-3">
                        <Col xs={6}>
                            <div className="small text-muted mb-1">{t('confirmation.name')}</div>
                            <div className="fw-medium">{patientData.name || '-'}</div>
                        </Col>
                        <Col xs={6}>
                            <div className="small text-muted mb-1">{t('confirmation.patient_id')}</div>
                            <div className="fw-bold text-primary">{patientData.patient_id || '-'}</div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Row className="g-3 mb-4">
                <Col xs={12} md={6}>
                    {renderMediaGallery(capturedMedia.leftThumb, 'Left Thumb', 'flow.left_thumb_title')}
                </Col>
                <Col xs={12} md={6}>
                    {renderMediaGallery(capturedMedia.leftFull, 'Left Full', 'flow.left_full_title')}
                </Col>
                <Col xs={12} md={6}>
                    {renderMediaGallery(capturedMedia.rightThumb, 'Right Thumb', 'flow.right_thumb_title')}
                </Col>
                <Col xs={12} md={6}>
                    {renderMediaGallery(capturedMedia.rightFull, 'Right Full', 'flow.right_full_title')}
                </Col>
            </Row>

            {(Object.keys(measurements.left || {}).length > 0 || Object.keys(measurements.right || {}).length > 0) && (
                <Card className="border-0 bg-white shadow-sm rounded-4 mb-5">
                    <Card.Body className="p-4">
                        <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                            <Activity size={16} className="text-primary" />
                            {t('confirmation.measurements')}
                        </h6>
                        <Row className="g-4">
                            <Col xs={12} md={6}>
                                <div className="small fw-bold text-muted text-uppercase mb-2 border-bottom pb-1">{t('confirmation.left_hand')}</div>
                                <div className="d-grid gap-2 text-sm" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
                                    {Object.entries(measurements.left || {}).map(([joint, value]) => (
                                        value && (
                                            <div key={`left-${joint}`} className="d-flex justify-content-between bg-light rounded px-2 py-1">
                                                <span className="text-secondary small">{joint.replace('_', ' ')}</span>
                                                <span className="fw-medium">{value}</span>
                                            </div>
                                        )
                                    ))}
                                    {Object.keys(measurements.left || {}).filter(k => measurements.left[k]).length === 0 && (
                                        <div className="text-muted small fst-italic">-</div>
                                    )}
                                </div>
                            </Col>
                            <Col xs={12} md={6}>
                                <div className="small fw-bold text-muted text-uppercase mb-2 border-bottom pb-1">{t('confirmation.right_hand')}</div>
                                <div className="d-grid gap-2 text-sm" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
                                    {Object.entries(measurements.right || {}).map(([joint, value]) => (
                                        value && (
                                            <div key={`right-${joint}`} className="d-flex justify-content-between bg-light rounded px-2 py-1">
                                                <span className="text-secondary small">{joint.replace('_', ' ')}</span>
                                                <span className="fw-medium">{value}</span>
                                            </div>
                                        )
                                    ))}
                                    {Object.keys(measurements.right || {}).filter(k => measurements.right[k]).length === 0 && (
                                        <div className="text-muted small fst-italic">-</div>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )}

            {
                uploadStatus === 'error' && (
                    <Alert variant="danger" className="d-flex align-items-start gap-3 border-0 rounded-4 mb-4">
                        <AlertCircle size={20} className="mt-1 flex-shrink-0" />
                        <div>
                            <strong>{t('confirmation.upload_failed')}</strong>
                            <div className="small opacity-75">{errorMessage}</div>
                        </div>
                    </Alert>
                )
            }

            <Row className="g-3">
                <Col xs={12} md={6} className={uploadStatus === 'uploading' ? 'd-none' : ''}>
                    <Button
                        onClick={handleDownloadZip}
                        variant={downloadStatus === 'error' ? 'danger' : (downloadStatus === 'success' ? 'success' : 'outline-primary')}
                        size="lg"
                        disabled={downloadStatus === 'zipping'}
                        className="w-100 d-flex align-items-center justify-content-center gap-2 rounded-pill py-3 fw-bold transition-all border-2"
                    >
                        {downloadStatus === 'zipping' ? (
                            <><RefreshCw size={20} className="spin" /> {t('confirmation.zipping')}</>
                        ) : downloadStatus === 'success' ? (
                            <><CheckCircle2 size={20} /> {t('confirmation.zip_success')}</>
                        ) : downloadStatus === 'error' ? (
                            <><AlertCircle size={20} /> {t('confirmation.zip_error')}</>
                        ) : (
                            <><Download size={20} /> {t('confirmation.download_zip')}</>
                        )}
                    </Button>
                </Col>

                <Col xs={12} md={uploadStatus === 'uploading' ? 12 : 6}>
                    {uploadStatus === 'uploading' ? (
                        <div className="px-2">
                            <div className="d-flex justify-content-between small fw-medium mb-2">
                                <span className="text-muted">{t('confirmation.uploading')}</span>
                                <span className="text-primary">{progress}%</span>
                            </div>
                            <ProgressBar now={progress} variant="primary" className="rounded-pill" style={{ height: 10 }} />
                        </div>
                    ) : (
                        <Button
                            onClick={handleUpload}
                            variant={uploadStatus === 'error' ? 'danger' : 'primary'}
                            size="lg"
                            className="w-100 d-flex align-items-center justify-content-center gap-2 rounded-pill py-3 fw-bold shadow-sm transition-all"
                        >
                            {uploadStatus === 'error' ? (
                                <><RefreshCw size={20} /> {t('confirmation.retry')}</>
                            ) : (
                                <><UploadCloud size={20} /> {t('confirmation.confirm_upload')}</>
                            )}
                        </Button>
                    )}
                </Col>
            </Row>

            {hasDownloaded && (
                <div className="mt-5 pt-4 border-top">
                    <p className="text-muted text-center mb-3">
                        <small>{t('confirmation.downloaded_msg') || 'You have downloaded the ZIP. You can now start a new patient enrollment or upload to the cloud.'}</small>
                    </p>
                    <Button onClick={onComplete} variant="outline-primary" size="lg" className="w-100 d-flex align-items-center justify-content-center gap-2 rounded-pill py-3 fw-bold transition-all border-2">
                        {t('confirmation.capture_another')}
                    </Button>
                </div>
            )}
        </div >
    );
}
