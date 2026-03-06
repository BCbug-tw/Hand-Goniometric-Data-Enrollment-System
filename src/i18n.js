import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "app": {
                "title": "HGDES"
            },
            "stepper": {
                "info": "Info",
                "pre_confirm": "Confirm",
                "capture": "Capture",
                "measurements": "Goniometry",
                "confirm": "Check"
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
                "next": "Confirm & Next"
            },
            "camera": {
                "title_left": "Left Hand",
                "title_right": "Right Hand",
                "photo": "Photo",
                "video": "Video",
                "upload": "Upload",
                "continue": "Next",
                "retry": "Retry Camera",
                "error_access": "Failed to access camera. Please ensure permissions are granted.",
                "error_support": "Recording is not supported in this browser."
            },
            "flow": {
                "left_thumb_title": "Left Thumb Extension",
                "left_thumb_desc": "Please fully extend the left thumb while keeping the other fingers curled inward tightly. Ensure the camera captures the entire thumb joint.",
                "left_full_title": "Left Full Extension",
                "left_full_desc": "Please curl your left thumb inward toward the palm, fully extend the other fingers, and keep your hand flat with fingers naturally separated.",
                "right_thumb_title": "Right Thumb Extension",
                "right_thumb_desc": "Please fully extend the right thumb while keeping the other fingers curled inward tightly. Ensure the camera captures the entire thumb joint.",
                "right_full_title": "Right Full Extension",
                "right_full_desc": "Please curl your right thumb inward toward the palm, fully extend the other fingers, and keep your hand flat with fingers naturally separated."
            },
            "guide": {
                "title": "Instruction",
                "image_placeholder": "Guide Image Placeholder",
                "instructions_title": "Pose Instructions",
                "start_capture": "I understand, start capture"
            },
            "matrix": {
                "title": "Image Capture Preview",
                "subtitle": "Please review all captured poses before proceeding.",
                "edit": "Retake",
                "add": "Add Media",
                "no_media": "No Captures Yet",
                "confirm_proceed": "Confirm & Proceed to Measurements"
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
                "measurements": "Measurements",
                "upload_failed": "Upload failed",
                "uploading": "Uploading securely...",
                "retry": "Retry Upload",
                "confirm_upload": "Confirm & Upload Data",
                "upload_complete": "Upload Complete",
                "complete_msg1": "Data for patient ",
                "complete_msg2": " has been successfully saved to the server.",
                "uploaded_files": "Uploaded {{count}} files.",
                "capture_another": "Capture Another Patient",
                "download_zip": "Local Download (ZIP)",
                "zipping": "Preparing ZIP...",
                "zip_success": "Downloaded",
                "zip_error": "Failed to create ZIP"
            },
            "verification": {
                "subtitle": "Please enter your trial code to access the system",
                "code_label": "Trial Code",
                "code_placeholder": "Enter code",
                "submit": "Verify & Enter",
                "verifying": "Verifying...",
                "empty_code": "Please enter a trial code.",
                "invalid_code": "Invalid trial code. Please check and try again.",
                "network_error": "Network error during verification. Please try again later.",
                "footer_note": "A valid trial code is required to use this application securely."
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
                "capture": "影像擷取",
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
                "title_left": "拍攝：左手",
                "title_right": "拍攝：右手",
                "photo": "拍照",
                "video": "錄影",
                "upload": "上傳",
                "continue": "繼續",
                "retry": "重試相機",
                "error_access": "無法存取相機，請確認已授權權限。",
                "error_support": "此瀏覽器不支援錄影功能。"
            },
            "flow": {
                "left_thumb_title": "左手拇指伸展 (Thumb Extension)",
                "left_thumb_desc": "請將左手大拇指完全伸展，其餘手指向內握緊。確保相機完整拍攝到拇指關節。",
                "left_full_title": "左手完全伸展 (Full Extension)",
                "left_full_desc": "請將左手大拇指向手掌內部彎曲，其餘手指完全伸展，手掌攤平且手指自然分開。",
                "right_thumb_title": "右手拇指伸展 (Thumb Extension)",
                "right_thumb_desc": "請將右手大拇指完全伸展，其餘手指向內握緊。確保相機完整拍攝到拇指關節。",
                "right_full_title": "右手完全伸展 (Full Extension)",
                "right_full_desc": "請將右手大拇指向手掌內部彎曲，其餘手指完全伸展，手掌攤平且手指自然分開。"
            },
            "guide": {
                "title": "動作指引",
                "image_placeholder": "示範圖片將放置於此",
                "instructions_title": "動作說明",
                "start_capture": "我了解了，開始拍攝"
            },
            "matrix": {
                "title": "影像擷取預覽",
                "subtitle": "進入下一步前，請確認所有手部姿態影像是否正確。",
                "edit": "重新拍攝 / 編輯",
                "add": "新增影像",
                "no_media": "尚未拍攝",
                "confirm_proceed": "確認並進入關節量測"
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
                "measurements": "關節量測資料",
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
            },
            "verification": {
                "subtitle": "請輸入您的試驗代碼以進入系統",
                "code_label": "試驗代碼 (Trial Code)",
                "code_placeholder": "輸入代碼",
                "submit": "驗證並進入",
                "verifying": "驗證中...",
                "empty_code": "請輸入試驗代碼。",
                "invalid_code": "試驗代碼無效，請檢查後再試一次。",
                "network_error": "網路連線發生錯誤，請稍後再試。",
                "footer_note": "為確保安全，使用本系統需要有效的試驗代碼。"
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
