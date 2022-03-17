function startTimer() {
    
    var timeValue = document.querySelector("#time-counter").textContent.split(":")
    
    var duration = parseInt(timeValue[0])*60 + parseInt(timeValue[1])
    
    var timer = duration, minutes, seconds;
    
    var display = document.querySelector("#time-counter");
    
    var stop = setInterval(()=>{
        
        minutes = parseInt(timer/60, 10);
        seconds = parseInt(timer%60, 10);
        
        minutes = minutes < 10 ? "0"+ minutes : minutes;
        seconds = seconds < 10 ? "0"+ seconds : seconds;
        
        display.textContent = minutes + ":" + seconds;
        
        if(--timer < 0) {
            timer = duration
        }

        if (minutes == 0 && seconds == 0) {
            changeClass("short");
            clearInterval(stop);
        }
        
    }, 1000)
    
    document.getElementById("pomodoro").addEventListener("click", ()=>{ clearInterval(stop)})
    
    document.getElementById("short").addEventListener("click", ()=>{ clearInterval(stop)})
    
    document.getElementById("long").addEventListener("click", ()=>{ clearInterval(stop)})
    
    document.getElementById("start-pause").addEventListener("click", ()=>{ clearInterval(stop)})
    
    document.getElementById("restart").addEventListener("click", ()=>{ clearInterval(stop)})

}

function changeTime(choice) {

    const preferences = window.localStorage.getItem("preferences");

    const timePreferences = JSON.parse(preferences);

    const { pomodoro, short, long } = timePreferences;

    var display = document.querySelector("#time-counter");

    if (choice == "pomodoro") {

        if (parseInt(pomodoro) < 10) {
            display.textContent = "0" + parseInt(pomodoro) + ":" + 0 + "0";
        } else {
            display.textContent = parseInt(pomodoro) + ":" + 0 + "0";
        }

    } else if (choice == "short") {

        if (short < 10) {
            display.textContent = "0" + short + ":" + 0 + "0";
        } else {
            display.textContent = short + ":" + 0 + "0";
        }

    } else if (choice == "long") {

        if (long < 10) {
            display.textContent = "0" + long + ":" + 0 + "0";
        } else {
            display.textContent = long + ":" + 0 + "0";
        }

    }

    document.getElementById("start-pause").textContent = "START TIMER";

    document.querySelector("#pomodoro-changer").value = parseInt(pomodoro);
    document.querySelector("#short-changer").value = parseInt(short);
    document.querySelector("#long-changer").value = parseInt(long);

}

function changeClass(parametro) {

    var elementWithClass = document.getElementsByClassName("active")
    var elementId = (elementWithClass[0]).id;

    document.getElementById(elementId).className = "break";

    document.getElementById(parametro).className = "active";

    changeTime(parametro);
}

function pauseTimer(parametro) {
    
    var buttonStage = document.getElementById("start-pause").textContent

    if(buttonStage == "START TIMER" && parametro == 'start') {

        document.getElementById("start-pause").textContent = "PAUSE TIMER";
        startTimer();

    } else if (parametro == "reset") {
        
        var elementWithClass = document.getElementsByClassName("active")
        var elementId = (elementWithClass[0]).id;
        
        changeTime(elementId);

    } else {

        document.getElementById("start-pause").textContent = "START TIMER";
        
    }
}

function userSettings(parametro) {

    if (document.getElementById("settings-container").className == "show") {

        document.getElementById("settings-container").className = "";

    } else {

        (document.getElementById("settings-container").className = "show");
        
    }

    if (parametro == "save") {
        const elementWithClass = document.getElementsByClassName("active");
        const elementId = (elementWithClass[0]).id;
        
        const inputs = {
            "pomodoro": parseInt(document.querySelector("#pomodoro-changer").value),
            "short": parseInt(document.querySelector("#short-changer").value),
            "long": parseInt(document.querySelector("#long-changer").value)
        };
        
        saveOnStorage(inputs)
        changeTime(elementId);
    }
}

function saveOnStorage(data) {
    window.localStorage.setItem("preferences", JSON.stringify(data));
}

function defaultSettings() {

    const inputs = {
        "pomodoro": 25,
        "short": 5,
        "long": 15
    };

    window.localStorage.setItem("preferences", JSON.stringify(inputs));
    changeTime(window.localStorage.getItem("preferences"))
}

if (window.onload = window.localStorage.getItem("preferences") == null) {

    defaultSettings();

} else {
    
    window.onload = changeTime(window.localStorage.getItem("preferences"))
    window.onload = changeTime("pomodoro");

}