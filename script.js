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

    const elementWithClass = document.getElementsByClassName("active")
    const elementId = (elementWithClass[0]).id;

    document.getElementById(elementId).className = "break";

    document.getElementById(parametro).className = "active";

    changeTime(parametro);
}

function pauseTimer(parametro) {
    
    const buttonStage = document.getElementById("start-pause").textContent

    if(buttonStage == "START TIMER" && parametro == 'start') {

        document.getElementById("start-pause").textContent = "PAUSE TIMER";
        startTimer();

    } else if (parametro == "reset") {
        
        const elementWithClass = document.getElementsByClassName("active")
        const elementId = (elementWithClass[0]).id;
        
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

const html = document.querySelector("html");
const checkBox = document.querySelector("input[name=dark-mode]")

const getStyle = (element, style) =>
    window.getComputedStyle(element).getPropertyValue(style )

const initialColors  = {
    bodyColor: getStyle(html, "--body-color"),
    containerColor: getStyle(html, "--container-color"),
    primaryColor: getStyle(html, "--primary-color"),
    primaryHoverColor: getStyle(html, "--primary-hover-color"),
    divColor: getStyle(html, "--div-color"),
    textColor: getStyle(html, "--text-color"),
    textHoverColor: getStyle(html, "--text-hover-color"),
    textBackgroundColor: getStyle(html, "--text-background-color"),
    textHoverBackgroundColor: getStyle(html, "--text-hover-background-color")
}

const whiteMode = {
    bodyColor: "white",
    containerColor: "hsl(0, 0%, 90%)",
    primaryColor: "hsl(0, 100%, 60%)",
    primaryHoverColor: "hsla(0, 100%, 60%, 80%)",
    divColor: "hsl(0, 0%, 70%)",
    textColor: "black",
    textHoverColor: "hsla(0, 0%, 0%, 80%)",
    textBackgroundColor: "hsl(0, 0%, 80%)",
    textHoverBackgroundColor: "hsla(0, 0%, 80%, 80%)",
    settingsBackgroundColor: "hsla(0, 0%, 100%, 50%)",
    settingsLabelColor: "hsl(0, 0%, 20%)",
    settingsShadowColor: "black",
}

const darkMode = {
    bodyColor: "hsl(0, 0%, 10%)",
    containerColor: "hsl(0, 0%, 15%)",
    primaryColor: "hsl(116, 79%, 30%)",
    primaryHoverColor: "hsla(116, 79%, 30%, 0.8)",
    divColor: "hsl(0, 0%, 30%)",
    textColor: "white",
    textHoverColor: "hsla(0, 0%, 100%, 0.8)",
    textBackgroundColor: "hsl(0, 0%, 20%)",
    textHoverBackgroundColor: "hsla(0, 0%, 20%, 0.8)",
    settingsBackgroundColor: "hsla(0, 0%, 0%, 50%)",
    settingsLabelColor: "hsl(0, 0%, 80%)",
    settingsShadowColor: "black",
}

const transformKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => {
    Object.keys(colors).map(key =>
        html.style.setProperty(transformKey(key), colors[key])
        )
}

checkBox.addEventListener("change", ({target}) => {     
    target.checked ? changeColors(darkMode) : changeColors(whiteMode)
})