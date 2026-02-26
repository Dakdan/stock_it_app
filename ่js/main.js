/**
 * main.js - ศูนย์กลางควบคุม UI, Dropdown, และ Session (Enhanced Version)
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
    3) UI & Dropdown Utilities (เพิ่มใหม่)
================================ */
const UI = {
    /**
     * เติมข้อมูลลง Dropdown (ใช้ร่วมกันได้ทุก Modal)
     * @param {string} targetId - ID ของแท็ก select
     * @param {Array} dataList - ข้อมูล [{id, label}, ...]
     * @param {string} placeholder - ข้อความเริ่มต้น
     */
    fillSelect(targetId, dataList, placeholder = "-- เลือก --") {
        const el = document.getElementById(targetId);
        if (!el) return;
        
        el.innerHTML = `<option value="">${placeholder}</option>`;
        if (!dataList) return;

        dataList.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.id;
            // ใช้ label จาก Backend (Note3 สำหรับหน่วยงาน / ชื่อ+นามสกุล สำหรับเจ้าหน้าที่)
            opt.textContent = item.label || item.name || "ไม่มีชื่อ"; 
            el.appendChild(opt);
        });
    },

    /**
     * กรองประเภทย่อยตามประเภทหลัก (Dependent Dropdown)
     * @param {string} typeCode - รหัสประเภทหลักที่เลือก
     * @param {Array} allSubTypes - ข้อมูลประเภทย่อยทั้งหมดจาก Backend
     * @param {string} targetId - ID ของ Dropdown ประเภทย่อย
     */
    renderSubTypes(typeCode, allSubTypes, targetId) {
        if (!typeCode) {
            this.fillSelect(targetId, [], "-- กรุณาเลือกประเภทหลักก่อน --");
            return;
        }
        const filtered = allSubTypes.filter(s => String(s.JobTypeCode) === String(typeCode));
        const mapped = filtered.map(s => ({ 
            id: s.JobSubTypeCode, 
            label: s.JobSubTypeName 
        }));
        this.fillSelect(targetId, mapped, "-- เลือกประเภทย่อย --");
    }
};


/* ==============================
    4) Auth / Session Manager
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
    5) Safe Global Guard
================================ */
document.addEventListener("DOMContentLoaded", () => {
    // ตรวจสอบความพร้อมของระบบ
    console.log("IT UDON HOSP - Unified Main Core Ready (2026)");
});
