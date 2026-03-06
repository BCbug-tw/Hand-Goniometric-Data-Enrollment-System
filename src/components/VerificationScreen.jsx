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

    const API_URL = 'https://script.google.com/macros/s/AKfycbxgee-TmBYPDEE8CyzDOMeXehATqsKElySrgQz5xdxWUDBo4-TDvanZQFanh5yNs1b3/exec';

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
                        <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                            <Card.Body className="p-4 p-md-5">
                                <div className="text-center mb-5">
                                    <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle mb-3" style={{ width: 80, height: 80 }}>
                                        <ShieldCheck size={40} />
                                    </div>
                                    <h2 className="fw-bold mb-2">{t('app.title')}</h2>
                                    <p className="text-muted">{t('verification.subtitle')}</p>
                                </div>

                                {error && (
                                    <Alert variant="danger" className="rounded-3 border-0 d-flex align-items-center gap-2 mb-4">
                                        <Lock size={18} className="flex-shrink-0" />
                                        <span>{error}</span>
                                    </Alert>
                                )}

                                <Form onSubmit={handleVerify}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-bold text-muted small text-uppercase">
                                            {t('verification.code_label')}
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            size="lg"
                                            placeholder={t('verification.code_placeholder')}
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            className="rounded-3 px-3 py-3 bg-light border-0"
                                            autoFocus
                                            autoComplete="off"
                                            disabled={isVerifying}
                                        />
                                    </Form.Group>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="w-100 d-flex align-items-center justify-content-center gap-2 rounded-pill py-3 fw-bold shadow-sm transition-all"
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
                        <div className="text-center mt-4 p-3 text-muted small">
                            <Lock size={12} className="me-1" />
                            {t('verification.footer_note')}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
