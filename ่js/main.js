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
        alert(`${title}: ${message}`);
    }
}

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) popup.style.display = 'none';
}

// 3. จัดการ Session ผู้ใช้
const Auth = {

    setSession: (userData) => {
        localStorage.setItem("it_session", JSON.stringify(userData));
    },

    getUser: () => {
        const data = localStorage.getItem("it_session");
        try {
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("Session parse error", e);
            return null;
        }
    },

    logout: () => {
        console.log("ล้างข้อมูล Session...");
        localStorage.clear();
        window.location.href = "./login.html";
    },

    checkAuth: () => {
        const user = Auth.getUser();
        if (!user) {
            window.location.replace("./login.html");
        }
    }
};

// ป้องกันกรณีโค้ดเดิมเรียกชื่อฟังก์ชันเก่า
function showPopup(title, message) {
    showModal(title, message, 'warning');
}
