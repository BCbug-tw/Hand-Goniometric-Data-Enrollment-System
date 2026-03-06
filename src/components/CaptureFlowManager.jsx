import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PoseGuide from './PoseGuide';
import CameraCapture from './CameraCapture';
import PosePreviewMatrix from './PosePreviewMatrix';

export default function CaptureFlowManager({ onComplete, onBack }) {
    const { t } = useTranslation();

    // Internal steps:
    // 1: Guide Left Thumb
    // 2: Camera Left Thumb
    // 3: Guide Left Full
    // 4: Camera Left Full
    // 5: Guide Right Thumb
    // 6: Camera Right Thumb
    // 7: Guide Right Full
    // 8: Camera Right Full
    // 9: Matrix Preview
    const [internalStep, setInternalStep] = useState(1);

    // Store all captured media categorized by pose
    const [capturedMedia, setCapturedMedia] = useState({
        leftThumb: [],
        leftFull: [],
        rightThumb: [],
        rightFull: []
    });

    const goNext = () => setInternalStep(prev => prev + 1);
    const goBack = () => {
        if (internalStep === 1) {
            onBack();
        } else {
            setInternalStep(prev => prev - 1);
        }
    };

    const jumpToCamera = (stepNumber) => {
        setInternalStep(stepNumber);
    };

    const handleCaptureComplete = (poseKey, mediaArray) => {
        setCapturedMedia(prev => ({
            ...prev,
            [poseKey]: mediaArray
        }));

        // If we are coming from the Preview Matrix (step 9) to do a retake/add more,
        // we should jump back to the Matrix after capture rather than the next guide.
        // However, standard flow just goes +1.
        // For simplicity, we detect if the current media array implies we were doing a "Retake"
        // To be safe, we'll just go +1 in standard flow, but if we came from step 9, we need a better state tracker.

        // Simple heuristic: if we already have media in the the *next* step's category, 
        // or we are at the end, jump to 9.
        if (poseKey === 'rightFull') {
            setInternalStep(9);
        } else {
            setInternalStep(prev => prev + 1);
        }
    };

    const renderStep = () => {
        switch (internalStep) {
            case 1:
                return <PoseGuide
                    title={t('flow.left_thumb_title')}
                    instructions={t('flow.left_thumb_desc')}
                    imagePath="/left_thumb.jpg"
                    onNext={goNext}
                    onBack={goBack}
                />;
            case 2:
                return <CameraCapture
                    title={t('flow.left_thumb_title')}
                    side="leftThumb"
                    initialGallery={capturedMedia.leftThumb}
                    onCapture={(media) => handleCaptureComplete('leftThumb', media)}
                    onBack={goBack}
                />;
            case 3:
                return <PoseGuide
                    title={t('flow.left_full_title')}
                    instructions={t('flow.left_full_desc')}
                    imagePath="/left_full.jpg"
                    onNext={goNext}
                    onBack={goBack}
                />;
            case 4:
                return <CameraCapture
                    title={t('flow.left_full_title')}
                    side="leftFull"
                    initialGallery={capturedMedia.leftFull}
                    onCapture={(media) => handleCaptureComplete('leftFull', media)}
                    onBack={goBack}
                />;
            case 5:
                return <PoseGuide
                    title={t('flow.right_thumb_title')}
                    instructions={t('flow.right_thumb_desc')}
                    imagePath="/right_thumb.jpg"
                    onNext={goNext}
                    onBack={goBack}
                />;
            case 6:
                return <CameraCapture
                    title={t('flow.right_thumb_title')}
                    side="rightThumb"
                    initialGallery={capturedMedia.rightThumb}
                    onCapture={(media) => handleCaptureComplete('rightThumb', media)}
                    onBack={goBack}
                />;
            case 7:
                return <PoseGuide
                    title={t('flow.right_full_title')}
                    instructions={t('flow.right_full_desc')}
                    imagePath="/right_full.jpg"
                    onNext={goNext}
                    onBack={goBack}
                />;
            case 8:
                return <CameraCapture
                    title={t('flow.right_full_title')}
                    side="rightFull"
                    initialGallery={capturedMedia.rightFull}
                    onCapture={(media) => handleCaptureComplete('rightFull', media)}
                    onBack={goBack}
                />;
            case 9:
                return <PosePreviewMatrix
                    media={capturedMedia}
                    onRetake={jumpToCamera}
                    onConfirm={() => onComplete(capturedMedia)}
                    onBack={() => jumpToCamera(8)}
                />;
            default:
                return null;
        }
    };

    return (
        <div className="w-100 h-100">
            {renderStep()}
        </div>
    );
}
