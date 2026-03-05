# Hand Goniometric Data Enrollment System (手部關節活動度臨床資料登錄系統)

This is a modern, responsive web application built with React, Vite, Tailwind CSS, and React-Bootstrap. It is designed to assist clinical researchers and medical professionals in collecting, recording, and exporting goniometric measurement data and media (photos/videos) of patients' hands.

這是一個使用 React, Vite, Tailwind CSS 和 React-Bootstrap 打造的現代化響應式網頁應用程式。專為臨床研究人員和醫療專業人員設計，用於收集、記錄並匯出病患手部的關節活動度（Goniometric）測量數據與影像（照片/影片）資料。

## ✨ Features (功能特色)

- **Step-by-Step Wizard (多步驟引導)**: A seamless 6-step flow to ensure no data is missed during the enrollment process.
- **Bilingual Interface (雙語介面)**: Fully supports English and Traditional Chinese (繁體中文) via `react-i18next`.
- **Camera Integration (相機整合)**: Directly capture photos or record up to 15 seconds of video within the browser. Includes a visual hand overlay guide for consistent positioning.
- **Comprehensive Measurements (完整的測量紀錄)**: Dedicated forms to input goniometric readings for 15 specific joints (CMC, MCP, IP, PIP, DIP) across all five fingers for both hands.
- **Local ZIP Export (本機 ZIP 匯出)**: Automatically packages all captured media (JPG/WebM) and patient data (CSV format) into a single downloadable ZIP file.
- **Cloud Upload (雲端上傳)**: Built-in support for uploading the structured data directly to a Google Apps Script backend.

---

## 📖 Page Usage & Flow (各頁面使用說明)

The application follows a linear 6-step wizard flow:
系統採用線性 6 步驟引導流程：

### 1. Patient Data Form (病患資料)
- **Usage**: Enter the basic demographic information of the patient, including their Name (姓名), Patient ID (病歷號), and Enrollment Date (收案日期).
- **Note**: Patient ID is required to reliably identify and name the exported files.

### 2. Pre-Confirmation (資料確認)
- **Usage**: Briefly review the entered patient information before moving on to the hands-on data collection phase.

### 3. Left Hand Capture (左手拍攝)
- **Usage**: Activates the device's camera. The user can toggle between **Photo** and **Video** modes to capture the patient's left hand. A dashed hand outline is overlaid on the screen to help guide the patient's hand placement.
- **Video Mode**: Limited to 15 seconds per recording.

### 4. Right Hand Capture (右手拍攝)
- **Usage**: Identical functionality to Step 3, but specifically dedicated to capturing the patient's right hand.

### 5. Measurements (關節測量數據)
- **Usage**: A detailed form separated into "Left Hand" and "Right Hand" tabs. Medical staff can input the physical goniometer angles (in degrees) for the Thumb, Index, Middle, Ring, and Pinky fingers' respective joints.

### 6. Confirmation & Export (最終確認與匯出)
- **Usage**: The final review dashboard. It displays the patient info, thumbnails of the captured media, and the total number of measurements recorded.
- **Actions**:
  - **Download ZIP (下載 ZIP 檔)**: Generates a CSV file containing the patient info and measurements, bundles it with the photos/videos, and triggers a local download.
  - **Confirm & Upload (確認並上傳)**: Submits all gathered data and base64-encoded media to the configured backend server.

---

## 🛠️ Tech Stack (技術架構)

- **Frontend Framework**: React 19, Vite
- **UI & Styling**: React-Bootstrap 5, Tailwind CSS 4, Lucide React (Icons)
- **State Management & HTTP**: React Hooks, Axios
- **Internationalization**: `i18next`, `react-i18next`
- **Utility**: `jszip` (for client-side archiving structure)

## 🚀 Getting Started (本地端運行)

1. **Install dependencies (安裝套件)**:
   ```bash
   npm install
   ```
2. **Run the development server (啟動開發伺服器)**:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.  
   *(Note: Camera API requires a secure context (HTTPS) or `localhost` to function properly).*

## 🌐 Deployment (部署)

This project is configured to be easily deployed to **GitHub Pages** using GitHub Actions.

本專案已設定好可透過 GitHub Actions 輕鬆部署至 **GitHub Pages**。

### How to Deploy (如何部署)

1. Push your code to the `main` or `master` branch of your GitHub repository.
2. Go to your repository on GitHub.
3. Click on the **Settings** tab.
4. On the left sidebar, click on **Pages**.
5. Under **Build and deployment**, set the **Source** dropdown to **GitHub Actions**.
6. GitHub will automatically build and deploy your application. You can track the progress in the **Actions** tab.

**Note**: Ensure your `vite.config.js` has the correct `base` path set to your repository name (e.g., `base: '/Hand-Goniometric-Data-Enrollment-System/'`).
