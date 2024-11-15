var intasks = document.getElementById("intasks");
var listitem = document.querySelector(".lists");

window.onload = function() {
    loadTasks();
};

function con() {
    if (intasks.value.trim() == '') {
        intasks.classList.add("error");
    } else {
        intasks.classList.remove("error");
        var newtask = document.createElement('li');
        newtask.innerHTML = intasks.value;
        newtask.classList.remove("check"); // Make sure it's not checked by default
        newtask.addEventListener("click", function() {
            newtask.classList.toggle("check");
            saveTasks();
        });
        newtask.addEventListener("dblclick", function() {
            newtask.remove();
            saveTasks();
        });
        listitem.appendChild(newtask);
        saveTasks();
        intasks.value = "";
    }
}

intasks.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        con();
    }
});

function saveTasks() {
    var tasks = [];
    var allTasks = listitem.querySelectorAll("li");
    allTasks.forEach(function(task) {
        tasks.push({
            content: task.innerHTML,
            checked: task.classList.contains("check")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks && tasks.length > 0) {
        tasks.forEach(function(taskData) {
            var newtask = document.createElement('li');
            newtask.innerHTML = taskData.content;
            if (taskData.checked) {
                newtask.classList.add("check");
            }
            newtask.addEventListener("click", function() {
                newtask.classList.toggle("check");
                saveTasks();
            });
            newtask.addEventListener("dblclick", function() {
                newtask.remove();
                saveTasks();
            });
            listitem.appendChild(newtask);
        });
    }
}
