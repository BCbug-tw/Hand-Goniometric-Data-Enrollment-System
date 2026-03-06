import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Camera, ArrowRight, Video, Plus, Edit2, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PosePreviewMatrix({ media, onRetake, onConfirm, onBack }) {
    const { t } = useTranslation();

    // Mapping pose keys to their respective step numbers in the FlowManager
    // 2: Left Thumb, 4: Left Full, 6: Right Thumb, 8: Right Full
    const getStepForPose = (poseKey) => {
        switch (poseKey) {
            case 'leftThumb': return 2;
            case 'leftFull': return 4;
            case 'rightThumb': return 6;
            case 'rightFull': return 8;
            default: return 2;
        }
    };

    const renderMediaBox = (poseKey, titleKey) => {
        const items = media[poseKey] || [];
        const poseTitle = t(titleKey);

        return (
            <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <Card.Header className="bg-white border-bottom-0 pt-3 pb-2 d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-dark small text-uppercase">{poseTitle}</span>
                    <Button
                        variant="light"
                        size="sm"
                        className="rounded-pill px-3 py-1 text-primary fw-medium small border-0 bg-primary bg-opacity-10 d-flex align-items-center gap-1 hover-overlay"
                        onClick={() => onRetake(getStepForPose(poseKey))}
                    >
                        {items.length > 0 ? <><Edit2 size={14} /> {t('matrix.edit')}</> : <><Plus size={14} /> {t('matrix.add')}</>}
                    </Button>
                </Card.Header>
                <Card.Body className="p-3 bg-light">
                    {items.length === 0 ? (
                        <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted opacity-50 py-4">
                            <Camera size={32} className="mb-2" />
                            <small>{t('matrix.no_media')}</small>
                        </div>
                    ) : (
                        <div className="d-flex overflow-auto gap-2 pb-2 h-100 align-items-center" style={{ scrollbarWidth: 'thin' }}>
                            {items.map((item) => (
                                <div key={item.id} className="position-relative flex-shrink-0 bg-dark rounded-3 overflow-hidden shadow-sm border border-secondary" style={{ width: 100, height: 100 }}>
                                    {item.type === 'image' ? (
                                        <img src={item.url} alt="preview" className="w-100 h-100 object-fit-cover" />
                                    ) : (
                                        <>
                                            <video src={item.url} className="w-100 h-100 object-fit-cover opacity-75" />
                                            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-25">
                                                <Video size={24} className="text-white drop-shadow" />
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </Card.Body>
            </Card>
        );
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <div className="p-3 d-flex align-items-center bg-white shadow-sm position-sticky top-0 z-3">
                <Button
                    variant="light"
                    className="rounded-circle d-flex align-items-center justify-content-center p-2 border-0 shadow-sm"
                    onClick={onBack}
                >
                    <ArrowLeft size={24} />
                </Button>
                <div className="fw-bold fs-5 ms-3 text-dark">
                    {t('matrix.title')}
                </div>
            </div>

            <Container className="flex-grow-1 py-4 d-flex flex-column">
                <p className="text-muted text-center mb-4">{t('matrix.subtitle')}</p>

                <Row className="g-4 flex-grow-1 mb-4">
                    <Col xs={12} md={6}>
                        {renderMediaBox('leftThumb', 'flow.left_thumb_title')}
                    </Col>
                    <Col xs={12} md={6}>
                        {renderMediaBox('leftFull', 'flow.left_full_title')}
                    </Col>
                    <Col xs={12} md={6}>
                        {renderMediaBox('rightThumb', 'flow.right_thumb_title')}
                    </Col>
                    <Col xs={12} md={6}>
                        {renderMediaBox('rightFull', 'flow.right_full_title')}
                    </Col>
                </Row>

                <div className="mt-auto px-3 pb-3">
                    <Button
                        variant="primary"
                        size="lg"
                        className="w-100 d-flex align-items-center justify-content-center gap-2 rounded-pill py-3 fw-bold shadow-sm transition-all"
                        onClick={onConfirm}
                    >
                        {t('matrix.confirm_proceed')} <ArrowRight size={20} />
                    </Button>
                </div>
            </Container>
        </div>
    );
}
