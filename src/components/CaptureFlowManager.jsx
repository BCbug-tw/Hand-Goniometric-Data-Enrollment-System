import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PoseGuide from './PoseGuide';
import CameraCapture from './CameraCapture';
import PosePreviewMatrix from './PosePreviewMatrix';

export default function CaptureFlowManager({ isExpertMode, onComplete, onBack }) {
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
    const [internalStep, setInternalStep] = useState(isExpertMode ? 2 : 1);
    const [isRetakeMode, setIsRetakeMode] = useState(false); // Tracks if we jumped from step 9

    // Store all captured media categorized by pose
    const [capturedMedia, setCapturedMedia] = useState({
        leftFlexion: [],
        leftExtension: [],
        rightFlexion: [],
        rightExtension: []
    });

    const goNext = () => {
        setInternalStep(prev => isExpertMode ? prev + 2 : prev + 1);
    };

    const goBack = () => {
        if (internalStep === 1 || (isExpertMode && internalStep === 2)) {
            onBack();
        } else {
            setInternalStep(prev => isExpertMode ? prev - 2 : prev - 1);
        }
    };

    const jumpToCamera = (stepNumber) => {
        setIsRetakeMode(true);
        setInternalStep(stepNumber);
    };

    const handleDeleteMedia = (poseKey, index) => {
        setCapturedMedia(prev => {
            const updatedPoseMedia = [...prev[poseKey]];
            // Optional: URL.revokeObjectURL(updatedPoseMedia[index].url) to prevent memory leaks if not used elsewhere
            updatedPoseMedia.splice(index, 1);
            return {
                ...prev,
                [poseKey]: updatedPoseMedia
            };
        });
    };

    const handleCaptureComplete = (poseKey, mediaArray) => {
        setCapturedMedia(prev => ({
            ...prev,
            [poseKey]: mediaArray
        }));

        if (isRetakeMode) {
            setIsRetakeMode(false);
            setInternalStep(9);
        } else if (poseKey === 'rightExtension') {
            setInternalStep(9);
        } else {
            setInternalStep(prev => isExpertMode ? prev + 2 : prev + 1);
        }
    };

    const renderStep = () => {
        switch (internalStep) {
            case 1:
                return <PoseGuide
                    title={t('flow.left_flexion_title')}
                    instructions={t('flow.left_flexion_desc')}
                    imagePath={`${import.meta.env.BASE_URL}left_flexion.jpg`}
                    onNext={goNext}
                    onBack={goBack}
                />;
            case 2:
                return <CameraCapture
                    key="camera-leftFlexion"
                    title={t('flow.left_flexion_title')}
                    side="leftFlexion"
                    initialGallery={capturedMedia.leftFlexion}
                    onCapture={(media) => handleCaptureComplete('leftFlexion', media)}
                    onBack={goBack}
                    hideBackButton={isRetakeMode}
                />;
            case 3:
                return <PoseGuide
                    title={t('flow.left_extension_title')}
                    instructions={t('flow.left_extension_desc')}
                    imagePath={`${import.meta.env.BASE_URL}left_extension.jpg`}
                    onNext={goNext}
                    onBack={goBack}
                />;
            case 4:
                return <CameraCapture
                    key="camera-leftExtension"
                    title={t('flow.left_extension_title')}
                    side="leftExtension"
                    initialGallery={capturedMedia.leftExtension}
                    onCapture={(media) => handleCaptureComplete('leftExtension', media)}
                    onBack={goBack}
                    hideBackButton={isRetakeMode}
                />;
            case 5:
                return <PoseGuide
                    title={t('flow.right_flexion_title')}
                    instructions={t('flow.right_flexion_desc')}
                    imagePath={`${import.meta.env.BASE_URL}right_flexion.jpg`}
                    onNext={goNext}
                    onBack={goBack}
                />;
            case 6:
                return <CameraCapture
                    key="camera-rightFlexion"
                    title={t('flow.right_flexion_title')}
                    side="rightFlexion"
                    initialGallery={capturedMedia.rightFlexion}
                    onCapture={(media) => handleCaptureComplete('rightFlexion', media)}
                    onBack={goBack}
                    hideBackButton={isRetakeMode}
                />;
            case 7:
                return <PoseGuide
                    title={t('flow.right_extension_title')}
                    instructions={t('flow.right_extension_desc')}
                    imagePath={`${import.meta.env.BASE_URL}right_extension.jpg`}
                    onNext={goNext}
                    onBack={goBack}
                />;
            case 8:
                return <CameraCapture
                    key="camera-rightExtension"
                    title={t('flow.right_extension_title')}
                    side="rightExtension"
                    initialGallery={capturedMedia.rightExtension}
                    onCapture={(media) => handleCaptureComplete('rightExtension', media)}
                    onBack={goBack}
                    hideBackButton={isRetakeMode}
                />;
            case 9:
                return <PosePreviewMatrix
                    media={capturedMedia}
                    onRetake={jumpToCamera}
                    onDeleteMedia={handleDeleteMedia}
                    onConfirm={() => onComplete(capturedMedia)}
                    onBack={() => {
                        jumpToCamera(8);
                        setIsRetakeMode(false);
                    }}
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
