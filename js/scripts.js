(function staticStars() {

    var rand, stars = [];
    var intViewportWidth = window.innerWidth;
    var intViewportHeight = window.innerHeight;

    clearHtml();
    
    window.addEventListener('resize', staticStars);

    for (let i = 0; i < 300; i++) {
        rand = Math.random() * 5;
        stars[i] = document.createElement("div");
        stars[i].id = "star-id-" + i;

        stars[i].style.width = rand + "px";
        stars[i].style.height = rand + "px";
        stars[i].style.top = Math.random() * intViewportHeight + "px";
        stars[i].style.left = Math.random() * intViewportWidth + "px";

        stars[i].style.marginTop= "0";
        stars[i].style.borderRadius = "60%";
        stars[i].style.position = "relative";

        if (rand < 2) stars[i].style.backgroundColor = "yellow";
        else stars[i].style.backgroundColor = "white";
        stars[i].style.boxShadow = "0 0 10px 0.2px";

        if (rand < 1) rand = Math.random() * (1 - 0.5) + 0.5;;
        stars[i].style.animation = "glow " + rand + 1 + "s linear infinite alternate";

        document.getElementsByClassName("stars")[0].appendChild(stars[i]);
    }
})();

function clearHtml() {
    for (let i = 0; i < 300; i++) {
        try {
            document.getElementById("star-id-" + i).remove();
        } catch (e) {
            break;
        }
    }
}   
