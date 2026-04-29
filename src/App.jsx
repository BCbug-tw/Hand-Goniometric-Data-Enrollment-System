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
    leftFlexion: [],
    leftExtension: [],
    rightFlexion: [],
    rightExtension: []
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

    setCapturedMedia({ leftFlexion: [], leftExtension: [], rightFlexion: [], rightExtension: [] });
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
    <div className="bg-cream min-vh-100 font-sans">
      {/* Minimalist Top Nav */}
      <div className="d-flex justify-content-end p-4">
        <Button
          variant="light"
          size="sm"
          onClick={toggleLanguage}
          className="rounded-pill px-3 fw-bold text-secondary bg-white border-soft shadow-sm"
          style={{ width: 80 }}
        >
          {i18n.language === 'en' ? '中文' : 'EN'}
        </Button>
      </div>

      <Container className="pb-5 pt-3">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={6}>
            {/* Minimalist Text Stepper */}
            <div className="d-flex justify-content-center align-items-center mb-5 text-secondary small gap-3">
              <span className={currentStep === 1 ? "text-primary-green fw-bold fs-6" : ""}>{t('stepper.info')}</span>
              <span className="text-muted opacity-50">—</span>
              <span className={currentStep >= 2 && currentStep <= 3 ? "text-primary-green fw-bold fs-6" : ""}>{t('stepper.capture')}</span>
              <span className="text-muted opacity-50">—</span>
              <span className={currentStep === 4 ? "text-primary-green fw-bold fs-6" : ""}>{t('stepper.measurements')}</span>
              <span className="text-muted opacity-50">—</span>
              <span className={currentStep === 5 ? "text-primary-green fw-bold fs-6" : ""}>{t('stepper.confirm')}</span>
            </div>

            {/* Content Area - No global card wrapper to allow components to manage their own layout */}
            <div className="content-wrapper">
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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
