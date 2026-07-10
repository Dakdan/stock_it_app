/*
 * ============================================================================
 * ไฟล์: auth-check.js
 * วัตถุประสงค์: ตรวจสอบและจัดการสถานะการเข้าสู่ระบบ (Authentication) จาก LocalStorage
 * รูปแบบการทำงาน: แบบ Soft Check (ไม่บังคับเด้งออก) เพื่อให้หน้า HTML ปลายทาง 
 *                สามารถจัดการ UI (เช่น สลับปุ่มล็อกอิน/แสดงข้อมูล) ได้เอง
 * 
 * ----------------------------------------------------------------------------
 * 📌 แนวทางการนำไปใช้งานในหน้า HTML อื่นๆ:
 * 1. การเรียกใช้: 
 *    นำโค้ดบรรทัดนี้ไปวางไว้ในแท็ก <head> ของทุกหน้า HTML ที่ต้องการตรวจสอบสิทธิ์
 *    <script src="auth-check.js"></script>
 * 
 * 2. ลำดับการวาง: 
 *    ควรวางก่อน Script อื่นๆ ที่ต้องใช้ข้อมูลผู้ใช้ เพื่อให้ window.user พร้อมใช้งานทันที
 * 
 * 3. ตัวอย่างการเขียนเงื่อนไขในหน้า HTML (JS):
 *    - ตรวจสอบว่าล็อกอินหรือไม่: 
 *      if (getCurrentUser()) { ...ทำคำสั่งเมื่อล็อกอินแล้ว... } else { ...แจ้งเตือนให้ล็อกอิน... }
 *    - ตรวจสอบสิทธิ์การเข้าถึง (Role): 
 *      if (hasRole('ADMIN')) { ...แสดงเมนูผู้ดูแล... }
 *    - ดึงชื่อไปแสดงผล: 
 *      document.getElementById('user-name').innerText = getDisplayName();
 * ============================================================================
 */

(function () {
    try {
        // ดึงข้อมูลจาก LocalStorage ด้วย Key: 'currentUser'
        const userData = localStorage.getItem('currentUser');
        
        // เงื่อนไข 1: หากไม่มีข้อมูลในระบบ
        if (!userData) {
            window.user = null; // ปรับไม่ให้เด้งหนี เพื่อส่งค่าไปเปลี่ยนสลับปุ่มล็อกอินที่หน้าหลักแทน
            return;
        }

        const user = JSON.parse(userData);
        
        // เงื่อนไข 2: หากมีข้อมูลแต่โครงสร้างไม่ถูกต้อง (ไม่มี UserPN)
        if (!user || !user.UserPN) {
            localStorage.removeItem('currentUser'); // ล้างข้อมูลขยะทิ้ง
            window.user = null;
            return;
        }

        // เงื่อนไข 3: ข้อมูลถูกต้อง
        // ผูก Object ผู้ใช้งานเข้ากับ Global Window สำหรับการดึงใช้งานในหน้าเพจได้อย่างอิสระ
        window.user = user;
    } catch (err) {
        console.error("Auth-Check error: ", err);
        localStorage.removeItem('currentUser');
        window.user = null;
    }
})();

/**
 * 🛠️ ฟังก์ชัน: getCurrentUser()
 * หน้าที่: ดึงข้อมูล Object ของผู้ใช้งานทั้งหมด
 * การนำไปใช้: ใช้เมื่อต้องการดึงข้อมูลเชิงลึก เช่น user.UserPN, user.DeptName
 * Return: (Object) ข้อมูลผู้ใช้ หรือ (null) หากไม่ได้ล็อกอิน
 */
function getCurrentUser() {
    return window.user || null;
}


// * 🛠️ ฟังก์ชัน: hasRole(role)
// * หน้าที่: ตรวจสอบระดับสิทธิ์ (UserTypeID) ของผู้ใช้งาน
// * การนำไปใช้: ใช้ซ่อน/แสดง เมนู หรือปุ่มที่ต้องการสิทธิ์เฉพาะเจาะจง
//* param     {string} role - ชื่อสิทธิ์ที่ต้องการตรวจสอบ (ตัวพิมพ์เล็ก-ใหญ่ไม่มีผล)
// * Return: (boolean) true ถ้าสิทธิ์ตรงกัน, false ถ้าไม่ตรงหรือไม่ได้ล็อกอิน
// */
function hasRole(role) {
    if (!window.user) return false;
    return String(window.user.UserTypeID).toUpperCase() === String(role).toUpperCase();
}

/**
 * 🛠️ ฟังก์ชัน: getDisplayName()
 * หน้าที่: ดึงชื่อและนามสกุลมาต่อกันเพื่อพร้อมแสดงผล
 * การนำไปใช้: นำไปแทนที่ Text ใน UI ส่วน Header หรือ Profile
 * Return: (string) "ชื่อ นามสกุล" หรือ "ผู้ใช้งานทั่วไป" หากไม่ได้ล็อกอิน
 */
function getDisplayName() {
    if (!window.user) return "ผู้ใช้งานทั่วไป";
    return (window.user.UserName || "") + " " + (window.user.UserSname || "");
}

/**
 * 🛠️ ฟังก์ชัน: logout()
 * หน้าที่: ออกจากระบบ ล้างข้อมูลเซสชัน และกลับหน้าแรก
 * การนำไปใช้: ผูกกับปุ่ม "ออกจากระบบ" (onclick="logout()")
 * การทำงาน: ลบ currentUser -> เคลียร์ Session -> บังคับ Redirect ไปหน้า index.html
 */
function logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.clear();
    try {
        window.location.replace("index.html"); // ใช้ replace เพื่อไม่ให้กด Back กลับมาได้
    } catch(e) {
        window.location.href = "index.html"; // Fallback กรณี Browser ไม่รองรับ replace
    }
}
