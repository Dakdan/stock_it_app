   // api.js
window.ApiService = { 

  async login(username, password) {
    // URL ของคุณ
    const url = "https://script.google.com/macros/s/AKfycbzala43clqUn9Z9ky9BlAhcTq6Ang40koFQDi59q33spvLNQpcEFqc2_PJ-xT5NHx4/exec";

    try {
      const res = await fetch(url, {
        method: "POST",
        // ปรับ Body ให้เข้ากับโครงสร้างที่ GAS ต้องการ (action และ data)
        body: JSON.stringify({
          action: "checkLogin", // ต้องเป็น checkLogin ตามใน GAS
          data: {
            user: username,
            pass: password
          }
        })
      });

      const result = await res.json();
      return result;

    } catch (error) {
      console.error("API Error:", error);
      return { success: false, message: "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้" };
    }
  }
};
