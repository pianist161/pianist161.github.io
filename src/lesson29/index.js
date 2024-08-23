const button = document.querySelector("button");
const imgUrl = document.querySelector("#imgUrl");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const url = "https://solar-poised-salad.glitch.me/products";
const productsAll = document.querySelector(".products");

button.addEventListener("click", () => {
  const product = {
    imageUrl: imgUrl.value,
    title: title.value,
    description: description.value,
    price: price.value,
  };
  addTovar(product);
});

const addTovar = async (product) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product), // Преобразуем объект в JSON-строку
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
const getData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  render(data);
  console.log(data);
};
getData();
const render = (products) => {
  productsAll.innerHTML = ""; // Очищаем контейнер один раз перед рендерингом

  products.forEach(({ title, description, price, imageUrl, id }) => {
    if (title !== "" && description !== "" && price !== "" && imageUrl !== "") {
      const product = `
        <div class="product">
          <img src="${imageUrl}" alt="" class="imageDiv" />
          <h3 class="title">${title}</h3>
          <div class="description">${description}</div>
          <div>${price}</div>
          <div class="btns">
            <button data-index-number=${id} class="btnEdit" >Edit</button>
            <button 
            data-index-number=${id} 
            class="btnDelete">Delete</button>
          </div>
        </div>
      `;
      productsAll.insertAdjacentHTML("beforeend", product);
    }
  });
  const allEditBtns = document.querySelectorAll(".btnEdit");
  allEditBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const changeProduct = {
        imageUrl: imgUrl.value,
        title: title.value,
        description: description.value,
        price: price.value,
      };

      const productId = event.target.getAttribute("data-index-number");
      editProduct(changeProduct, productId);
      console.log(productId);
    });
  });
  const allDeleteBtns = document.querySelectorAll(".btnDelete");
  allDeleteBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-index-number");
      deleteProduct(productId);
      console.log(productId);
    });
  });
};
const editProduct = async (product, id) => {
  try {
    const response = fetch(url + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = response.json();
    render(data);
  } catch (error) {
    console.log(error);
  }
};
const deleteProduct = async (id) => {
  try {
    const response = fetch(url + "/" + id, {
      method: "DELETE",
    });
    const data = response.json();
    render(data);
  } catch (error) {
    console.log(error);
  }
};
