import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "app": {
                "title": "Hand Goniometric Data Enrollment System"
            },
            "stepper": {
                "info": "Info",
                "pre_confirm": "Confirm Info",
                "left_hand": "Left Hand",
                "right_hand": "Right Hand",
                "measurements": "Goniometry",
                "confirm": "Confirm"
            },
            "patient_form": {
                "title": "Patient Information",
                "subtitle": "Please enter the baseline information to begin the capture process.",
                "name": "Name",
                "name_placeholder": "Enter patient name",
                "patient_id": "Medical Record No.",
                "patient_id_placeholder": "Enter patient ID",
                "enrollment_date": "Enrollment Date",
                "next": "Next Step"
            },
            "pre_confirmation": {
                "title": "Confirm Patient Information",
                "subtitle": "Please verify the details below before proceeding to capture.",
                "name": "Name",
                "patient_id": "Medical Record No.",
                "enrollment_date": "Enrollment Date",
                "guide_title": "Trial Guide",
                "guide_placeholder": "A GIF animation for the trial guide will be placed here in the future.",
                "back": "Back to Edit",
                "next": "Confirm & Proceed to Capture"
            },
            "camera": {
                "photo": "Photo",
                "video": "Video",
                "continue": "Continue",
                "retry": "Retry Camera",
                "error_access": "Failed to access camera. Please ensure permissions are granted.",
                "error_support": "Recording is not supported in this browser."
            },
            "measurements": {
                "title": "Joint Goniometry",
                "subtitle": "Record values in mm or degrees",
                "left_hand": "Left Hand",
                "right_hand": "Right Hand",
                "review": "Review Data"
            },
            "confirmation": {
                "title": "Review & Upload",
                "patient_details": "Patient Details",
                "name": "Name",
                "patient_id": "Patient ID",
                "no_captures": "No {{side}} Captures",
                "left_hand": "Left Hand",
                "right_hand": "Right Hand",
                "measurements_recorded": "{{count}} / 30 Measurements Recorded",
                "packaged": "Data packaged for upload.",
                "upload_failed": "Upload failed",
                "uploading": "Uploading securely...",
                "retry": "Retry Upload",
                "confirm_upload": "Confirm & Upload Data",
                "upload_complete": "Upload Complete",
                "complete_msg1": "Data for patient ",
                "complete_msg2": " has been successfully saved to the server.",
                "uploaded_files": "Uploaded {{count}} files.",
                "capture_another": "Capture Another Patient",
                "download_zip": "Download ZIP (Local Backup)",
                "zipping": "Preparing ZIP...",
                "zip_success": "Downloaded",
                "zip_error": "Failed to create ZIP"
            }
        }
    },
    "zh-TW": {
        translation: {
            "app": {
                "title": "手關節量測收案系統"
            },
            "stepper": {
                "info": "資訊",
                "pre_confirm": "確認資訊",
                "left_hand": "左手",
                "right_hand": "右手",
                "measurements": "量測",
                "confirm": "確認"
            },
            "patient_form": {
                "title": "病患資訊",
                "subtitle": "請輸入基本資料以開始拍攝流程。",
                "name": "姓名",
                "name_placeholder": "輸入姓名",
                "patient_id": "病歷號",
                "patient_id_placeholder": "輸入病歷號",
                "enrollment_date": "收案日期",
                "next": "下一步"
            },
            "pre_confirmation": {
                "title": "確認病患資訊",
                "subtitle": "請在進行拍攝前，確認下列資訊是否正確。",
                "name": "姓名",
                "patient_id": "病歷號",
                "enrollment_date": "收案日期",
                "guide_title": "試驗指引預留區",
                "guide_placeholder": "未來將在此處放置拍攝指引 GIF 動畫。",
                "back": "返回修改",
                "next": "確認並進行拍攝"
            },
            "camera": {
                "photo": "拍照",
                "video": "錄影",
                "continue": "繼續",
                "retry": "重試相機",
                "error_access": "無法存取相機，請確認已授權權限。",
                "error_support": "此瀏覽器不支援錄影功能。"
            },
            "measurements": {
                "title": "關節量測",
                "subtitle": "記錄數值 (度數)",
                "left_hand": "左手",
                "right_hand": "右手",
                "review": "檢視資料"
            },
            "confirmation": {
                "title": "確認與上傳",
                "patient_details": "病患細節",
                "name": "姓名",
                "patient_id": "病歷號",
                "no_captures": "無{{side}}影像",
                "left_hand": "左手",
                "right_hand": "右手",
                "measurements_recorded": "已記錄 {{count}} / 30 筆量測",
                "packaged": "資料已打包準備上傳。",
                "upload_failed": "上傳失敗",
                "uploading": "安全上傳中...",
                "retry": "重試上傳",
                "confirm_upload": "確認並上傳資料",
                "upload_complete": "上傳完成",
                "complete_msg1": "病患 ",
                "complete_msg2": " 的資料已成功存檔至伺服器。",
                "uploaded_files": "已上傳 {{count}} 個檔案。",
                "capture_another": "繼續記錄下一位病患",
                "download_zip": "下載 ZIP (本機備份)",
                "zipping": "正在打包中...",
                "zip_success": "下載完成",
                "zip_error": "打包失敗"
            }
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "zh-TW", // Automatically start with Traditional Chinese based on user's current requests
        fallbackLng: "en",

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
