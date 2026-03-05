import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { User, Calendar, Stethoscope, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PatientForm({ data, setData, onNext }) {
    const { t } = useTranslation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.name.trim() !== '' && data.patient_id.trim() !== '' && data.enrollmentDate) {
            onNext();
        }
    };

    const isFormValid = data.name.trim() !== '' && data.patient_id.trim() !== '' && data.enrollmentDate;

    return (
        <div className="p-4 p-md-5">
            <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">{t('patient_form.title')}</h2>
                <p className="text-muted">{t('patient_form.subtitle')}</p>
            </div>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                    <Form.Label className="fw-medium text-secondary">
                        {t('patient_form.name')} <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <User size={18} className="text-muted" />
                        </span>
                        <Form.Control
                            type="text"
                            name="name"
                            required
                            value={data.name}
                            onChange={handleChange}
                            placeholder={t('patient_form.name_placeholder')}
                            className="border-start-0 ps-0 form-control-lg"
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className="fw-medium text-secondary">
                        {t('patient_form.patient_id')} <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <Stethoscope size={18} className="text-muted" />
                        </span>
                        <Form.Control
                            type="text"
                            name="patient_id"
                            required
                            value={data.patient_id}
                            onChange={handleChange}
                            placeholder={t('patient_form.patient_id_placeholder')}
                            className="border-start-0 ps-0 form-control-lg"
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-5">
                    <Form.Label className="fw-medium text-secondary">
                        {t('patient_form.enrollment_date')} <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <Calendar size={18} className="text-muted" />
                        </span>
                        <Form.Control
                            type="date"
                            name="enrollmentDate"
                            required
                            value={data.enrollmentDate}
                            onChange={handleChange}
                            className="border-start-0 ps-0 form-control-lg"
                        />
                    </div>
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    className="w-100 d-flex align-items-center justify-content-center gap-2 rounded-pill py-3"
                    disabled={!isFormValid}
                >
                    {t('patient_form.next')} <ArrowRight size={20} />
                </Button>
            </Form>
        </div>
    );
}
