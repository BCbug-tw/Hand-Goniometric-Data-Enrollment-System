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
        <div className="p-4 p-md-5">
            <div className="d-flex align-items-center mb-4 gap-3">
                <Button variant="light" className="rounded-circle d-flex align-items-center justify-content-center p-2 border-0 shadow-sm" onClick={onBack}>
                    <ArrowLeft size={24} />
                </Button>
                <div>
                    <h3 className="mb-1 fw-bold">{t('measurements.title')}</h3>
                    <p className="text-muted small mb-0">{t('measurements.subtitle')}</p>
                </div>
            </div>

            <Form onSubmit={handleSubmit}>
                <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-4 custom-tabs"
                    variant="pills"
                    justify
                >
                    <Tab eventKey="left" title={t('measurements.left_hand')}>
                        <div className="bg-light p-4 rounded-4 shadow-sm border mt-3">
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
                                                className="border-0 shadow-sm"
                                            />
                                        </Form.Group>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Tab>

                    <Tab eventKey="right" title={t('measurements.right_hand')}>
                        <div className="bg-light p-4 rounded-4 shadow-sm border mt-3">
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
                                                className="border-0 shadow-sm"
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
                    variant="primary"
                    type="submit"
                    size="lg"
                    className="w-100 d-flex align-items-center justify-content-center gap-2 rounded-pill py-3 fw-bold shadow-sm transition-all"
                >
                    {t('measurements.review')} <ArrowRight size={20} />
                </Button>
            </Form>
        </div>
    );
}
