(function staticStars() {
    var rand, stars = [];

    for (let i = 0; i < 300; i++) {
        rand = Math.random() * 5;
        stars[i] = document.createElement("div");
        stars[i].id = "star-id-" + i;

        stars[i].style.width = rand + "px";
        stars[i].style.height = rand + "px";
        stars[i].style.top = Math.random() * 95 + "%";
        stars[i].style.left = Math.random() * 100 + "%";

        stars[i].style.marginTop= "0";
        stars[i].style.borderRadius = "60%";
        stars[i].style.position = "absolute";

        if (rand < 2) stars[i].style.backgroundColor = "yellow";
        else if (rand < 3) stars[i].style.backgroundColor = "#f8f8ba";
        else stars[i].style.backgroundColor = "white";

        if (rand < 2) stars[i].style.boxShadow = "0 0 3px 0.2px";
        else if (rand < 3) stars[i].style.boxShadow = "0 0 5px 0.2px";
        else stars[i].style.boxShadow = "0 0 10px 0.2px";

        if (rand < 1) rand = Math.random() * (1 - 0.5) + 0.5;;
        stars[i].style.animation = "glow " + rand + 1 + "s linear infinite alternate";

        document.getElementsByClassName("stars")[0].appendChild(stars[i]);
    }
})();

var currentCard = 1;

$("#prev").on("click", function () {
    if ($(window).width() > 1000) {
        var width = document.getElementById('card-1').offsetWidth;
        $("#menu ul").animate(
            {
                scrollLeft: `-=${width + 12}`,
            },
            300,
            "swing"
        );
    } else {
        if (currentCard !== 1) currentCard--;;
        
        var element = document.getElementById("card-" + currentCard);
        element.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    }
});

$("#next").on("click", function () {
    if ($(window).width() > 1000) {
        var width = document.getElementById('card-1').offsetWidth;
    $("#menu ul").animate(
        {
            scrollLeft: `+=${width + 12}`,
        },
        300,
        "swing"
    );
    } else {
        if (currentCard !== 6) currentCard++;;

        var element = document.getElementById("card-" + currentCard);
        element.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    }
});
