import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { Camera, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PoseGuide({ title, instructions, imagePath, onNext, onBack }) {
    const { t } = useTranslation();

    return (
        <div className="d-flex flex-column py-2">
            <div className="mb-4 d-flex align-items-center">
                <Button variant="link" className="text-secondary text-decoration-none p-0 d-flex align-items-center gap-2 fs-6" onClick={onBack}>
                    <ArrowLeft size={18} /> {t('pre_confirmation.back', '返回')}
                </Button>
                <div className="fw-bold fs-5 ms-3 text-main flex-grow-1 text-center pe-4">
                    {title} - {t('guide.title')}
                </div>
            </div>

            <Container className="flex-grow-1 d-flex flex-column justify-content-center px-0 max-w-md mx-auto" style={{ maxWidth: '600px' }}>
                <Card className="sleek-card mb-4 overflow-hidden text-center">
                    {imagePath ? (
                        <div className="bg-white d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                            <img src={imagePath} alt="Pose Guide" className="w-100 h-100 object-fit-contain" />
                        </div>
                    ) : (
                        <div className="bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                            <div className="text-secondary opacity-50">
                                <Camera size={48} className="mb-2" />
                                <p className="mb-0 fw-medium">{t('guide.image_placeholder')}</p>
                            </div>
                        </div>
                    )}
                </Card>

                <Card className="sleek-card mb-5 p-4">
                    <h5 className="fw-bold mb-3 text-primary-green d-flex align-items-center gap-2">
                        {t('guide.instructions_title')}
                    </h5>
                    <p className="text-secondary mb-0 fs-5 lh-base">
                        {instructions}
                    </p>
                </Card>

                <div className="mt-auto pb-4">
                    <Button
                        size="lg"
                        className="btn-primary-action w-100 d-flex align-items-center justify-content-center gap-2 py-3"
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
