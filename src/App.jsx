import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import PatientForm from './components/PatientForm';
import PreConfirmation from './components/PreConfirmation';
import CaptureFlowManager from './components/CaptureFlowManager';
import MeasurementForm from './components/MeasurementForm';
import Confirmation from './components/Confirmation';
import VerificationScreen from './components/VerificationScreen';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t, i18n } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [trialCode, setTrialCode] = useState(''); // Store the verified trial code
  const [currentStep, setCurrentStep] = useState(1);
  const [patientData, setPatientData] = useState({
    name: '',
    patient_id: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
  });
  const [isExpertMode, setIsExpertMode] = useState(false);

  const [capturedMedia, setCapturedMedia] = useState({
    leftThumb: [],
    leftFull: [],
    rightThumb: [],
    rightFull: []
  });
  const [measurements, setMeasurements] = useState({ left: {}, right: {} });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const resetFlow = () => {
    setCurrentStep(1);
    setPatientData({ name: '', patient_id: '', enrollmentDate: new Date().toISOString().split('T')[0] });

    // Revoke all object URLs to avoid memory leaks
    Object.values(capturedMedia).forEach(array => {
      array.forEach(m => URL.revokeObjectURL(m.url));
    });

    setCapturedMedia({ leftThumb: [], leftFull: [], rightThumb: [], rightFull: [] });
    setMeasurements({ left: {}, right: {} });
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh-TW' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleVerifySuccess = (code) => {
    setTrialCode(code);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <VerificationScreen onVerifySuccess={handleVerifySuccess} />;
  }

  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-dark bg-primary shadow-sm mb-4">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div style={{ width: 80 }}></div> {/* Spacer for symmetry */}
          <span className="navbar-brand mb-0 h1 m-0">{t('app.title')}</span>
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

      <Container className="pb-5">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={6}>
            {/* Step Progress Indicator */}
            <div className="d-flex justify-content-between mb-4 px-3 text-muted small">
              <span className={currentStep >= 1 ? "text-primary fw-bold" : ""}>{t('stepper.info')}</span>
              <span className={currentStep >= 2 ? "text-primary fw-bold" : ""}>{t('stepper.pre_confirm')}</span>
              <span className={currentStep >= 3 ? "text-primary fw-bold" : ""}>{t('stepper.capture')}</span>
              <span className={currentStep >= 4 ? "text-primary fw-bold" : ""}>{t('stepper.measurements')}</span>
              <span className={currentStep >= 5 ? "text-primary fw-bold" : ""}>{t('stepper.confirm')}</span>
            </div>

            <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
              <Card.Body className="p-0">
                {currentStep === 1 && (
                  <PatientForm
                    data={patientData}
                    setData={setPatientData}
                    onNext={nextStep}
                  />
                )}
                {currentStep === 2 && (
                  <PreConfirmation
                    data={patientData}
                    isExpertMode={isExpertMode}
                    setIsExpertMode={setIsExpertMode}
                    onNext={nextStep}
                    onBack={prevStep}
                  />
                )}
                {currentStep === 3 && (
                  <CaptureFlowManager
                    isExpertMode={isExpertMode}
                    onComplete={(media) => {
                      setCapturedMedia(media);
                      nextStep();
                    }}
                    onBack={prevStep}
                  />
                )}
                {currentStep === 4 && (
                  <MeasurementForm
                    data={measurements}
                    setData={setMeasurements}
                    onNext={nextStep}
                    onBack={prevStep}
                  />
                )}
                {currentStep === 5 && (
                  <Confirmation
                    patientData={patientData}
                    trialCode={trialCode}
                    capturedMedia={capturedMedia}
                    measurements={measurements}
                    onBack={prevStep}
                    onComplete={resetFlow}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
