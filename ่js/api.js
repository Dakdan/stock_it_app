window.ApiService = {
  async login(username, password) {
    const url = "https://script.google.com/macros/s/AKfycbwPk2LYTrUxUkEZmTuwrZ6vWtInLSbzTC7fscaKo7AENJ3cua0Nufl36OCFES3fqGw8hg/exec";

    try {
      // ส่งข้อมูลผ่านฟอร์มเพื่อเลี่ยงปัญหา CORS
      const response = await fetch(url, {
        method: "POST",
        mode: "cors", // ต้องเป็น cors เพื่อให้อ่านผลลัพธ์ JSON ได้
        headers: {
          "Content-Type": "text/plain;charset=utf-8", // ใช้ text/plain เพื่อเลี่ยงการติด Preflight
        },
        body: JSON.stringify({
          action: "checkLogin",
          data: {
            user: username,
            pass: password
          }
        })
      });

      const result = await response.json(); // GAS จะส่ง JSON กลับมา
      return result;

    } catch (error) {
      console.error("Fetch Error:", error);
      return { success: false, message: "ไม่สามารถเข้าถึงเซิร์ฟเวอร์ได้ (CORS หรือ URL ไม่ถูกต้อง)" };
    }
  }
};
