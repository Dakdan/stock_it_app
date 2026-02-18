/**
 * main.js - ศูนย์กลางควบคุม UI และ Session (Stable Core)
 */

/* ==============================
   1) Loader Utility
================================ */
const Loader = {
    show() {
        const el = document.getElementById('loader');
        if (el) el.style.display = 'flex';
    },
    hide() {
        const el = document.getElementById('loader');
        if (el) el.style.display = 'none';
    }
};


/* ==============================
   2) Modal / Popup System
================================ */
function showModal(title, message, type = 'success') {
    const popup = document.getElementById('popup');
    const pTitle = document.getElementById('popup-title');
    const pMsg = document.getElementById('popup-message');
    const pBox = document.querySelector('.popup-box');

    if (!popup || !pTitle || !pMsg) {
        alert(`${title}\n${message}`);
        return;
    }

    if (pBox) {
        pBox.classList.remove('success', 'error', 'warning');
        pBox.classList.add(type);
    }

    let icon = "🔔";
    if (type === 'success') icon = "✅";
    if (type === 'error') icon = "❌";
    if (type === 'warning') icon = "⚠️";

    pTitle.innerHTML = `
        <span style="font-size:2.5rem;display:block;margin-bottom:10px;">
            ${icon}
        </span>
        ${title}
    `;

    pMsg.innerText = message;
    popup.style.display = 'flex';
}

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) popup.style.display = 'none';
}

// backward compatibility (กันโค้ดเก่าเรียกชื่อเก่า)
function showPopup(title, message) {
    showModal(title, message, 'warning');
}


/* ==============================
   3) Auth / Session Manager
================================ */
const Auth = {

    setSession(userData) {
        try {
            localStorage.setItem("it_session", JSON.stringify(userData));
        } catch (e) {
            console.error("Session save error:", e);
        }
    },

    getUser() {
        try {
            const raw = localStorage.getItem("it_session");
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            console.error("Session parse error:", e);
            return null;
        }
    },

    logout() {
        try {
            localStorage.removeItem("it_session");
        } catch (e) {
            console.error("Session clear error:", e);
        }
        window.location.href = "./login.html";
    },

    checkAuth() {
        const user = this.getUser();
        if (!user) {
            window.location.replace("./login.html");
        }
    }
};


/* ==============================
   4) Safe Global Guard
   ป้องกันกรณีไฟล์โหลดก่อน DOM
================================ */
document.addEventListener("DOMContentLoaded", () => {
    // ไม่มี logic บังคับ
    // กันกรณีต้อง init อะไรในอนาคต
});
