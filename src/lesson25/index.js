// const getItemStore = (item) => {
//   return fetch(`https://fakestoreapi.com/products/${item}`, { method: "GET" })
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((error) => {
//       console.log(error);
//     });
// };
// getItemStore(2);
// const getRandomDog = () => {
//   return fetch("https://dog.ceo/api/breeds/image/random")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       return data.message;
//     })
//     .catch((error) => console.log(error));
// };
// const button = document.querySelector("button");
// const img = document.querySelector("img");
// button.addEventListener("click", () => {
//   getRandomDog().then((imageUrl) => {
//     img.src = imageUrl;
//   });
// });
const usersDiv = document.querySelector(".users");
const renderUsers = (countUsers) => {
  return fetch(`https://randomuser.me/api/?results=${countUsers}`).then(
    (response) =>
      response
        .json()
        .then((data) => {
          console.log(data.results);
          return data.results;
        })
        .catch((error) => console.log(error))
  );
};
const button = document.querySelector("button");
const input = document.querySelector("input");
button.addEventListener("click", () => {
  usersDiv.innerHTML = "";
  render(input.value);
});
const render = (user) => {
  renderUsers(user).then((users) => {
    users.forEach(
      ({
        email,
        gender,
        picture: { large },
        cell,
        name: { title, first, last },
      }) => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");

        // Добавляем изображение
        const imgElement = document.createElement("img");
        imgElement.src = large;

        // Добавляем имя пользователя
        const nameElement = document.createElement("h2");
        nameElement.textContent = `${title} ${first} ${last}`;

        // Добавляем email
        const emailElement = document.createElement("p");
        emailElement.classList.add("email");
        emailElement.textContent = `Email: ${email}`;

        // Добавляем номер телефона
        const cellElement = document.createElement("p");
        cellElement.classList.add("cell");
        cellElement.textContent = `Phone: ${cell}`;

        // Добавляем пол
        const genderElement = document.createElement("p");
        genderElement.classList.add("gender");
        genderElement.textContent = `Gender: ${gender}`;

        // Добавляем элементы в карточку
        userCard.appendChild(imgElement);
        userCard.appendChild(nameElement);
        userCard.appendChild(emailElement);
        userCard.appendChild(cellElement);
        userCard.appendChild(genderElement);

        // Добавляем карточку пользователя в контейнер
        usersDiv.appendChild(userCard);
      }
    );
  });
};

// renderUsers().then((users) => {
//   users.forEach((user) => {
//     console.log(user);
//   });
// });
