
// api.js
window.Api = {

  async login(username, password) {

    // 🔥 ใส่ Apps Script URL ตรงนี้
    const url = "https://script.google.com/macros/s/AKfycbzala43clqUn9Z9ky9BlAhcTq6Ang40koFQDi59q33spvLNQpcEFqc2_PJ-xT5NHx4/exec";

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        action: "login",
        username,
        password
      })
    });

    return await res.json();
  }

};
