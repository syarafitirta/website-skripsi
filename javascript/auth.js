async function loginUser(event) {
  event.preventDefault();

  const base_url_server = "https://api-kopi.mapid.io/";
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  let alert = document.getElementById("alert-login");
  let body = {
    username,
    password,
  };

  body = JSON.stringify(body);

  const setting = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: username, password: password }),
  };

  try {
    if (username != "" && password != "") {
      const response = await fetch(`${base_url_server}/user/login`, setting);
      const res = await response.json();
      const href = window.location.href.split("login.html")[0];

      if (res.error) {
        alert.innerHTML = "Username dan Password tidak ditemukan!";
      } else {
        alert.innerHTML = "Berhasil login!";

        let body = {
          name: res.user.name,
          token: res.token,
        };

        body = JSON.stringify(body);

        localStorage.setItem("admin kopi dimedja", body);
        window.location = href + "productDashboard.html";
      }
    } else {
      alert.innerHTML = "Masukan Username dan Password!";
    }
  } catch (error) {
    console.log(error);
  }
}

async function logoutUser(path) {
  const href = window.location.href.split(`pages/${path}`)[0];

  localStorage.removeItem("admin kopi dimedja");
  window.location = href + "index.html";
}

window.addEventListener("load", function () {
  let dashbboard = document.getElementById("dashbboard");
  const user = localStorage.getItem("admin kopi dimedja");
  const render = `
    <section class="page-blank">
      <h1>your not login!!</h1>
      <button class='green'>  
        <a href="../index.html">
        home
        </a>
      </button>
    </section>
`;

  if (user == null || user === undefined) {
    dashbboard.innerHTML = render;
  }
});
