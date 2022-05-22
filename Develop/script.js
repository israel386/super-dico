// Initital Variables 
var todaysDate = moment().format("MMMM Do YYYY");
var currentDay = $("#currentDay");
var timeBlocks = $("#time-blocks");
var currentTime = moment().hour();
var startTime = moment().set("hour", 9).format("h A");

//Todays Date Check
console.log(todaysDate);


// Set todays date
function setCurrentDay() {
    currentDay.html(todaysDate);
};


// Call setCurrentDAy function
setCurrentDay();

// Set up classes for each time and styled with bootstrap
function setTimeBlocks() {
    for (var i = 0; i < 9; i++) {
        var setTime = moment(startTime, "h A").add(i, "h").format("h A");
        var timeBlock = $(`<div 
            class="time-block row d-flex justify-content-center">
            <div id="time${i}"class="hour col-sm-1 text-right p-2">${setTime}</div>
            <textArea id="hours${i}" class="input col-sm-8"></textArea> 
            <button id="${i}" class="saveBtn col-sm-1"><i class="fas fa-save"></i></button>
            </div>`);

        timeBlocks.append(timeBlock);
    };
};


// Styled row based on time of day
function timePriority() {
    for (var i = 0; i < 9; i++) {
        var textArea = document.getElementById("hours" + i);
        var slot = i + 9;
        if (currentTime > slot) {
            textArea.classList.add("past");
        };
        if (currentTime === slot) {
            textArea.classList.add("present");
        };
        if (currentTime < slot) {
            textArea.classList.add("future");
        };
    };
};


// intial save to local storage
timeBlocks.on("click", "button", function () {
    var inputVal = [
        { id: 0, task: document.getElementById("hours0").value },
        { id: 1, task: document.getElementById("hours1").value },
        { id: 2, task: document.getElementById("hours2").value },
        { id: 3, task: document.getElementById("hours3").value },
        { id: 4, task: document.getElementById("hours4").value },
        { id: 5, task: document.getElementById("hours5").value },
        { id: 6, task: document.getElementById("hours6").value },
        { id: 7, task: document.getElementById("hours7").value },
        { id: 8, task: document.getElementById("hours8").value }
    ];
    localStorage.setItem("tasks", JSON.stringify(inputVal));
    console.log(inputVal);
});

// render information from local storage 
function renderTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        for (var i = 0; i < tasks.length; i++) {
            var hour = document.getElementById("hours" + i);
            hour.innerHTML = tasks[i].task;
        };
    };
};

// Call setTimeBlocks function
setTimeBlocks();
// Call timePriorities function
timePriority();
// Call renderTasks function
renderTasks();