const base_url_server = "https://api-kopi.mapid.io";

window.addEventListener("load", async function () {
  // List Menu
  const response_categori = await fetch(`${base_url_server}/category`);
  const response_product = await fetch(`${base_url_server}/product`);
  const data_category = await response_categori.json();
  const data_product = await response_product.json();

  let renderMenu = document.getElementById("menu-category");

  data_category.forEach((item) => {
    renderMenu.innerHTML += `
          <figure class="menu-list" id=${item.name}>
              <div id="${item.name}_color" class="menu-list-icon">
                    <img src="${base_url_server}/image/${item?.icon}" alt="menu icon" />
              </div>
              <h2>${item.name}</h2>
          </figure>`;
  });

  // Get Menu Optional
  const coffeeBtn = document.getElementById("coffee");
  const noncoffeeBtn = document.getElementById("non-coffee");
  const snackBtn = document.getElementById("snack");
  const foodBtn = document.getElementById("food");
  let listMenu = document.getElementById("menu-list");

  // Change Menu Color
  const changeColor = (name) => {
    document.getElementById("coffee_color").style.backgroundColor =
      name === "idCoffee_color" ? "#413A3A" : "#ffffff";
    document.getElementById("non-coffee_color").style.backgroundColor =
      name === "idNonCoffee_color" ? "#413A3A" : "#ffffff";
    document.getElementById("snack_color").style.backgroundColor =
      name === "idSnack_color" ? "#413A3A" : "#ffffff";
    document.getElementById("food_color").style.backgroundColor =
      name === "idFood_color" ? "#413A3A" : "#ffffff";
  };

  // Frist Render List Menu
  const render = data_product
    .filter((d) => d.categories_name == "coffee")
    .map((item) => {
      return `
      <a href='${item?.link}' target="_blank">
      <figure class="menu-card">
        <img src="${base_url_server}/image/${item?.image}" alt="menu icon" />
        <p>${item.product_name}</p>
        <h3>${item.price}K</h3>
      </figure>
      </a>
      
    `;
    });
  listMenu.innerHTML = render;

  changeColor("idCoffee_color");

  // IF click menu render list menu change like this
  coffeeBtn.addEventListener("click", function () {
    const render = data_product
      .filter((d) => d.categories_name == "coffee")
      .map((item) => {
        return `
        <a href='${item?.link}' target="_blank">
          <figure class="menu-card">
            <img src="${base_url_server}/image/${item?.image}" alt="menu icon" />
            <p>${item.product_name}</p>
            <h3>${item.price}K</h3>
          </figure>
        </a>
    `;
      });
    listMenu.innerHTML = render;
    changeColor("idCoffee_color");
  });

  noncoffeeBtn.addEventListener("click", function () {
    const render = data_product
      .filter((d) => d.categories_name == "non-coffee")
      .map((item) => {
        return `
        <a href='${item?.link}' target="_blank">
          <figure class="menu-card">
            <img src="${base_url_server}/image/${item?.image}" alt="menu icon" />
            <p>${item.product_name}</p>
            <h3>${item.price}K</h3>
          </figure>
        </a>
    `;
      });
    listMenu.innerHTML = render;
    changeColor("idNonCoffee_color");
  });

  snackBtn.addEventListener("click", function () {
    const render = data_product
      .filter((d) => d.categories_name == "snack")
      .map((item) => {
        return `
      <a href='${item?.link}' target="_blank">
        <figure class="menu-card">
          <img src="${base_url_server}/image/${item?.image}" alt="menu icon" />
          <p>${item.product_name}</p>
          <h3>${item.price}K</h3>
        </figure>
      </a>
    `;
      });
    listMenu.innerHTML = render;
    changeColor("idSnack_color");
  });

  foodBtn.addEventListener("click", function () {
    const render = data_product
      .filter((d) => d.categories_name == "food")
      .map((item) => {
        return `
      <a href='${item?.link}' target="_blank">
        <figure class="menu-card">
          <img src="${base_url_server}/image/${item?.image}" alt="menu icon" />
          <p>${item.product_name}</p>
          <h3>${item.price}K</h3>
        </figure>
      </a>
    `;
      });

    listMenu.innerHTML = render;
    changeColor("idFood_color");
  });
});
