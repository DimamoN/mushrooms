
// divs //
let intro = document.getElementById("intro");
let home = document.getElementById("home");
let forest = document.getElementById("forest");
let city = document.getElementById("city");

// text //
let info = document.getElementById("info");

// buttons //
let btnStart = document.getElementById("start");
let btnHomeToForest = document.getElementById("home-to-forest");
let btnHomeToCity = document.getElementById("home-to-city");
let btnForestToHome = document.getElementById("forest-to-home");
let btnCityToHome = document.getElementById("city-to-home");

let btnSleep = document.getElementById("sleep");
let btnPickMushrooms = document.getElementById("pick-mushrooms");
let btnSellMushrooms = document.getElementById("sell-mushrooms");

// $("#start").on("click", startGame);

btnStart.onclick = () => startGame();
btnHomeToCity.onclick = () => game.goHomeToCity();
btnHomeToForest.onclick = () => game.goHomeToForest();
btnForestToHome.onclick = () => game.goForestToHome();
btnCityToHome.onclick = () => game.goCityToHome();
btnSleep.onclick = () => game.sleep();
btnPickMushrooms.onclick = () => game.pickMushrooms();
btnSellMushrooms.onclick = () => game.sellMushrooms();

const game = {
    INTRO_TEXT : "Hello, you are just an old mushroomer. Your wife died in the last year. " +
        "You have no kids. You are too old for job. " +
        "The only thing, that gives you a sense to live is you favorite mushrooms." +
        "So, why not to pick mushrooms now?",
    HOME_TEXT : "You are home",
    CITY_TEXT : "You are in the city",
    FOREST_TEXT : "You are in the forest",

    sleep : function () {
        stats.updDay();
        renderStats();
    },

    pickMushrooms : function () {
        stats.updMashrooms();
        renderStats();
    },

    sellMushrooms : function () {
        stats.sellMushrooms();
        renderStats();
    },

    goHomeToCity : function () {
        show(city);
        hide(home);
        stats.setPlace(game.CITY_TEXT);
        renderStats();
    },
    
    goHomeToForest : function () {
        show(forest);
        hide(home);
        stats.setPlace(game.FOREST_TEXT);
        renderStats();
    },
    
    goForestToHome : function () {
        show(home);
        hide(forest);
        stats.setPlace(game.HOME_TEXT);
        renderStats();
    },
    
    goCityToHome : function ( ) {
        show(home);
        hide(city);
        stats.setPlace(game.HOME_TEXT);
        renderStats();
    }
};

let stats = {
    mushrooms : 0,
    day : 1,
    money : 0,
    place : "",

    updMashrooms: function () {
        return this.mushrooms++;
    },

    sellMushrooms: function () {
        this.money += this.mushrooms;
        this.mushrooms = 0;
    },

    updDay: function () {
        this.day++;
        
        switch (this.day) {
            case 4 : alert("Today you have a good mood"); break;
            case 6 : alert("It is rainy today, that's mean that tomorrow will be a lot of mushrooms"); break;
            case 10 : alert("You have heavy headache today, can't go to the forest"); break;
            case 40 : {
                alert("You get sick");
            } break;
            case 45 : {
                alert("You are getting very bad");
            } break;
            case 50 : {
                alert("You died");
                window.location.reload();
            } break;
        }
    },

    setPlace: function (place) {
        this.place = place;
    }
};

function show(div) {
    div.style.setProperty("visibility", "visible");
    div.style.setProperty("display", "block");
}

function hide(div) {
    div.style.setProperty("visibility", "hidden");
    div.style.setProperty("display", "none");
}

function renderStats() {
    info.innerHTML = stats.place + "<br>" +
        "day : " + stats.day + "<br>" +
        "mushrooms : " + stats.mushrooms + "<br>" +
        "money : " + stats.money;
}

function startGame() {
    show(home);
    stats.setPlace(game.HOME_TEXT);
    renderStats();
    hide(btnStart);
}