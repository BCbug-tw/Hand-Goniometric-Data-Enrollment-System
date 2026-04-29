import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Camera, ArrowRight, Video, Plus, Edit2, ArrowLeft, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PosePreviewMatrix({ media, onRetake, onDeleteMedia, onConfirm, onBack }) {
    const { t } = useTranslation();

    // Mapping pose keys to their respective step numbers in the FlowManager
    // 2: Left Flexion, 4: Left Extension, 6: Right Flexion, 8: Right Extension
    const getStepForPose = (poseKey) => {
        switch (poseKey) {
            case 'leftFlexion': return 2;
            case 'leftExtension': return 4;
            case 'rightFlexion': return 6;
            case 'rightExtension': return 8;
            default: return 2;
        }
    };

    const renderMediaBox = (poseKey, titleKey) => {
        const items = media[poseKey] || [];
        const poseTitle = t(titleKey);

        return (
            <Card className="h-100 sleek-card overflow-hidden">
                <Card.Header className="bg-transparent border-bottom-0 pt-3 pb-2 d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-main small text-uppercase">{poseTitle}</span>
                    <Button
                        variant="link"
                        size="sm"
                        className="text-decoration-none px-2 py-1 text-primary-green fw-medium small d-flex align-items-center gap-1"
                        onClick={() => onRetake(getStepForPose(poseKey))}
                    >
                        {items.length > 0 ? <><Edit2 size={14} /> {t('matrix.edit')}</> : <><Plus size={14} /> {t('matrix.add')}</>}
                    </Button>
                </Card.Header>
                <Card.Body className="p-3 bg-cream bg-opacity-50">
                    {items.length === 0 ? (
                        <div className="h-100 d-flex flex-column align-items-center justify-content-center text-secondary opacity-50 py-4">
                            <Camera size={32} className="mb-2" />
                            <small>{t('matrix.no_media')}</small>
                        </div>
                    ) : (
                        <div className="d-flex overflow-auto gap-2 pb-2 h-100 align-items-center" style={{ scrollbarWidth: 'thin' }}>
                            {items.map((item, index) => (
                                <div key={item.id} className="position-relative flex-shrink-0 bg-dark rounded-3 overflow-hidden shadow-sm border border-secondary" style={{ width: 100, height: 100 }}>
                                    {/* Delete Button */}
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="position-absolute top-0 end-0 p-0 m-1 rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: 20, height: 20, zIndex: 10 }}
                                        onClick={() => onDeleteMedia(poseKey, index)}
                                    >
                                        <X size={12} />
                                    </Button>
                                    
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
        <div className="d-flex flex-column py-2">
            <div className="mb-4 text-start">
                <Button variant="link" className="text-secondary text-decoration-none p-0 d-flex align-items-center gap-2 mb-3 fs-6" onClick={onBack}>
                    <ArrowLeft size={18} /> {t('pre_confirmation.back', '返回')}
                </Button>
                <h3 className="mb-1 fw-bold text-main">{t('matrix.title')}</h3>
                <p className="text-secondary small mb-0">{t('matrix.subtitle')}</p>
            </div>

            <Container className="flex-grow-1 py-2 px-0 d-flex flex-column">

                <Row className="g-4 flex-grow-1 mb-5">
                    <Col xs={12} md={6}>
                        {renderMediaBox('leftFlexion', 'flow.left_flexion_title')}
                    </Col>
                    <Col xs={12} md={6}>
                        {renderMediaBox('leftExtension', 'flow.left_extension_title')}
                    </Col>
                    <Col xs={12} md={6}>
                        {renderMediaBox('rightFlexion', 'flow.right_flexion_title')}
                    </Col>
                    <Col xs={12} md={6}>
                        {renderMediaBox('rightExtension', 'flow.right_extension_title')}
                    </Col>
                </Row>

                <div className="mt-auto pb-3">
                    <Button
                        size="lg"
                        className="btn-primary-action w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                        onClick={onConfirm}
                    >
                        {t('matrix.confirm_proceed')} <ArrowRight size={20} />
                    </Button>
                </div>
            </Container>
        </div>
    );
}
