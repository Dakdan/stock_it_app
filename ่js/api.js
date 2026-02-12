// js/api.js
const API_URL = 'https://script.google.com/macros/s/AKfycbzala43clqUn9Z9ky9BlAhcTq6Ang40koFQDi59q33spvLNQpcEFqc2_PJ-xT5NHx4/exec';

const ApiService = {
  async login(username, password) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        // ห้ามใช้ no-cors เพราะจะอ่าน JSON กลับมาไม่ได้
        mode: 'cors', 
        headers: {
          // ใช้ text/plain เพื่อหลีกเลี่ยงปัญหา Preflight CORS กับ Google Script
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          action: 'checkLogin',
          data: { user: username, pass: password }
        })
      });

      // ตรวจสอบสถานะการตอบกลับ
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      return result;

    } catch (error) {
      console.error("Fetch Error:", error);
      // ส่ง Object กลับไปเพื่อให้หน้า Login แสดง Modal Error ได้ถูกต้อง
      return { success: false, message: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้" };
    }
  },

  // เพิ่มฟังก์ชันสำหรับดึงข้อมูล (เผื่อเรียกใช้ในหน้า Dashboard)
  async getInitialData(userName) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'getInitialData',
          data: { userName: userName }
        })
      });
      return await response.json();
    } catch (error) {
      console.error("Fetch Data Error:", error);
      return { success: false, message: "โหลดข้อมูลล้มเหลว" };
    }
  }
};
