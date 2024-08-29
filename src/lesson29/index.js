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
      body: JSON.stringify(product),
    });
    await response.json();
    getData(); // Перерендер после добавления продукта
  } catch (error) {
    console.log(error);
  }
};

const getData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    render(data);
  } catch (error) {
    console.log(error);
  }
};

const render = (products) => {
  productsAll.innerHTML = ""; // Очищаем контейнер перед рендерингом

  products.forEach(({ title, description, price, imageUrl, id }) => {
    if (title && description && price && imageUrl) {
      const product = `
        <div class="product">
          <img src="${imageUrl}" alt="" class="imageDiv" />
          <h3 class="title">${title}</h3>
          <div class="description">${description}</div>
          <div>${price}</div>
          <div class="btns">
            <button data-index-number=${id} class="btnEdit">Edit</button>
            <button data-index-number=${id} class="btnDelete">Delete</button>
          </div>
        </div>
      `;
      productsAll.insertAdjacentHTML("beforeend", product);
    }
  });

  // Обработчики кнопок редактирования
  document.querySelectorAll(".btnEdit").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-index-number");
      const changeProduct = {
        imageUrl: imgUrl.value,
        title: title.value,
        description: description.value,
        price: price.value,
      };
      editProduct(changeProduct, productId);
    });
  });

  // Обработчики кнопок удаления
  document.querySelectorAll(".btnDelete").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-index-number");
      deleteProduct(productId);
    });
  });
};

const editProduct = async (product, id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    await response.json();
    getData(); // Перерендер после редактирования продукта
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Product deleted successfully");
      getData(); // Перерендер после удаления продукта
    } else {
      console.error(
        `Failed to delete product with ID ${id}: ${response.status}`
      );
    }
  } catch (error) {
    console.log(error);
  }
};

getData(); // Начальная загрузка данных
