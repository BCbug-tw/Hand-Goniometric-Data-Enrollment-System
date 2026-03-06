import React from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Video, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PreConfirmation({ data, isExpertMode, setIsExpertMode, onNext, onBack }) {
    const { t } = useTranslation();

    return (
        <div className="p-4 p-md-5">
            <div className="d-flex align-items-center mb-4 gap-3">
                <Button variant="light" className="rounded-circle d-flex align-items-center justify-content-center p-2 border-0 shadow-sm" onClick={onBack}>
                    <ArrowLeft size={24} />
                </Button>
                <div>
                    <h3 className="mb-1 fw-bold">{t('pre_confirmation.title')}</h3>
                    <p className="text-muted small mb-0">{t('pre_confirmation.subtitle')}</p>
                </div>
            </div>

            <Card className="border-0 shadow-sm rounded-4 mb-4">
                <Card.Body className="p-4">
                    <Row className="g-4">
                        <Col xs={12} md={4}>
                            <div className="small text-muted mb-1">{t('pre_confirmation.name')}</div>
                            <div className="fw-medium fs-5">{data.name || '-'}</div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className="small text-muted mb-1">{t('pre_confirmation.patient_id')}</div>
                            <div className="fw-bold text-primary fs-5">{data.patient_id || '-'}</div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className="small text-muted mb-1">{t('pre_confirmation.enrollment_date')}</div>
                            <div className="fw-medium fs-5">{data.enrollmentDate || '-'}</div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card className="bg-light shadow-none rounded-4 mb-5" style={{ border: '2px dashed #dee2e6' }}>
                <Card.Body className="p-5 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '200px' }}>
                    <div className="bg-white p-3 rounded-circle shadow-sm mb-3">
                        <Video size={32} className="text-muted" />
                    </div>
                    <h5 className="fw-bold text-secondary mb-2">{t('pre_confirmation.guide_title')}</h5>
                    <p className="text-muted small mb-0 mx-auto" style={{ maxWidth: '300px' }}>
                        {t('pre_confirmation.guide_placeholder')}
                    </p>
                </Card.Body>
            </Card>

            <div className="d-flex gap-3 mt-4 mb-3">
                <Button
                    variant="outline-secondary"
                    size="lg"
                    className="w-50 d-flex align-items-center justify-content-center gap-2 rounded-pill py-3 fw-bold transition-all"
                    onClick={onBack}
                >
                    {t('pre_confirmation.back')}
                </Button>
                <Button
                    variant="primary"
                    size="lg"
                    className="w-50 d-flex align-items-center justify-content-center gap-2 rounded-pill py-3 fw-bold shadow-sm transition-all"
                    onClick={onNext}
                >
                    {t('pre_confirmation.next')} <ArrowRight size={20} />
                </Button>
            </div>

            <div className="d-flex align-items-center justify-content-center gap-2 mt-4 text-muted bg-light p-3 rounded-4 border">
                <Zap size={18} className={isExpertMode ? "text-warning" : ""} />
                <span className="fw-medium small">{t('pre_confirmation.expert_mode')}</span>
                <Form.Check
                    type="switch"
                    id="expert-mode-switch"
                    checked={isExpertMode}
                    onChange={(e) => setIsExpertMode(e.target.checked)}
                    className="mb-0 ms-2"
                />
            </div>
        </div>
    );
}
