
let intro, home, forest, city, notification,

    info, ntfTitle, ntfText,

    btnStart, btnHomeToForest, btnHomeToCity,
    btnForestToHome, btnCityToHome, btnSleep,
    btnPickMushrooms, btnSellMushrooms,
    btnNtfOk;

$(document).ready(function () {

    // divs //
    intro = $("#intro")[0];
    home = $("#home")[0];
    forest = $("#forest")[0];
    city = $("#city")[0];
    notification = $("#notification")[0];

    // text //
    info = $("#info")[0];
    ntfText = $("#ntf-text")[0];
    ntfTitle = $("#ntf-title")[0];

    // buttons //
    btnStart = $("#start")[0];
    btnHomeToForest = $("#home-to-forest")[0];
    btnHomeToCity = $("#home-to-city")[0];
    btnForestToHome = $("#forest-to-home")[0];
    btnCityToHome = $("#city-to-home")[0];

    btnSleep = $("#sleep")[0];
    btnPickMushrooms = $("#pick-mushrooms")[0];
    btnSellMushrooms = $("#sell-mushrooms")[0];
    btnNtfOk = $("#ntf-ok")[0];

    btnStart.onclick = () => game.startGame();
    btnHomeToCity.onclick = () => game.goHomeToCity();
    btnHomeToForest.onclick = () => game.goHomeToForest();
    btnForestToHome.onclick = () => game.goForestToHome();
    btnCityToHome.onclick = () => game.goCityToHome();
    btnSleep.onclick = () => game.sleep();
    btnPickMushrooms.onclick = () => game.pickMushrooms();
    btnSellMushrooms.onclick = () => game.sellMushrooms();
    btnNtfOk.onclick = () => ui.closeNotification();
});

const game = {
    INTRO_TEXT : "Hello, you are just an old mushroomer. Your wife died in the last year. " +
        "You have no kids. You are too old for job. " +
        "The only thing, that gives you a sense to live is you favorite mushrooms." +
        "So, why not to pick mushrooms now?",
    HOME_TEXT : "You are home",
    CITY_TEXT : "You are in the city",
    FOREST_TEXT : "You are in the forest",

    NO_MUSHROOMS : "You have no mushrooms to sell",
    NO_ENERGY_PICK_MUSHROOMS_TEXT : "You are very tired to pick mushrooms",

    NO_ENERGY_TRAVEL_TEXT : "You traveled tired. Your health has suffered",

    startGame : function () {
        ui.show(home);
        stats.setPlace(game.HOME_TEXT);
        ui.renderStats();
        ui.hide(btnStart);
    },

    gameOver : function() {
        ui.showNotification("You died! Money collected: " + stats.money);
        window.setTimeout(function () {
            window.location.reload();
        },5000);
    },

    // actions //

    sleep : function () {
        stats.refreshEnergy();
        stats.updDay();
        ui.renderStats();
    },

    pickMushrooms : function () {
        if (stats.hasEnergy()) {
            stats.updMushrooms();
            stats.minusEnergy();
        } else {
            ui.showNotification(game.NO_ENERGY_PICK_MUSHROOMS_TEXT);
        }
        ui.renderStats();
    },

    sellMushrooms : function () {
        if (stats.mushrooms === 0) {
            ui.showNotification(game.NO_MUSHROOMS);
            return;
        }
        stats.sellMushrooms();
        ui.renderStats();
    },

    // travel //

    travel : function (from, to, toText) {
        if (!stats.hasEnergy()) {
            ui.showNotification(game.NO_ENERGY_TRAVEL_TEXT);
            stats.minusHealth();
            if (stats.health <= 0) {
                this.gameOver();
            }
        } else {
            stats.minusEnergy();
        }
        ui.show(to);
        ui.hide(from);
        stats.setPlace(toText);
        ui.renderStats();
    },

    goHomeToCity : function () {
        this.travel(home, city, game.CITY_TEXT);
    },
    
    goHomeToForest : function () {
        this.travel(home, forest, game.FOREST_TEXT);
    },
    
    goForestToHome : function () {
        this.travel(forest, home, game.HOME_TEXT);
    },
    
    goCityToHome : function ( ) {
        this.travel(city, home, game.HOME_TEXT);
    },
};

const stats = {

    day : 1,
    mushrooms : 0,
    money : 0,

    energy : {

        maxValueBasic : 10,
        maxValue : 10,
        value : 10,

        setValue : function (value) {
            this.value = value;
        },

        update : function () {
            this.value = this.maxValueBasic;
        },

        minus : function () {
            this.value--;
        }
    },

    health : 10,
    place : "",

    updMushrooms: function () {
        return this.mushrooms++;
    },

    hasEnergy: function () {
        return this.energy.value > 0;
    },

    minusEnergy: function () {
        this.energy.minus();
    },

    refreshEnergy: function () {
        this.energy.update();
    },

    minusHealth: function () {
        this.health--;
    },

    sellMushrooms: function () {
        this.money += this.mushrooms;
        this.mushrooms = 0;
    },

    updDay: function () {
        this.day++;
        
        switch (this.day) {
            case 4 : {
                ui.showNotification("Today you have a good mood. Your energy is increased");
                stats.energy.maxValue = 15;
                stats.energy.setValue(15);
                ui.renderStats();
            } break;
            //case 6 : ui.showNotification("It is rainy today, that's mean that tomorrow will be a lot of mushrooms"); break;
            case 10 : {
                ui.showNotification("You have heavy headache today. Your energy is reduced");
                stats.energy.maxValue = 5;
                stats.energy.setValue(5);
                ui.renderStats();
            } break;
            case 40 : {
                ui.showNotification("You get sick");
            } break;
            case 45 : {
                ui.showNotification("You are getting very bad");
            } break;
            case 50 : {
                game.gameOver();
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
        "day : " + stats.day + "<br><br>" +
        "mushrooms : " + stats.mushrooms + "<br>" +
        "money : " + stats.money + "<br>" +
        "health: " + stats.health + "<br>" +
        "energy : " + stats.energy.value;
    },

    closeNotification : function () {
        this.hide(notification);
    },

    showNotification : function (text) {
        ntfText.innerHTML = text;
        this.show(notification);
    }
};