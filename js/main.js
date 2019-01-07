$(document).ready(function () {

    $("#start").on("click", () => game.startGame());
    $("#home-to-city").on("click", () => game.goHomeToCity());
    $("#home-to-forest").on("click", () => game.goHomeToForest());
    $("#forest-to-home").on("click", () => game.goForestToHome());
    $("#city-to-home").on("click", () => game.goCityToHome());
    $("#sleep").on("click", () => game.sleep());
    $("#pick-mushrooms").on("click", () => game.pickMushrooms());
    $("#sell-mushrooms").on("click", () => game.sellMushrooms());
    $("#ntf-ok").on("click", () => ui.closeNotification());
    $("#eat-mushrooms").on("click", () => stats.eatMushrooms());

    $("#info").html(game.TEXT.INTRO);
});

const game = {
    TEXT: {
        INTRO: `Hello, you are just an old mushroomer. Your wife died in the last year.
            You have no kids. You are too old for job.
            <br>The only thing, that gives you a sense to live is you favorite mushrooms.
            So, why not to pick mushrooms now?`,
        AT_HOME: "You are at home",
        AT_CITY: "You are in the city",
        AT_FOREST: "You are in the forest",
        NO_MUSHROOMS: "You have no mushrooms to sell",
        NO_ENERGY_PICK_MUSHROOMS: "You are very tired to pick mushrooms",
        NO_ENERGY_TRAVEL: "You traveled tired. Your health has suffered",
        YOU_DIED: "You died! Money collected: ",
        YOU_SICK: "You get sick",
        YOU_GETTING_BAD: "You are getting very bad",
    },

    startGame: function () {
        $("#intro").hide();
        $("#home").show();
        $("#info-panel").show();
        stats.setPlace(game.TEXT.AT_HOME);
        ui.UpdateStats();
    },

    gameOver: function () {
        ui.showNotification(game.TEXT.YOU_DIED + stats.money);
        window.setTimeout(() => {
            window.location.reload()
        }, 5000);
    },

    // actions //
    sleep: function () {
        stats.refreshEnergy();
        stats.updDay();
        ui.UpdateStats();
    },

    pickMushrooms: function () {
        if (stats.hasEnergy()) {
            stats.updMushrooms();
            stats.minusEnergy();
        } else {
            ui.showNotification(game.TEXT.NO_ENERGY_PICK_MUSHROOMS);
        }
        ui.UpdateStats();
    },

    sellMushrooms: function () {
        if (stats.mushrooms === 0) {
            ui.showNotification(game.TEXT.NO_MUSHROOMS);
            return;
        }
        stats.sellMushrooms();
        ui.UpdateStats();
    },

    // travel //
    travel: function (fromDir, toDir, toText) {
        if (!stats.hasEnergy()) {
            ui.showNotification(game.TEXT.NO_ENERGY_TRAVEL);
            stats.minusHealth();
            if (stats.health <= 0) {
                this.gameOver();
            }
        } else {
            stats.minusEnergy();
        }
        $(toDir).show();
        $(fromDir).hide();
        stats.setPlace(toText);
        ui.UpdateStats();
    },

    goHomeToCity: () => {
        game.travel($("#home"), $("#city"), game.TEXT.AT_CITY)
    },
    goHomeToForest: () => {
        game.travel($("#home"), $("#forest"), game.TEXT.AT_FOREST)
    },
    goForestToHome: () => {
        game.travel($("#forest"), $("#home"), game.TEXT.AT_HOME)
    },
    goCityToHome: () => {
        game.travel($("#city"), $("#home"), game.TEXT.AT_HOME)
    },
};

const stats = {
    day: 1,
    health: 10,
    place: "",
    mushrooms: 0,
    money: 0,
    energy: {
        maxValueBasic: 10,
        maxValue: 10,
        value: 10,

        setValue: (value) => {
            stats.energy.value = value;
        },

        update: () => {
            stats.energy.value = stats.energy.maxValueBasic;
        },

        minus: () => {
            stats.energy.value--;
        }
    },

    updMushrooms: () => {
        let pickSuccess = () => Math.floor(Math.random() * 2);
        if (pickSuccess()) {
            stats.mushrooms++;
            $("#eat-mushrooms").attr("disabled", false)
        }
    },
    hasEnergy: () => stats.energy.value > 0,

    minusEnergy: function () {
        stats.energy.minus();
    },

    refreshEnergy: function () {
        stats.energy.update();
    },

    minusHealth: function () {
        stats.health--;
    },

    sellMushrooms: function () {
        stats.money += stats.mushrooms;
        stats.mushrooms = 0;
        $("#eat-mushrooms").attr("disabled", true);
    },

    eatMushrooms: () => {
        if (stats.mushrooms && stats.health && stats.energy.value) {
            stats.minusHealth();
            stats.energy.minus();
            stats.mushrooms--;
        } else if (!stats.mushrooms) {
            $("#eat-mushrooms").attr("disabled", true);
        } else {
            stats.mushrooms--;
            stats.energy.value += Math.floor(Math.random() * 2);
        }
        ui.UpdateStats();
    },

    setPlace: (place) => {
        stats.place = place;
    },

    updDay: function () {
        stats.day++;

        switch (stats.day) {
            case 4: {
                ui.showNotification("Today you have a good mood. Your energy is increased");
                stats.energy.maxValue = 15;
                stats.energy.setValue(15);
                ui.UpdateStats();
            }
                break;
            //case 6 : ui.showNotification("It is rainy today, that's mean that tomorrow will be a lot of mushrooms"); break;
            case 10: {
                ui.showNotification("You have heavy headache today. Your energy is reduced");
                stats.energy.maxValue = 5;
                stats.energy.setValue(5);
                ui.UpdateStats();
            }
                break;
            case 40: {
                ui.showNotification(game.TEXT.YOU_SICK);
            }
                break;
            case 45: {
                ui.showNotification(game.TEXT.YOU_GETTING_BAD);
            }
                break;
            case 50: {
                game.gameOver();
            }
                break;
        }
    },
};

const ui = {
    UpdateStats: function () {
        $("#info-panel")
            .html(`${stats.place} <span> | </span> day : <b>${stats.day}</b>
            <span id="scores"> mushrooms: ${stats.mushrooms}
            money: ${stats.money}
            health: ${stats.health}
            energy : ${stats.energy.value}</span>`);
    },
    show: (div) => $(div).attr("display", "block"),
    hide: (div) => $(div).attr("display", "none"),
    closeNotification: () => $("#notification").hide(),
    showNotification: (text) => {
        $("#notification").show() && $("#ntf-text").html(text)
    }
};