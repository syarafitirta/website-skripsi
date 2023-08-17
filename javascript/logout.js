async function logoutUser(path) {
  const href = window.location.href.split(`pages/${path}`)[0];

  localStorage.removeItem("admin kopi dimedja");
  window.location = href + "index.html";
}
