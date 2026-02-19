// js/api.js
window.ApiService = {
  async login(username, password) {
    const url = "https://script.google.com/macros/s/AKfycbzala43clqUn9Z9ky9BlAhcTq6Ang40koFQDi59q33spvLNQpcEFqc2_PJ-xT5NHx4/exec";

    try {
      const response = await fetch(url, {
        method: "POST",
        // ปรับ Header เพื่อให้ Google Apps Script ยอมรับ
        mode: "cors", 
        body: JSON.stringify({
          action: "checkLogin",
          data: {
            user: username,
            pass: password
          }
        })
      });

      // หากเชื่อมต่อสำเร็จแต่ GAS Redirect (ปกติของ GAS) fetch จะจัดการให้
      const result = await response.json();
      return result;

    } catch (error) {
      console.error("Fetch Error:", error);
      // ส่งค่ากลับไปเพื่อให้ handleLogin แสดง Modal error
      return { success: false, message: "ไม่สามารถเชื่อมต่อกับ Google Script ได้ (CORS หรือ URL ผิด)" };
    }
  }
};
