import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { Camera, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PoseGuide({ title, instructions, imagePath, onNext, onBack }) {
    const { t } = useTranslation();

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            {/* Top Navigation Bar */}
            <div className="p-3 d-flex align-items-center bg-white shadow-sm">
                <Button
                    variant="light"
                    className="rounded-circle d-flex align-items-center justify-content-center p-2 border-0 shadow-sm"
                    onClick={onBack}
                >
                    <ArrowLeft size={24} />
                </Button>
                <div className="fw-bold fs-5 ms-3 text-dark">
                    {title} - {t('guide.title')}
                </div>
            </div>

            <Container className="flex-grow-1 d-flex flex-column justify-content-center py-4 px-3 max-w-md mx-auto" style={{ maxWidth: '600px' }}>
                <Card className="border-0 shadow-sm mb-4 rounded-4 overflow-hidden text-center">
                    {imagePath ? (
                        <div className="bg-white d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                            <img src={imagePath} alt="Pose Guide" className="w-100 h-100 object-fit-contain" />
                        </div>
                    ) : (
                        <div className="bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                            <div className="text-muted">
                                <Camera size={48} className="mb-2 opacity-50" />
                                <p className="mb-0 fw-medium">{t('guide.image_placeholder')}</p>
                            </div>
                        </div>
                    )}
                </Card>

                <Card className="border-0 shadow-sm rounded-4 mb-5 p-4">
                    <h5 className="fw-bold mb-3 text-primary d-flex align-items-center gap-2">
                        {t('guide.instructions_title')}
                    </h5>
                    <p className="text-muted mb-0 fs-5 lh-base">
                        {instructions}
                    </p>
                </Card>

                <div className="mt-auto pb-4">
                    <Button
                        variant="primary"
                        size="lg"
                        className="w-100 rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                        onClick={onNext}
                    >
                        <Camera size={20} />
                        {t('guide.start_capture')}
                    </Button>
                </div>
            </Container>
        </div>
    );
}
