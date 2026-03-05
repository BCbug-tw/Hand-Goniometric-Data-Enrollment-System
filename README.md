# Hand Goniometric Data Enrollment System

This is a modern, responsive web application built with React, Vite, Tailwind CSS, and React-Bootstrap. It is designed to assist clinical researchers and medical professionals in collecting, recording, and exporting goniometric measurement data and media (photos/videos) of patients' hands.

## ✨ Features

- **Step-by-Step Wizard**: A seamless 6-step flow to ensure no data is missed during the enrollment process.
- **Bilingual Interface**: Fully supports English and Traditional Chinese via `react-i18next`.
- **Camera Integration**: Directly capture photos or record up to 15 seconds of video within the browser. Includes a visual hand overlay guide for consistent positioning.
- **Comprehensive Measurements**: Dedicated forms to input goniometric readings for 15 specific joints (CMC, MCP, IP, PIP, DIP) across all five fingers for both hands.
- **Local ZIP Export**: Automatically packages all captured media (JPG/WebM) and patient data (CSV format) into a single downloadable ZIP file.
- **Cloud Upload**: Built-in support for uploading the structured data directly to a Google Apps Script backend.

---

## 📖 Page Usage & Flow

The application follows a linear 6-step wizard flow:

### 1. Patient Data Form
- **Usage**: Enter the basic demographic information of the patient, including their Name, Patient ID, and Enrollment Date.
- **Note**: Patient ID is required to reliably identify and name the exported files.

### 2. Pre-Confirmation
- **Usage**: Briefly review the entered patient information before moving on to the hands-on data collection phase.

### 3. Left Hand Capture
- **Usage**: Activates the device's camera. The user can toggle between **Photo** and **Video** modes to capture the patient's left hand. A dashed hand outline is overlaid on the screen to help guide the patient's hand placement.
- **Video Mode**: Limited to 15 seconds per recording.

### 4. Right Hand Capture
- **Usage**: Identical functionality to Step 3, but specifically dedicated to capturing the patient's right hand.

### 5. Measurements
- **Usage**: A detailed form separated into "Left Hand" and "Right Hand" tabs. Medical staff can input the physical goniometer angles (in degrees) for the Thumb, Index, Middle, Ring, and Pinky fingers' respective joints.

### 6. Confirmation & Export
- **Usage**: The final review dashboard. It displays the patient info, thumbnails of the captured media, and the total number of measurements recorded.
- **Actions**:
  - **Download ZIP**: Generates a CSV file containing the patient info and measurements, bundles it with the photos/videos, and triggers a local download.
  - **Confirm & Upload**: Submits all gathered data and base64-encoded media to the configured backend server.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19, Vite
- **UI & Styling**: React-Bootstrap 5, Tailwind CSS 4, Lucide React (Icons)
- **State Management & HTTP**: React Hooks, Axios
- **Internationalization**: `i18next`, `react-i18next`
- **Utility**: `jszip` (for client-side archiving structure)
