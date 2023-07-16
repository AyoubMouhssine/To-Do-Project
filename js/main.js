let ajouterbtn = document.querySelector("#ajouterbtn");
ajouterBtn.onclick = ajouterTask;

var tasks;
if (JSON.parse(localStorage.getItem("userTasks")) != null) {
  tasks = JSON.parse(localStorage.getItem("userTasks"));
} else {
  tasks = [];
}

window.onload = ajouterTable;

function ajouterTask() {
  ajouterInput = document.getElementById("ajouterInput");
  if (ajouterInput.value === "") {
    setError(ajouterInput, "Enter Task at first");
    return false;
  }
  tasks.push(ajouterInput.value);
  ajouterInput.value = "";

  addToLocalStorage(tasks);
  ajouterTable();
}

function ajouterTable() {
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    tbody.innerHTML += `<tr>
        <td>${tasks[i]}</td>
        <td><button type='button' class='btn btn-danger' onclick='update(${i})'>update</button></td>
        <td><button type='button' class='btn btn-danger' onclick='Delete(${i})'>delete</button></td>
        </tr>`;
  }
  document.getElementById("taskCounter").innerHTML = tasks.length;
}

function Delete(i) {
  tasks.splice(i, 1);

  addToLocalStorage(tasks);
  ajouterTable();
}

function update(i) {
  // div .ajouter
  document.querySelector(".ajouter").style.display = "none";
  // div .update
  document.querySelector(".update").style.display = "block";

  // append the value
  document.getElementById("updateInput").value = tasks[i];

  document.querySelector("#updateBtn").onclick = function () {
    let task = document.getElementById("updateInput").value;
    tasks.splice(i, 1, task);

    addToLocalStorage(task);
    ajouterTable();

    document.querySelector(".ajouter").style.display = "block";
    document.querySelector(".update").style.display = "none";
  };
}

function addToLocalStorage() {
  if (tasks.length < 1) {
    localStorage.removeItem("userTasks");
  } else {
    localStorage.setItem("userTasks", JSON.stringify(tasks));
  }
}

function setError(element, message) {
  element.style.border = "1px solid red";
  element.placeholder = message;
  element.focus();
}
