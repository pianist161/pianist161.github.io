const usersDiv = document.querySelector(".users");
const button = document.querySelector("button");
const input = document.querySelector("input");
const select = document.querySelector("select");
const sortobj = document.querySelector("#sortobj");

let usersAll = [];

// Функция для получения случайных пользователей
const renderUsers = (countUsers) => {
  return fetch(`https://randomuser.me/api/?results=${countUsers}`)
    .then((response) => response.json())
    .then((data) => {
      return data.results; // Изменения: упрощен код, убраны лишние then и catch
    })
    .catch((error) => console.log(error));
};

// Обработчик для фильтрации пользователей
select.addEventListener("change", (event) => {
  usersDiv.innerHTML = ""; // Изменение: очистка контейнера перед рендерингом
  filterUser(usersAll, event.target.value).forEach((item) => {
    newRenderOneUser(item); // Исправлено название функции filterUser
  });
});

// Обработчик для кнопки "Click"
button.addEventListener("click", () => {
  usersDiv.innerHTML = ""; // Изменение: очистка контейнера перед рендерингом
  render(input.value);
});
sortobj.addEventListener("change", (event) => {
  usersDiv.innerHTML = "";
  if (event.target.value === "none") {
    // Если выбрано "none", отображаем всех пользователей без сортировки
    usersAll.forEach((item) => newRenderOneUser(item));
  } else {
    // В противном случае, сортируем и отображаем пользователей
    sorterUsers(event.target.value, [...usersAll]).forEach((item) =>
      newRenderOneUser(item)
    );
  }
});
const sorterUsers = (order, users) => {
  return users.sort((a, b) => {
    if (order === "a-z") {
      return a.name.first.localeCompare(b.name.first);
    } else if (order == "z-a") {
      return b.name.first.localeCompare(a.name.first);
    }
  });
};
// Функция для рендеринга пользователей
const render = (userCount) => {
  renderUsers(userCount).then((users) => {
    usersAll = users; // Изменение: сохраняем всех пользователей

    users.forEach((user) => {
      newRenderOneUser(user);
    });
  });
};

// Функция для создания и отображения карточки пользователя
const newRenderOneUser = ({
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
};

// Функция фильтрации пользователей по полу
const filterUser = (users, gender) => {
  // Исправлено название функции на filterUser
  if (gender === "all") {
    // Изменение: проверка с использованием строгого сравнения
    return users; // Возвращаем всех пользователей, если выбран "all"
  }
  return users.filter((element) => element.gender === gender); // Упрощенная стрелочная функция
};
