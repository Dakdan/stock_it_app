// session.js
document.addEventListener("DOMContentLoaded", () => {

  const user = App.Auth.get();
  if (!user) {
    window.location.href = "login.html";
  }

});
