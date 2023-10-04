const handleKeyPress = (event) => {
  if (event.key === "Enter") {
      addNewTodo();
  }
};

const addNewTodo = () => {
  let description = document.querySelector("input").value.trim();

  if (description === "") return showError();

  let database = JSON.parse(localStorage.getItem("todo-database") || "[]");
  let countItens = database.length;
  let item = {
    id: countItens + 1,
    description: description,
  };

  database.push(item);
  localStorage.setItem("todo-database", JSON.stringify(database));

  clearTodoContainer();
  assembleItens();

  document.querySelector("input").value = "";
};

const assembleItens = () => {
  let itens = JSON.parse(localStorage.getItem("todo-database"));
  let containerTodo = document.querySelector(".todo-itens");

  if (!itens || itens.length === 0) {
    let li = document.createElement("li");

    li.innerHTML = `<p>Você ainda não tem nenhuma tarefa.</p>`;
    containerTodo.appendChild(li);

    return;
  }

  itens.forEach((item) => {
    let li = document.createElement("li");

    li.innerHTML = `
         <p>${item.description}</p> <span onclick="removeItem(${item.id})">&times;</span>
      `;

    containerTodo.appendChild(li);
  });
};

const clearTodoContainer = () => {
  document.querySelector(".todo-itens").innerHTML = "";
};

const removeItem = (id) => {
  let itens = JSON.parse(localStorage.getItem("todo-database"));
  let index = itens.findIndex((item) => item.id === id);

  if (index !== -1) {
    itens.splice(index, 1);
    localStorage.setItem("todo-database", JSON.stringify(itens));

    clearTodoContainer();
    assembleItens();
  }
};

const showError = () => {
  document.querySelector(".error").style.display = "block";

  setTimeout(() => {
    document.querySelector(".error").style.display = "none";
  }, 3000);
};

assembleItens();