const base_url_server = "https://api-kopi.mapid.io";
let token = localStorage.getItem("admin kopi dimedja");
token = JSON.parse(token).token;

window.addEventListener("load", function () {
  let modal = false;
  let modalOpen = document.getElementById("modalOpen");
  let modalAdd = document.getElementById("modal-add");

  modalOpen.addEventListener("click", function () {
    modal = true;
    modalRender();
  });

  const modalRender = () => {
    const render = `
    <section class="modal" >
        <div class="dashbord-form modal-content">
            <div class="dashbord-input">
                <label for="name">Name</label>
                <input type="text" id="name" placeholder="Input name here..." required/>
            </div>
            <div class="dashbord-input">
                <label>Picture</label>
                <label for="picture">
                    <img src="../assets/blank_pic.svg" alt="blank pic" id="output" />
                </label>
                <p class="alert-picture">*upload new photo here with maximum 2MB</p>
                <input
                    type="file"
                    id="picture"
                    placeholder="Input picture here..."
                    onchange="loadFile(event)"
                    required
                />
            </div>
            <div class="dashbboard-input-button">
                <button class="button-dashboard green" onclick="addCategory()">save</button>
                <button class="button-dashboard white" id="closeModal">cancel</button>
            </div>
        </div>
    </section>
        `;

    if (modal) {
      modalAdd.innerHTML = render;
    } else if (!modal) {
      modalAdd.innerHTML = null;
    }

    const closeModal = document.getElementById("closeModal");

    closeModal.addEventListener("click", function () {
      modal = false;
      modalRender();
    });
  };
});

async function addCategory() {
  const name = document.getElementById("name").value;
  const picture = document.getElementById("picture").files[0];
  const body = new FormData();

  if (picture == "" || picture == undefined) {
    alert("Masukan Foto!");
  } else if (picture != "") {
    body.set("uploaded_file", picture, picture.name);
    body.set("name", name);

    const setting = {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
        token,
      },
    };
    
    
    await axios.post(`${base_url_server}/category/with_image`, body, setting);
    window.location.reload("Refresh");
  } else {
  }
}


async function getCategory() {
  const response_no_product = await fetch(`${base_url_server}/category`);
  const response_with_product = await fetch(
    `${base_url_server}/category/with_product`
  );
  const data_with_product = await response_with_product.json();
  const data_no_product = await response_no_product.json();
  let dataCategory = document.getElementById("data-category");

  data_no_product.map((item, index) => {
    const total_product = data_with_product?.find(
      (d) => d?.categories_id == item?.id
    )?.sum_product;
    console.log(total_product);
    return (dataCategory.innerHTML += `
        <tr key=${index}>
          <td>${item.name}</td>
          <td>${total_product === undefined ? 0 : total_product}</td>
          <td>
            <img src="${base_url_server}/image/${item?.icon}" alt=${
      item?.name
    }  class="img_tabel"/>
          </td>
          <td>
            <img src="../assets/icon_edit.svg" alt="edit" onclick="modalEditCategory(${
              item.id
            })" />
            <img src="../assets/icon_delete.svg" alt="delete" onclick="modalDelete(${
              item.id
            })" />
          </td>
        </tr>
        `);
  });
}

async function modalEditCategory(id) {
  const response = await fetch(`${base_url_server}/category/detail?id=${id}`);
  let data = await response.json();
  data = data[0];

  const modalRender = `
  <section class="modal" >
  <div class="dashbord-form modal-content">
      <div class="dashbord-input">
          <label for="name">Name</label>
          <input type="text" id="name" placeholder="Input name here..." value=${data.name} required  />
      </div>
      <div class="dashbord-input">
          <label>Picture</label>
          <label for="picture">
              <img src="${base_url_server}/image/${data?.icon}"alt="blank pic" id="output" />
          </label>
          <p class="alert-picture">*upload new photo here with maximum 2MB</p>
          <input
              type="file"
              id="picture"
              placeholder="Input picture here..."
              onchange="loadFile(event)"
              required
          />
      </div>
      <div class="dashbboard-input-button">
          <button class="button-dashboard green" onclick="editCategory(${data.id})">save</button>
          <button class="button-dashboard white" onclick="editCategory()">cancel</button>
      </div>
  </div>
</section>
  `;

  let modalEdit = document.getElementById("modal-edit");
  modalEdit.innerHTML = modalRender;
}

async function editCategory(id) {
  if (id != "") {
    const name = document.getElementById("name").value;
    const picture = document.getElementById("picture").files[0];
    const body = new FormData();

    if (picture == "" || picture == undefined) {
      const setting = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ id: id, name: name }),
      };
      await fetch(`${base_url_server}/category`, setting);
    } else if (name != "" || picture != "" || picture != undefined) {
      body.set("uploaded_file", picture, picture.name);
      body.set("name", name);
      body.set("id", id);

      const setting = {
        method: "PUT",
        headers: {
          "content-type": "multipart/form-data",
          token,
        },
      };

      await axios.put(`${base_url_server}/category/with_image`, body, setting);
    }
  }
  window.location.reload("Refresh");
}

async function modalDelete(id) {
  let modalDelete = document.getElementById("modal-delete");
  modalDelete.innerHTML = `
  <section class="modal" >
    <div class="modal-content modal-edit">
      <h2>Are you sure to delete this product?</h2>
      <div>
      <button class="green" onClick="deleteCategory(${id})">Yes</button>
      <button class="white" onClick="deleteCategory()">No</button>
      </div>
    </div>
  </section>
  `;
}

async function deleteCategory(id) {
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

    await fetch(`${base_url_server}/category?id=${id}`, setting);
  }

  window.location.reload("Refresh");
}

getCategory();

let loadFile = function (event) {
  let image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};