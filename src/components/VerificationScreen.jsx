import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function VerificationScreen({ onVerifySuccess }) {
    const { t, i18n } = useTranslation();
    const [code, setCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState('');

    const API_URL = 'https://script.google.com/macros/s/AKfycbzf-cqGOmvsNy8OFzcuT1o7PzSTbQDFCz-HJO570w258Ybj38e5U1Pmm-wvF9LwAVRQ/exec';

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!code.trim()) {
            setError(t('verification.empty_code'));
            return;
        }

        setIsVerifying(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('action', 'verify_code');
            formData.append('code', code.trim());

            const response = await axios.post(API_URL, formData);

            if (response.data.status === 'success') {
                onVerifySuccess(code.trim());
            } else {
                setError(t('verification.invalid_code'));
            }
        } catch (err) {
            console.error("Verification error:", err);
            setError(t('verification.network_error'));
        } finally {
            setIsVerifying(false);
        }
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'zh-TW' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            {/* Minimal Navbar just for language toggle */}
            <nav className="navbar navbar-dark bg-primary shadow-sm p-3">
                <div className="container-fluid d-flex justify-content-end">
                    <Button
                        variant="outline-light"
                        size="sm"
                        onClick={toggleLanguage}
                        className="rounded-pill px-3 fw-bold"
                        style={{ width: 80 }}
                    >
                        {i18n.language === 'en' ? '中文' : 'EN'}
                    </Button>
                </div>
            </nav>

            {/* Main Centered Content */}
            <Container className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
                <Row className="w-100 justify-content-center">
                    <Col xs={12} md={8} lg={6} xl={5}>
                        <Card className="sleek-card overflow-hidden text-center py-4 px-2">
                            <Card.Body className="p-4 p-md-5">
                                <div className="text-center mb-4">
                                    <div className="d-inline-flex align-items-center justify-content-center bg-primary-green text-white mb-3" style={{ width: 64, height: 64, borderRadius: '16px' }}>
                                        <Hand size={32} />
                                    </div>
                                    <h2 className="fw-bold mb-2 text-main fs-4">{t('app.title')}</h2>
                                    <p className="text-secondary small mt-2">{t('verification.subtitle', '醫療人員登錄')}</p>
                                </div>

                                {error && (
                                    <Alert variant="danger" className="rounded-3 border-0 d-flex align-items-center gap-2 mb-4 text-start">
                                        <Lock size={18} className="flex-shrink-0" />
                                        <span>{error}</span>
                                    </Alert>
                                )}

                                <Form onSubmit={handleVerify} className="text-start mt-4">
                                    <Form.Group className="mb-4">
                                        <Form.Label className="small text-secondary fw-medium">
                                            {t('verification.code_label')}
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            size="lg"
                                            placeholder={t('verification.code_placeholder')}
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            className="soft-input w-100"
                                            autoFocus
                                            autoComplete="off"
                                            disabled={isVerifying}
                                        />
                                    </Form.Group>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="btn-primary-action w-100 d-flex align-items-center justify-content-center gap-2 py-3 mt-5"
                                        disabled={isVerifying}
                                    >
                                        {isVerifying ? (
                                            <><Spinner animation="border" size="sm" /> {t('verification.verifying')}</>
                                        ) : (
                                            <>{t('verification.submit')} <ArrowRight size={20} /></>
                                        )}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        <div className="text-center mt-4 p-3 text-secondary small">
                            {t('verification.footer_note', '或者使用其他方式登入')}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
