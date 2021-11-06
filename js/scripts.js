(function staticStars() {

    var rand, stars = [];
    var intViewportWidth = window.innerWidth;
    var intViewportHeight = window.innerHeight - 460;

    clearHtml(intViewportWidth);
    
    console.log(document.getElementsByClassName("stars")[0].children.length);
    console.log("Size")
    console.log(intViewportWidth*2);
    
    window.addEventListener('resize', staticStars);

    for (let i = 0; i < intViewportWidth / 3; i++) {
        rand = Math.random() * 5;
        stars[i] = document.createElement("div");
        stars[i].id = "star-id-" + i;

        stars[i].style.width = rand + "px";
        stars[i].style.height = rand + "px";
        stars[i].style.top = Math.random() * intViewportHeight * 1.7 + "px";
        stars[i].style.left = Math.random() * intViewportWidth + "px";

        stars[i].style.marginTop= "0";
        stars[i].style.borderRadius = "60%";
        stars[i].style.position = "absolute";

        if (rand < 2) stars[i].style.backgroundColor = "yellow";
        else stars[i].style.backgroundColor = "white";
        stars[i].style.boxShadow = "0 0 10px 0.2px";

        if (rand < 1) rand = Math.random() * (1 - 0.5) + 0.5;;
        stars[i].style.animation = "glow " + rand + 1 + "s linear infinite alternate";

        document.getElementsByClassName("stars")[0].appendChild(stars[i]);
    }
})();

function clearHtml(intViewportWidth) {
    for (let i = 0; i < intViewportWidth * 2; i++) {
        try {
            document.getElementById("star-id-" + i).remove();
        } catch (e) {
            break;
        }
    }
}   
