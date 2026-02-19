// js/api.js
window.ApiService = {
    async login(username, password) {
        const url = "https://script.google.com/macros/s/AKfycbzala43clqUn9Z9ky9BlAhcTq6Ang40koFQDi59q33spvLNQpcEFqc2_PJ-xT5NHx4/exec";

        // สร้างข้อมูลในรูปแบบที่ Google Apps Script รับได้ง่ายที่สุด
        const payload = {
            action: "checkLogin",
            data: {
                user: username,
                pass: password
            }
        };

        try {
            // ใช้เทคนิคส่งผ่าน POST แต่ส่งเป็น String ธรรมดาเพื่อเลี่ยงปัญหา CORS
            const response = await fetch(url, {
                method: "POST",
                mode: "no-cors", // ลองใช้โหมดนี้ถ้ายัง Error หรือปรับเปลี่ยนตามการตั้งค่า GAS
                body: JSON.stringify(payload)
            });

            /* ⚠️ หมายเหตุ: ถ้าใช้ mode "no-cors" เราจะอ่านค่า JSON ตอบกลับไม่ได้ 
               แนะนำให้ลองแบบปกติก่อนตามด้านล่างนี้:
            */
            const normalResponse = await fetch(url, {
                method: "POST",
                body: JSON.stringify(payload)
            });

            return await normalResponse.json();

        } catch (error) {
            console.error("Fetch Error:", error);
            throw error;
        }
    }
};
