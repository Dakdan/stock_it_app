/**
 * Main.js - ศูนย์กลางควบคุม UI และ Session (ฉบับเสถียร)
 */

// 1. จัดการ Loader (วงกลมหมุนๆ)
const Loader = {
    show: () => {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'flex';
    },
    hide: () => {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
    }
};

// 2. จัดการ Modal/Popup แจ้งเตือน
/**
 * @param {string} title - หัวข้อ
 * @param {string} message - ข้อความ
 * @param {string} type - 'success', 'error', 'warning'
 */
function showModal(title, message, type = 'success') {
    const popup = document.getElementById('popup');
    const pTitle = document.getElementById('popup-title');
    const pMsg = document.getElementById('popup-message');
    const pBox = document.querySelector('.popup-box');

    if (popup && pTitle && pMsg) {
        // เปลี่ยนสีแถบตามประเภท
        if (pBox) {
            pBox.classList.remove('success', 'error', 'warning');
            pBox.classList.add(type);
        }

        let icon = "🔔";
        if (type === 'success') icon = "✅";
        if (type === 'error') icon = "❌";
        if (type === 'warning') icon = "⚠️";

        pTitle.innerHTML = `<span style="font-size: 2.5rem; display: block; margin-bottom: 10px;">${icon}</span>${title}`;
        pMsg.innerText = message;
        
        popup.style.display = 'flex';
    } else {
        // Fallback กรณีหา Element ไม่เจอ
        alert(`${title}: ${message}`);
    }
}

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) popup.style.display = 'none';
}

// 3. จัดการ Session ผู้ใช้
const Auth = {
    // บันทึกข้อมูล (ชื่อ key ต้องตรงกับที่เรียกใน index.html)
    setSession: (userData) => {
        localStorage.setItem("it_session", JSON.stringify(userData));
    },

    // ดึงข้อมูล
    getUser: () => {
        const data = localStorage.getItem("it_session");
        try {
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("Session parse error", e);
            return null;
        }
    },

    // ออกจากระบบ (ล้างค่าและเปลี่ยนหน้า)
   // แก้ไขส่วน Auth.logout ในไฟล์ js/main.js
const Auth = {
    // ... ฟังก์ชันอื่นๆ (setSession, getUser) ...

    logout: () => {
        console.log("ล้างข้อมูล Session...");
        // ลบข้อมูลทั้งหมดใน LocalStorage
        localStorage.clear(); 
        
        // ใช้ชื่อไฟล์ให้ตรงกับใน GitHub (login.html ตัวเล็กทั้งหมด)
        // ระบุ path แบบชัดเจนด้วย ./
        window.location.href = "./login.html"; 
    },

    checkAuth: () => {
        if (!Auth.getUser()) {
            window.location.href = "./login.html";
        }
    }
};
}

    // ตรวจสอบสิทธิ์เข้าหน้าเว็บ
    checkAuth: () => {
        const user = Auth.getUser();
        if (!user) {
            window.location.replace("login.html");
        }
    }
};

// ป้องกันกรณีโค้ดเดิมเรียกชื่อฟังก์ชันเก่า
function showPopup(title, message) {
    showModal(title, message, 'warning');
}
