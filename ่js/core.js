// core.js
window.App = {};

// ================= Loader =================
App.Loader = {
  show() {
    const el = document.getElementById("loader");
    if (el) el.style.display = "flex";
  },
  hide() {
    const el = document.getElementById("loader");
    if (el) el.style.display = "none";
  }
};

// ================= Modal =================
App.Modal = function (title, message) {
  alert(title + "\n" + message);
};

// ================= Auth =================
App.Auth = {
  set(user) {
    localStorage.setItem("it_session", JSON.stringify(user));
  },
  get() {
    return JSON.parse(localStorage.getItem("it_session"));
  },
  clear() {
    localStorage.removeItem("it_session");
  }
};
