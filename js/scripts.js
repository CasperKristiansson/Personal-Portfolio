(function staticStars() {
    window.addEventListener('resize', clearHtml);
    window.addEventListener('resize', staticStars);

    var rand, stars = [];
    var intViewportWidth = window.innerWidth;
    var intViewportHeight = window.innerHeight -435;

    for (let i = 0; i <= 300; i++) {
        rand = Math.random() * 5;
        stars[i] = document.createElement("div");
        stars[i].id = "star-id-" + i;
        stars[i].style.width = rand + "px";
        stars[i].style.height = rand + "px";
        stars[i].style.marginTop= "0";
        stars[i].style.borderRadius = "60%";
        stars[i].style.backgroundColor = "white";
        stars[i].style.position = "relative";
        stars[i].style.top = Math.random() * intViewportHeight + "px";
        stars[i].style.left = Math.random() * intViewportWidth + "px";
        stars[i].style.animation = "glow " + rand + 1 + "s linear infinite alternate";

        document.getElementsByClassName("stars")[0].appendChild(stars[i]);
    }
})();

function clearHtml() {
    for (let i = 0; i <= 300; i++) {
        document.getElementById("star-id-" + i).remove();
    }
}
