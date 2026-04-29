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
        <div className="py-2">
            <div className="mb-5 text-start">
                <h1 className="fw-bold mb-3 text-main" style={{ fontSize: '2.5rem', letterSpacing: '-0.02em', lineHeight: '1.3' }}>
                    {t('patient_form.title', '請先填寫受試者資訊')}
                </h1>
                <p className="text-secondary fs-6">{t('patient_form.subtitle', '這些資料將與本次的 ROM 分析結果一同保存。')}</p>
            </div>

            <Form onSubmit={handleSubmit} className="text-start mt-5">
                <Form.Group className="mb-4">
                    <Form.Label className="small text-secondary fw-medium">
                        {t('patient_form.name')} <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="input-group">
                        <span className="input-group-text soft-input-addon border-end-0 pe-2">
                            <User size={18} />
                        </span>
                        <Form.Control
                            type="text"
                            name="name"
                            required
                            value={data.name}
                            onChange={handleChange}
                            placeholder={t('patient_form.name_placeholder', '例如：王小明')}
                            className="soft-input border-start-0 ps-2"
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className="small text-secondary fw-medium">
                        {t('patient_form.patient_id')} <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="input-group">
                        <span className="input-group-text soft-input-addon border-end-0 pe-2">
                            <Stethoscope size={18} />
                        </span>
                        <Form.Control
                            type="text"
                            name="patient_id"
                            required
                            value={data.patient_id}
                            onChange={handleChange}
                            placeholder={t('patient_form.patient_id_placeholder', '例如：S001')}
                            className="soft-input border-start-0 ps-2"
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-5">
                    <Form.Label className="small text-secondary fw-medium">
                        {t('patient_form.enrollment_date')} <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="input-group">
                        <span className="input-group-text soft-input-addon border-end-0 pe-2">
                            <Calendar size={18} />
                        </span>
                        <Form.Control
                            type="date"
                            name="enrollmentDate"
                            required
                            value={data.enrollmentDate}
                            onChange={handleChange}
                            className="soft-input border-start-0 ps-2"
                        />
                    </div>
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    className="btn-primary-action w-100 d-flex align-items-center justify-content-center gap-2 py-3 mt-4"
                    disabled={!isFormValid}
                >
                    {t('patient_form.next', '下一步')} <ArrowRight size={20} />
                </Button>

            </Form>
        </div>
    );
}
