import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, Video, ArrowLeft, RotateCcw, X, ArrowRight } from 'lucide-react';
import { Button, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function CameraCapture({ title, side, onCapture, onBack }) {
    const { t } = useTranslation();
    const [mode, setMode] = useState('photo'); // 'photo' | 'video'
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [error, setError] = useState(null);

    const [gallery, setGallery] = useState([]);

    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);

    const MAX_RECORDING_SECONDS = 15;

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1920, height: 1080, frameRate: 30, facingMode: 'environment' },
                audio: false
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setError(null);
        } catch (err) {
            console.error("Error accessing camera:", err);
            setError(t('camera.error_access'));
        }
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
    };

    useEffect(() => {
        startCamera();
        return () => {
            stopCamera();
        };
    }, []);

    const handleComplete = () => {
        stopCamera();
        onCapture(gallery);
    };

    const removeMedia = (indexToRemove) => {
        setGallery(prev => {
            const newGallery = [...prev];
            URL.revokeObjectURL(newGallery[indexToRemove].url);
            newGallery.splice(indexToRemove, 1);
            return newGallery;
        });
    };

    const takePhoto = useCallback(() => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0);

            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                setGallery(prev => [...prev, { type: 'image', blob, url, side, id: Date.now() }]);
            }, 'image/jpeg', 0.95);
        }
    }, [side]);

    const startRecording = useCallback(() => {
        if (videoRef.current?.srcObject) {
            chunksRef.current = [];
            try {
                const mediaRecorder = new MediaRecorder(videoRef.current.srcObject, {
                    mimeType: 'video/webm;codecs=vp8,opus'
                });

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        chunksRef.current.push(e.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    setGallery(prev => [...prev, { type: 'video', blob, url, side, id: Date.now() }]);
                };

                mediaRecorderRef.current = mediaRecorder;
                mediaRecorder.start(100);
                setIsRecording(true);
                setRecordingTime(0);

                timerRef.current = setInterval(() => {
                    setRecordingTime((prev) => {
                        if (prev >= MAX_RECORDING_SECONDS - 1) {
                            stopRecording();
                            return MAX_RECORDING_SECONDS;
                        }
                        return prev + 1;
                    });
                }, 1000);

            } catch (err) {
                console.error("MediaRecorder error:", err);
                setError(t('camera.error_support'));
            }
        }
    }, [side, t]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(timerRef.current);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    return (
        <div className="d-flex flex-column bg-dark z-3"
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                overflow: 'hidden',
                paddingBottom: 'env(safe-area-inset-bottom)' // Handle iPhone home indicator
            }}>

            {/* Top Navigation Bar - Now solid and separate */}
            <div className="p-3 d-flex justify-content-between align-items-center bg-black bg-opacity-75 text-white">
                <div className="d-flex align-items-center gap-3">
                    <Button
                        variant="dark"
                        className="rounded-circle d-flex align-items-center justify-content-center p-2 border-secondary"
                        onClick={() => { stopCamera(); onBack(); }}
                    >
                        <ArrowLeft size={24} />
                    </Button>
                    <div className="fw-bold fs-5 text-light">
                        {title}
                    </div>
                </div>

                {gallery.length > 0 && !isRecording && (
                    <Button
                        onClick={handleComplete}
                        variant="primary"
                        className="rounded-pill d-flex align-items-center gap-2 fw-medium px-4 py-2 shadow-sm"
                    >
                        {t('camera.continue')} <ArrowRight size={18} />
                    </Button>
                )}
            </div>

            {/* Main Camera Viewport - Takes available space but keeps aspect ratio clean */}
            <div className="flex-grow-1 position-relative bg-black d-flex flex-column" style={{ minHeight: 0 }}>
                {error ? (
                    <div className="text-center p-4 text-white m-auto">
                        <p className="text-danger mb-3">{error}</p>
                        <Button variant="outline-light" onClick={startCamera}>
                            <RotateCcw size={18} className="me-2" /> {t('camera.retry')}
                        </Button>
                    </div>
                ) : (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                    />
                )}

                {/* Recording Indicator - kept inside camera view for visibility */}
                {isRecording && (
                    <div className="position-absolute top-0 end-0 p-3">
                        <Badge bg="danger" className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill fs-6 heartbeat">
                            <div className="rounded-circle bg-white" style={{ width: 8, height: 8 }} />
                            00:{recordingTime.toString().padStart(2, '0')}
                        </Badge>
                    </div>
                )}
            </div>

            {/* Control Area - Completely separated from the camera feed */}
            <div className="bg-black text-white p-3 d-flex flex-column gap-3 shadow-lg" style={{ borderTop: '1px solid #333' }}>

                {/* Gallery Section */}
                <div className="w-100 overflow-auto d-flex gap-2" style={{ scrollbarWidth: 'none', height: '60px' }}>
                    {gallery.map((item, idx) => (
                        <div key={item.id} className="position-relative flex-shrink-0 rounded overflow-hidden border border-secondary" style={{ width: 60, height: 60 }}>
                            <Button
                                variant="danger"
                                size="sm"
                                className="position-absolute top-0 end-0 p-0 m-1 rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: 16, height: 16, zIndex: 5 }}
                                onClick={() => removeMedia(idx)}
                            >
                                <X size={10} />
                            </Button>
                            {item.type === 'image' ? (
                                <img src={item.url} className="w-100 h-100 object-fit-cover opacity-75" alt="preview" />
                            ) : (
                                <div className="w-100 h-100 bg-secondary d-flex align-items-center justify-content-center text-white position-relative">
                                    <video src={item.url} className="position-absolute w-100 h-100 object-fit-cover opacity-50" />
                                    <Video size={16} className="position-relative z-1" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="d-flex align-items-center justify-content-center position-relative pt-2 pb-3">

                    {/* Mode Toggle - Left aligned */}
                    {!isRecording && (
                        <div className="position-absolute start-0 d-flex flex-column gap-2">
                            <Button
                                variant={mode === 'photo' ? 'secondary' : 'dark'}
                                className={`rounded-pill px-3 py-2 d-flex align-items-center gap-2 ${mode === 'photo' ? 'text-white border-secondary' : 'text-light opacity-75 border-0'}`}
                                onClick={() => setMode('photo')}
                                size="sm"
                            >
                                <Camera size={16} /> {t('camera.photo')}
                            </Button>
                            <Button
                                variant={mode === 'video' ? 'secondary' : 'dark'}
                                className={`rounded-pill px-3 py-2 d-flex align-items-center gap-2 ${mode === 'video' ? 'text-white border-secondary' : 'text-light opacity-75 border-0'}`}
                                onClick={() => setMode('video')}
                                size="sm"
                            >
                                <Video size={16} /> {t('camera.video')}
                            </Button>
                        </div>
                    )}

                    {/* Main Shutter Button - Centered */}
                    <div className="d-flex align-items-center justify-content-center" style={{ height: 80 }}>
                        {mode === 'photo' ? (
                            <button
                                onClick={takePhoto}
                                disabled={!!error}
                                className="rounded-circle border border-4 border-white d-flex align-items-center justify-content-center bg-transparent capture-btn"
                                style={{ width: 72, height: 72, transition: 'transform 0.1s' }}
                                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <div className="bg-white rounded-circle" style={{ width: 56, height: 56 }} />
                            </button>
                        ) : (
                            isRecording ? (
                                <button
                                    onClick={stopRecording}
                                    className="rounded-circle border border-4 border-danger d-flex align-items-center justify-content-center bg-transparent capture-btn"
                                    style={{ width: 72, height: 72, transition: 'transform 0.1s' }}
                                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <div className="bg-danger rounded" style={{ width: 28, height: 28 }} />
                                </button>
                            ) : (
                                <button
                                    onClick={startRecording}
                                    disabled={!!error}
                                    className="rounded-circle border border-4 border-danger d-flex align-items-center justify-content-center bg-transparent capture-btn"
                                    style={{ width: 72, height: 72, transition: 'transform 0.1s' }}
                                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <div className="bg-danger rounded-circle" style={{ width: 56, height: 56 }} />
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
