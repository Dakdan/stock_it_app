## 📡 Base Configuration

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxF7ImGdY6XqcFZ4zp6wSK4KMWTrkBk_NoMS5TucQ-e46EvvzP9O32hSzaENSqgoe0B/exec';
const SHEET_ID = 

🔄 HTTP Methods
ทั้งหมดใช้ POST method

fetch(APPS_SCRIPT_URL, {
  method: 'POST',
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ action: 'actionName', data: {...} })
})
.then(res => res.json())
.then(data => console.log(data));

📋 API Endpoints

1. Authentication

Login

// Request
{
  action: 'login',
  username: 'string (required)',
  password: 'string (required)'
}

// Response
{
  success: true,
  user: {
    ITUSERNO: 'string',
    USERID: 'string',
    UserTypeID: 'string',
    UserTypeName: 'string',
    UserName: 'string',
    UserPN: 'string',
    UserMail: 'string'
  }
}

Logout

// Request
{
  action: 'logout',
  email: 'string (required)'
}

// Response
{
  success: true,
  message: 'ออกจากระบบสำเร็จ'
}

Verify First Time

// Request
{
  action: 'verifyFirstTime',
  email: 'string (required)',
  username: 'string (required)',
  code: 'string (required)'
}

// Response
{
  success: true,
  message: 'ยืนยันตัวตนสำเร็จ'
}

Set Password

// Request
{
  action: 'setPassword',
  email: 'string (required)',
  username: 'string (required)',
  password: 'string (required, min 8 characters)'
}

// Response
{
  success: true,
  message: 'บันทึกรหัสผ่านสำเร็จ'
}

Request Password Reset

// Request
{
  action: 'requestPasswordReset',
  email: 'string (required)'
}

// Response
{
  success: true,
  message: 'ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมล'
}

2. Job Tickets Management

Get All Job Tickets

// Request
{
  action: 'getJobTickets'
}

// Response
{
  success: true,
  data: [
    {
      JobID: 'string',
      CreateDate: 'ISO 8601 datetime',
      CreateBy: 'string',
      Source: 'string',
      JobType: 'string',
      AssetCode: 'string',
      AssetName: 'string',
      Department: 'string',
      Problem: 'string',
      Priority: 'string (สูง, ปานกลาง, ต่ำ)',
      Status: 'string (รอรับงาน, กำลังดำเนินการ, เสร็จสิ้น)',
      Owner: 'string',
      StartTime: 'ISO 8601 datetime',
      CloseTime: 'ISO 8601 datetime'
    }
  ]
}

Update Job Ticket

// Request
{
  action: 'updateJobTicket',
  jobId: 'string (required)',
  updates: {
    Status: 'string (optional)',
    Owner: 'string (optional)',
    StartTime: 'ISO 8601 datetime (optional)',
    RiskNote: 'string (optional)'
  }
}

// Response
{
  success: true,
  message: 'อัปเดตงานสำเร็จ'
}

Get Job Ticket Detail

// Request
{
  action: 'getJobDetail',
  jobId: 'string (required)'
}

// Response
{
  success: true,
  data: {
    JobID: 'string',
    CreateDate: 'ISO 8601 datetime',
    CreateBy: 'string',
    // ... full job details
  }
}

3. IT Tickets (Activity Logging)

Get IT Tickets

// Request
{
  action: 'getITTickets'
}

// Response
{
  success: true,
  data: [
    {
      TicketID: 'string',
      JobType: 'string',
      SubType: 'string',
      Department: 'string',
      Asset: 'string',
      Description: 'string',
      Status: 'string',
      CreatedBy: 'string',
      CreatedDate: 'ISO 8601 datetime'
    }
  ]
}

Add IT Ticket

// Request
{
  action: 'addITTicket',
  ticket: {
    JobType: 'string (required)',
    SubType: 'string (required)',
    Department: 'string (required)',
    Asset: 'string (required)',
    Description: 'string (required)',
    Status: 'string (required)'
  }
}

// Response
{
  success: true,
  ticketId: 'string',
  message: 'บันทึกกิจกรรมสำเร็จ'
}

4. Master Data

Get IT Users

// Request
{
  action: 'getITUsers'
}

// Response
{
  success: true,
  data: [
    {
      ITUSERNO: 'string',
      UserName: 'string',
      UserPN: 'string',
      UserTypeID: 'string'
    }
  ]
}

