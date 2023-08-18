const base_url_server = "https://api-kopi.mapid.io/";
let href = window.location.href.split("/");
href = href[href.length - 1];
let token = localStorage.getItem("admin kopi dimedja");
token = JSON.parse(token).token;

async function getProduct() {
  const response = await fetch(`${base_url_server}/product`);
  const data = await response.json();

  let dataTotal = document.getElementById("data-total");
  let dataProduct = document.getElementById("data-product");

  const render = data.map((item, index) => {
    return `
        <tr key=${index}>
          <td>${item?.product_name}</td>
          <td>${item?.categories_name}</td>
          <td>${item?.price}K</td>
          <td>
          <img src="${base_url_server}/image/${item?.image}" alt=${item?.product_name}  class="img_tabel"/>
          </td>
          <td>${item?.link}</td>
          <td>
            <img src="../assets/icon_edit.svg" alt="edit"  onclick="saveIDProduct(${item.id})"/>
            <img src="../assets/icon_delete.svg" alt="delete" onclick="modalDelete(${item.id})" />
          </td>
        </tr>
        `;
  });
  dataProduct.innerHTML = render;
  dataTotal.innerHTML += `${data.length}`;
}

async function addProduct() {
  const name = document.getElementById("name").value;
  const category = document.getElementById("data-category").value;
  const price = document.getElementById("price").value;
  const link = document.getElementById("link").value;
  const picture = document.getElementById("picture").files[0];
  const body = new FormData();

  // const body = {
  //   name: name,
  //   categories_id: Number(category),
  //   price: price,
  //   image: picture,
  // };
  if (picture == "" || picture == undefined) {
    alert("Masukan Foto!");
  } else if (picture != "") {
    body.set("uploaded_file", picture, picture.name);
    body.set("name", name);
    body.set("link", link);
    body.set("categories_id", Number(category));
    body.set("price", price);

    const setting = {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
        token,
      },
    };

    await axios.post(`${base_url_server}/product/with_image`, body, setting);

    window.location =
      window.location.href.split("productAdd.html")[0] +
      "productDashboard.html";
  } else {
  }
}

async function getCategory() {
  const response = await fetch(`${base_url_server}/category`);
  const data = await response.json();

  let dataCategory = document.getElementById("data-category");

  data.map((item, index) => {
    return (dataCategory.innerHTML += `
        <option key=${index} value=${item.id}>${item.name}</option>
        `);
  });
}

function saveIDProduct(item) {
  localStorage.setItem("idProduct", item);
  window.location =
    window.location.href.split("productDashboard.html")[0] + "productEdit.html";
}

window.addEventListener("load", async function () {
  let formEdit = document.getElementById("form-edit");
  let id = localStorage.getItem("idProduct");
  id = JSON.stringify(id);

  const response_product = await fetch(
    `${base_url_server}/product/detail?id=${id}`
  );
  const response_categori = await fetch(`${base_url_server}/category`);

  const data_product = await response_product.json();
  const data_category = await response_categori.json();
  let data = data_product[0];

  const find_category = data_category.find((d) => d.id == data?.categories_id);

  const render = `
  <form class="dashbord-form">
    <div class="dashbord-input">
      <label for="name">Name</label>
      <input type="text" id="name" placeholder="Input name here..." 
      value=${data?.name} />
    </div>
    <div class="dashbord-input">
      <label for="data-category">Category</label>
      <select id="data-category" >
        <option value=${find_category?.id}>${find_category?.name}</option>
        ${data_category?.map((item, index) => {
          return `
          <option key=${index} value=${item?.id}>${item?.name}</option>
          `;
        })}
      </select>
    </div>
    <div class="dashbord-input">
      <label for="price">Price</label>
      <input type="text" id="price" placeholder="Input price here..." value=${
        data?.price
      } />
    </div>
    <div class="dashbord-input">
    <label for="link">Link</label>
    <input type="text" id="link" placeholder="Input link here..." value=${
      data?.link
    } />
  </div>
    <div class="dashbord-input">
      <label>Picture</label>
      <label for="picture">
        <img src="${base_url_server}/image/${
    data?.image
  }"alt="blank pic" id="output" />
      </label>
      <p class="alert-picture">*upload new photo here with maximum 2MB</p>
      <input
        type="file"
        id="picture"
        placeholder="Input picture here..."
        onchange="loadFile(event)"
      />
    </div>
    <div class="dashbboard-input-button">
      <button
        class="button-dashboard green"
        type="button"
        onclick="editProduct()"
      >
        save
      </button>
      <a href="./productDashboard.html">
        <button class="button-dashboard white" type="button">cancel</button>
      </a>
    </div>
  </form>
  `;

  if (href === "productEdit.html") {
    formEdit.innerHTML = render;
  }
});

async function editProduct() {
  let id = localStorage.getItem("idProduct");
  id = JSON.stringify(id);
  const name = document.getElementById("name").value;
  const category = document.getElementById("data-category").value;
  const price = document.getElementById("price").value;
  const link = document.getElementById("link").value;
  const picture = document.getElementById("picture").files[0];
  const body = new FormData();

  if (picture == "" || picture == undefined) {
    const body = {
      id: id,
      name: name,
      categories_id: category,
      price: price,
      link: link,
      image: picture,
    };

    const setting = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify(body),
    };

    await fetch(`${base_url_server}/product/edit`, setting);
  } else {
    body.set("uploaded_file", picture, picture.name);
    body.set("name", name);
    body.set("categories_id", Number(category));
    body.set("price", price);
    body.set("link", link);
    body.set("id", id);

    const setting = {
      method: "PUT",
      headers: {
        "content-type": "multipart/form-data",
        token,
      },
    };

    await axios.put(`${base_url_server}/product/with_image`, body, setting);
  }

  localStorage.removeItem("idProduct");
  window.location =
    window.location.href.split("productEdit.html")[0] + "productDashboard.html";
}

async function modalDelete(id) {
  let modalDelete = document.getElementById("modal-delete");
  modalDelete.innerHTML = `
  <section class="modal" >
    <div class="modal-content modal-edit">
      <h2>Are you sure to delete this product?</h2>
      <div>
      <button class="green" onClick="deleteProduct(${id})">Yes</button>
      <button class="white" onClick="deleteProduct()">No</button>
      </div>
    </div>
  </section>
  `;
}

async function deleteProduct(id) {
  if (id != "") {
    const body = {
      id: id,
    };

    const setting = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify(body),
    };

    await fetch(`${base_url_server}/product?id=${id}`, setting);
  }

  window.location.reload("Refresh");
}

let loadFile = function (event) {
  let image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};

if (href == "productDashboard.html") {
  getProduct();
  getCategory();
} else if (href == "productAdd.html") {
  getCategory();
}
