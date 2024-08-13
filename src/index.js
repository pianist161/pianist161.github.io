const select = document.querySelector("select");
select.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
  if (selectedValue === "homework1") {
    window.location.href = "src/homework1/3project/index.html";
  } else if (selectedValue === "homework2") {
    window.location.href = "homework2.html"; // Замените на путь к вашему файлу
  }
});
