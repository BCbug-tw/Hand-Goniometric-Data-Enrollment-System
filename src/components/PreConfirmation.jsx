import React from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Video, Zap, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PreConfirmation({ data, isExpertMode, setIsExpertMode, onNext, onBack }) {
    const { t } = useTranslation();

    return (
        <div className="py-2">
            <div className="mb-4">
                <Button variant="link" className="text-secondary text-decoration-none p-0 d-flex align-items-center gap-2 mb-3 fs-6" onClick={onBack}>
                    <ArrowLeft size={18} /> {t('pre_confirmation.back', '返回基本資料')}
                </Button>
                <h3 className="mb-1 fw-bold text-main">{t('pre_confirmation.title')}</h3>
                <p className="text-secondary small mb-0">{t('pre_confirmation.subtitle')}</p>
            </div>

            <Card className="sleek-card mb-5">
                <Card.Body className="p-4 d-flex align-items-center flex-column flex-md-row gap-4">
                    <div className="bg-primary-green-soft d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 64, height: 64, borderRadius: '16px' }}>
                        <User size={32} />
                    </div>
                    <Row className="g-4 w-100 m-0">
                        <Col xs={12} md={4} className="p-0 pe-md-3">
                            <div className="small text-secondary mb-1">{t('pre_confirmation.name')}</div>
                            <div className="fw-bold fs-5 text-main">{data.name || '-'}</div>
                        </Col>
                        <Col xs={12} md={4} className="p-0 px-md-3 border-start-md border-soft">
                            <div className="small text-secondary mb-1">{t('pre_confirmation.patient_id')}</div>
                            <div className="fw-bold fs-5 text-primary-green">{data.patient_id || '-'}</div>
                        </Col>
                        <Col xs={12} md={4} className="p-0 ps-md-3 border-start-md border-soft">
                            <div className="small text-secondary mb-1">{t('pre_confirmation.enrollment_date')}</div>
                            <div className="fw-bold fs-5 text-main">{data.enrollmentDate || '-'}</div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <div className="d-flex align-items-center justify-content-between mb-5 bg-white p-3 sleek-card border-0" style={{boxShadow: 'none'}}>
                <div className="d-flex align-items-center gap-2">
                    <Zap size={18} className={isExpertMode ? "text-primary-green" : "text-secondary"} />
                    <span className="fw-medium text-main">{t('pre_confirmation.expert_mode')}</span>
                </div>
                <Form.Check
                    type="switch"
                    id="expert-mode-switch"
                    checked={isExpertMode}
                    onChange={(e) => setIsExpertMode(e.target.checked)}
                    className="mb-0 fs-5 custom-switch"
                />
            </div>

            <Button
                size="lg"
                className="btn-primary-action w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                onClick={onNext}
            >
                {t('pre_confirmation.next', '開始上傳/拍攝')} <ArrowRight size={20} />
            </Button>
        </div>
    );
}
