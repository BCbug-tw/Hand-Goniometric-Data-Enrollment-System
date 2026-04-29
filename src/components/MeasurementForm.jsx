import React, { useState } from 'react';
import { Form, Button, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function MeasurementForm({ data, setData, onNext, onBack }) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('left');

    const joints = [
        { label: 'Thumb CMC', key: 'Thumb_CMC' },
        { label: 'Thumb MCP', key: 'Thumb_MCP' },
        { label: 'Thumb IP', key: 'Thumb_IP' },
        { label: 'Index MCP', key: 'Index_MCP' },
        { label: 'Index PIP', key: 'Index_PIP' },
        { label: 'Index DIP', key: 'Index_DIP' },
        { label: 'Middle MCP', key: 'Middle_MCP' },
        { label: 'Middle PIP', key: 'Middle_PIP' },
        { label: 'Middle DIP', key: 'Middle_DIP' },
        { label: 'Ring MCP', key: 'Ring_MCP' },
        { label: 'Ring PIP', key: 'Ring_PIP' },
        { label: 'Ring DIP', key: 'Ring_DIP' },
        { label: 'Pinky MCP', key: 'Pinky_MCP' },
        { label: 'Pinky PIP', key: 'Pinky_PIP' },
        { label: 'Pinky DIP', key: 'Pinky_DIP' }
    ];

    const handleChange = (side, key, value) => {
        setData(prev => ({
            ...prev,
            [side]: { ...prev[side], [key]: value }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <div className="py-2">
            <div className="mb-4 text-start">
                <Button variant="link" className="text-secondary text-decoration-none p-0 d-flex align-items-center gap-2 mb-3 fs-6" onClick={onBack}>
                    <ArrowLeft size={18} /> {t('pre_confirmation.back', '返回')}
                </Button>
                <h3 className="mb-1 fw-bold text-main">{t('measurements.title')}</h3>
                <p className="text-secondary small mb-0">{t('measurements.subtitle')}</p>
            </div>

            <Form onSubmit={handleSubmit}>
                <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-4 sleek-tabs border-0"
                    variant="pills"
                    justify
                >
                    <Tab eventKey="left" title={t('measurements.left_hand')}>
                        <div className="sleek-card p-4 mt-3">
                            <Row className="g-3">
                                {joints.map((joint) => (
                                    <Col xs={6} md={4} key={`left-${joint.key}`}>
                                        <Form.Group>
                                            <Form.Label className="small fw-medium text-secondary mb-1">
                                                {joint.label}
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                step="1"
                                                placeholder="0"
                                                value={data.left?.[joint.key] || ''}
                                                onChange={(e) => handleChange('left', joint.key, e.target.value)}
                                                className="soft-input shadow-none"
                                            />
                                        </Form.Group>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Tab>

                    <Tab eventKey="right" title={t('measurements.right_hand')}>
                        <div className="sleek-card p-4 mt-3">
                            <Row className="g-3">
                                {joints.map((joint) => (
                                    <Col xs={6} md={4} key={`right-${joint.key}`}>
                                        <Form.Group>
                                            <Form.Label className="small fw-medium text-secondary mb-1">
                                                {joint.label}
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                step="1"
                                                placeholder="0"
                                                value={data.right?.[joint.key] || ''}
                                                onChange={(e) => handleChange('right', joint.key, e.target.value)}
                                                className="soft-input shadow-none"
                                            />
                                        </Form.Group>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Tab>
                </Tabs>

                <hr className="my-5 opacity-25" />

                <Button
                    type="submit"
                    size="lg"
                    className="btn-primary-action w-100 d-flex align-items-center justify-content-center gap-2 py-3"
                >
                    {t('measurements.review')} <ArrowRight size={20} />
                </Button>
            </Form>
        </div>
    );
}
