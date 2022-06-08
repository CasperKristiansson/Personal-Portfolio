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

$("#prev").on("click", function () {
    var width = document.getElementById('card').offsetWidth;
    $("#menu ul").animate(
        {
            scrollLeft: `-=${width + 10}`,
        },
        300,
        "swing"
    );
});

$("#next").on("click", function () {
    var width = document.getElementById('card').offsetWidth;
    $("#menu ul").animate(
        {
            scrollLeft: `+=${width + 10}`,
        },
        300,
        "swing"
    );
});

// $(function() {
//     $('#timeline-component').hover(function() {
//       $('#timeline-point').attr('style', 'background-color: #0f0; box-shadow: 0 0 10px 2px #0f0;');
//     }, function() {
//       $('#timeline-point').css('background-color', ''),
//       $('#timeline-point').css('box-shadow', 'none')
//     });
// });
