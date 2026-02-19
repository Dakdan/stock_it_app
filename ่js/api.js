// js/api.js
window.ApiService = { 
  async login(username, password) {
    const url = "https://script.google.com/macros/s/AKfycbzala43clqUn9Z9ky9BlAhcTq6Ang40koFQDi59q33spvLNQpcEFqc2_PJ-xT5NHx4/exec";

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          action: "checkLogin", // แก้ให้ตรงกับ switch ใน GAS
          data: {               // ส่งเข้าตัวแปร data ตามที่ GAS ดึงไปใช้
            user: username,
            pass: password
          }
        })
      });
      return await res.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
};
