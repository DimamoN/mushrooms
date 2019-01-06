
let intro, home, forest, city,

    info,

    btnStart, btnHomeToForest, btnHomeToCity,
    btnForestToHome, btnCityToHome, btnSleep,
    btnPickMushrooms, btnSellMushrooms;

$(document).ready(function () {

    // divs //
    intro = $("#intro")[0];
    home = $("#home")[0];
    forest = $("#forest")[0];
    city = $("#city")[0];

    // text //
    info = $("#info")[0];

    // buttons //
    btnStart = $("#start")[0];
    btnHomeToForest = $("#home-to-forest")[0];
    btnHomeToCity = $("#home-to-city")[0];
    btnForestToHome = $("#forest-to-home")[0];
    btnCityToHome = $("#city-to-home")[0];

    btnSleep = $("#sleep")[0];
    btnPickMushrooms = $("#pick-mushrooms")[0];
    btnSellMushrooms = $("#sell-mushrooms")[0];

    btnStart.onclick = () => startGame();
    btnHomeToCity.onclick = () => game.goHomeToCity();
    btnHomeToForest.onclick = () => game.goHomeToForest();
    btnForestToHome.onclick = () => game.goForestToHome();
    btnCityToHome.onclick = () => game.goCityToHome();
    btnSleep.onclick = () => game.sleep();
    btnPickMushrooms.onclick = () => game.pickMushrooms();
    btnSellMushrooms.onclick = () => game.sellMushrooms();
});

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
        ui.renderStats();
    },

    pickMushrooms : function () {
        stats.updMushrooms();
        ui.renderStats();
    },

    sellMushrooms : function () {
        stats.sellMushrooms();
        ui.renderStats();
    },

    goHomeToCity : function () {
        ui.show(city);
        ui.hide(home);
        stats.setPlace(game.CITY_TEXT);
        ui.renderStats();
    },
    
    goHomeToForest : function () {
        ui.show(forest);
        ui.hide(home);
        stats.setPlace(game.FOREST_TEXT);
        ui.renderStats();
    },
    
    goForestToHome : function () {
        ui.show(home);
        ui.hide(forest);
        stats.setPlace(game.HOME_TEXT);
        ui.renderStats();
    },
    
    goCityToHome : function ( ) {
        ui.show(home);
        ui.hide(city);
        stats.setPlace(game.HOME_TEXT);
        ui.renderStats();
    }
};

const stats = {

    day : 1,
    mushrooms : 0,
    money : 0,
    energy : 100,
    place : "",

    updMushrooms: function () {
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

const ui = {
    
    show : function (div) {
        div.style.setProperty("visibility", "visible");
        div.style.setProperty("display", "block");
    },
    
    hide : function (div) {
        div.style.setProperty("visibility", "hidden");
        div.style.setProperty("display", "none");
    },

    renderStats : function() {
        info.innerHTML = stats.place + "<br>" +
        "day : " + stats.day + "<br>" +
        "mushrooms : " + stats.mushrooms + "<br>" +
        "money : " + stats.money + "<br>" +
        "energy : " + stats.energy;
}

};

function startGame() {
    ui.show(home);
    stats.setPlace(game.HOME_TEXT);
    ui.renderStats();
    ui.hide(btnStart);
}