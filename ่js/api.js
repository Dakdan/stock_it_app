// api.js
window.ApiService = { // ต้องเป็น ApiService ให้ตรงกับที่เรียกในหน้า HTML

  async login(username, password) {
    const url = "https://script.google.com/macros/s/AKfycbzala43clqUn9Z9ky9BlAhcTq6Ang40koFQDi59q33spvLNQpcEFqc2_PJ-xT5NHx4/exec";

    try {
      // ส่งข้อมูลในรูปแบบ JSON ตามที่ doPost ใน GAS รอรับ
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          action: "checkLogin", // ต้องตรงกับ switch(action) ใน Google Apps Script
          data: {               // ต้องห่อด้วย data ตามโครงสร้าง let { action, data } = request
            user: username,
            pass: password
          }
        })
      });

      if (!res.ok) throw new Error('Network response was not ok');
      
      const result = await res.json();
      return result;

    } catch (error) {
      console.error("Login Error:", error);
      return { success: false, message: "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ หรือ Error ใน API" };
    }
  }
};
