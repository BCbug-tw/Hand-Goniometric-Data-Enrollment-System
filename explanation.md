- **關於 JSON 轉 CSV**：
  是的！目前的 JSON 結構（包含病患資料與量測數值）完全可以轉換成 CSV 格式。我們可以在 `Confirmation.jsx` 打包 ZIP 檔案的階段，寫一支小小的轉換函式，將 `patientData` 和 `measurements` 攤平成一行行資料（例如：姓名, 病歷號, 大拇指角度...），然後改存成 `patient_data.csv` 給您下載。

- **關於 WebM 轉 MP4**：
  瀏覽器內建的 `MediaRecorder` API 在大部分環境下（包含 Chrome, Edge）**預設錄製出來的格式就是 WebM**，這也是目前網頁端原生支援度最高且效能最好的錄影格式。雖然沒辦法直接在前端「無痛、快速地」存成一般的 MP4：
  - **解法一 (後端轉檔，建議使用)**：如果這套系統會上傳到後端（FastAPI），我們可以交給後端的 Python 使用 `ffmpeg` 自動把接收到的 WebM 轉換成 MP4。這樣您的手機或電腦後續閱讀時最方便。
  - **解法二 (前端硬轉，不建議)**：前端可以使用 WebAssembly 版本的 FFmpeg (ffmpeg.wasm)，但因為影片轉檔很吃效能，如果用病患的平板或手機當場轉檔，可能會卡頓非常久甚至當機。

如果您覺得 OK，下一步我們可以先幫您把前端打包 ZIP 裡面的 `patient_data.json` 替換成 `patient_data.csv`，需要現在幫您修改嗎？
