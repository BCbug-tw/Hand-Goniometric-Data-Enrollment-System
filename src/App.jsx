import { useState } from 'react';
import { Hand } from 'lucide-react';
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
      {/* Sleek Floating Navbar */}
      <div className="container-fluid pt-3 pb-4">
        <div className="sleek-navbar d-flex align-items-center justify-content-between mx-auto" style={{ maxWidth: '1200px' }}>
          {/* Left: Logo + Title */}
          <div className="d-flex align-items-center gap-2">
            <div className="sleek-navbar-logo flex-shrink-0">
              <Hand size={20} />
            </div>
            <span className="fw-bold text-main d-none d-md-block ms-1" style={{ fontSize: '1.05rem' }}>{t('app.title')}</span>
          </div>

          {/* Middle: Stepper */}
          <div className="d-none d-lg-flex align-items-center gap-3 text-secondary small fw-medium">
            {currentStep === 1 ? <span className="text-primary-green fw-bold d-flex align-items-center gap-2"><span style={{width: '16px', height: '2px', backgroundColor: 'var(--primary-green)', display: 'inline-block'}}></span>{t('stepper.info')}</span> : <span className="opacity-75">{t('stepper.info')}</span>}
            <span className="opacity-50">·</span>
            {currentStep >= 2 && currentStep <= 3 ? <span className="text-primary-green fw-bold d-flex align-items-center gap-2"><span style={{width: '16px', height: '2px', backgroundColor: 'var(--primary-green)', display: 'inline-block'}}></span>{t('stepper.capture')}</span> : <span className="opacity-75">{t('stepper.capture')}</span>}
            <span className="opacity-50">·</span>
            {currentStep === 4 ? <span className="text-primary-green fw-bold d-flex align-items-center gap-2"><span style={{width: '16px', height: '2px', backgroundColor: 'var(--primary-green)', display: 'inline-block'}}></span>{t('stepper.measurements')}</span> : <span className="opacity-75">{t('stepper.measurements')}</span>}
            <span className="opacity-50">·</span>
            {currentStep === 5 ? <span className="text-primary-green fw-bold d-flex align-items-center gap-2"><span style={{width: '16px', height: '2px', backgroundColor: 'var(--primary-green)', display: 'inline-block'}}></span>{t('stepper.confirm')}</span> : <span className="opacity-75">{t('stepper.confirm')}</span>}
          </div>

          {/* Right: Actions */}
          <div className="d-flex align-items-center gap-2">
            <button className="sleek-btn-cream bg-white border" onClick={toggleLanguage}>
              中 / EN
            </button>
          </div>
        </div>
      </div>

      <Container className="pb-5 pt-1">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={6}>

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