Get Departments

// Request
{
  action: 'getDepartments'
}

// Response
{
  success: true,
  data: [
    {
      DeptID: 'string',
      Note3: 'string'
    }
  ]
}

Get Assets

// Request
{
  action: 'getAssets'
}

// Response
{
  success: true,
  data: [
    {
      AssetID: 'string',
      AssetName: 'string'
    }
  ]
}

Get Job Types

// Request
{
  action: 'getJobTypes'
}

// Response
{
  success: true,
  data: [
    {
      TypeID: 'string',
      TypeName: 'string'
    }
  ]
}

Get Job Sub Types

// Request
{
  action: 'getJobSubTypes'
}

// Response
{
  success: true,
  data: [
    {
      SubTypeID: 'string',
      TypeID: 'string',
      SubTypeName: 'string'
    }
  ]
}

Get System Links

// Request
{
  action: 'getSystemLinks'
}

// Response
{
  success: true,
  data: [
    {
      LinkID: 'string',
      Name: 'string',
      URL: 'string',
      RoleAllow: 'string',
      Active: 'string (Y/N)',
      Linkicon: 'string'
    }
  ]
}

5. Logging & Audit

Add Log

// Request
{
  action: 'addLog',
  email: 'string (required)',
  activityType: 'string (required)',
  status: 'string (SUCCESS, ERROR, WARNING)',
  message: 'string (optional)',
  timestamp: 'ISO 8601 datetime (optional)'
}

// Response
{
  success: true,
  logId: 'string',
  message: 'บันทึกสำเร็จ'
}

Get Logs

// Request
{
  action: 'getLogs',
  email: 'string (required)',
  limit: 'number (optional, default: 100)'
}

// Response
{
  success: true,
  data: [
    {
      logId: 'string',
      email: 'string',
      activityType: 'string',
      status: 'string',
      message: 'string',
      timestamp: 'ISO 8601 datetime'
    }
  ]
}

🎯 Response Format

Success Response
{
  success: true,
  data: { /* specific data */ },
  message: 'สำเร็จ'
}

Error Response
{
  success: false,
  error: 'ERROR_CODE',
  message: 'รายละเอียดข้อผิดพลาด'
}

⏱️ Status Codes & Messages

✅ 200 - Success
❌ 400 - Bad Request
🔒 401 - Unauthorized
⛔ 403 - Forbidden
🔍 404 - Not Found
⚠️ 500 - Server Error

🔒 Security Headers

// ต้องเพิ่มใน Google Apps Script
function doPost(e) {
  const response = HtmlService.createHtmlOutput('...');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('X-XSS-Protection', '1; mode=block');
  return response;
}

📊 Rate Limiting

- 60 requests per minute per user
- 1000 requests per hour per sheet
- 10MB payload limit

🔄 Example: Complete Flow

// 1. Login
const loginResult = await callApi('login', {
  username: 'USERNAME',
  password: 'PASSWORD'
});

if (!loginResult.success) throw new Error('Login failed');

const user = loginResult.user;
sessionStorage.setItem('user', JSON.stringify(user));

// 2. Get all tickets
const ticketsResult = await callApi('getJobTickets');
const tickets = ticketsResult.data;

// 3. Get departments for dropdown
const deptsResult = await callApi('getDepartments');
const departments = deptsResult.data;

// 4. Update a ticket
const updateResult = await callApi('updateJobTicket', {
  jobId: 'JOB_ID',
  updates: {
    Status: 'กำลังดำเนินการ',
    Owner: 'OWNER_NAME',
    StartTime: new Date().toISOString()
  }
});

// 5. Log the action
await callApi('addLog', {
  email: user.UserMail,
  activityType: 'UPDATE_JOB',
  status: 'SUCCESS',
  message: 'อัปเดตงาน'
});

// 6. Logout
await callApi('logout', {
  email: user.UserMail
});

🛠️ Helper Functions

// Call API
async function callApi(action, data = {}) {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, sheetId: SHEET_ID, ...data })
    });
    
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Format date
function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Generate unique ID
function generateId(prefix = 'ID') {
  return `${prefix}-${Date.now()}`;
}

📚 References

https://developers.google.com/apps-script/reference
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
https://www.json.org/

Last Updated: 2024
API Version: 1.0.0
