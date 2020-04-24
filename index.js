'use strict';

const URL = "http://www.john-pham.com/audreybergensten/feature/";
let picturesArray = [
            "feature_back_of_head.jpg",
            "feature_blastula.jpg",
            "feature_blue_figure.jpg",
            "feature_cosmic_waves.jpg",
            "feature_crossed_figures.jpg",
            "feature_dream.jpg",
            "feature_eye_beam.jpg",
            "feature_eyesmouths.jpg",
            "feature_flyer.jpg",
            "feature_head_on_hill.jpg",
            "feature_heads_gears.jpg",
            "feature_klees_trees.jpg",
            "feature_nudie.jpg",
            "feature_pink_cheeks.jpg",
            "feature_pink_snowman.jpg",
            "feature_red_box.jpg",
            "feature_silver-gold.jpg",
            "feature_wavy_hair.jpg",
            "feature_wrapped_figures.jpg"
        ];

let count = 0;
const MAXSLIDES = picturesArray.length;
const MAXIMAGEWIDTH = 550;
const MAXIMAGEHEIGHT = 409;

/*** Pre-fetch images */
function preloader() {
    for (let i = 0; i < MAXSLIDES; i++) {
        new Image().src = URL + picturesArray[i];
    }
}

function addLoadEvent(func) {
    var oldOnload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    }
    else {
        window.onload = function() {
            if (oldOnload) {
                oldOnload();
            }
            func();
        }
    }
}

addLoadEvent(preloader);

/*** Function to fade in */
const setFadeIn = () => {
    let slide = document.querySelector("#app");
    slide.classList.add("fadeIn");
}

const setFadeOut = () => {
    let slide = document.querySelector("#app");
    slide.classList.remove("fadeIn");
}

const calculateAspectRatioFit = (sourceWidth, sourceHeight) => {
    let ratio = Math.min(MAXIMAGEWIDTH / sourceWidth, MAXIMAGEHEIGHT / sourceHeight); //find the lower of the width or height aspect ratios
    return {
        width: sourceWidth * ratio,
        height: sourceHeight * ratio
    }
}

/*** Function to display next slide */
const display = () => {
    let slideshow = document.getElementById("app");

    if (count === MAXSLIDES) {
        count = 0
    } 
  
    let outputLink = URL + picturesArray[count++];
    slideshow.innerHTML = `<img src=${outputLink} alt="slideshow" class="slideshowImage">`;
  
    let currentImage = document.querySelector(".slideshowImage");
    document.getElementById("debug").innerHTML = currentImage.height;

    let imageResize = calculateAspectRatioFit(currentImage.width, currentImage.height);
    currentImage.style.width = imageResize.width + "px";
    currentImage.style.height = imageResize.height + "px";

    setTimeout(setFadeIn, 3000);    //fade to white after 2.1 seconds
    setTimeout(setFadeOut, 4000);   //reset to full opacity after 4 seconds
}

/*** Advance to the next slide every two seconds */
let interval = 4000; //slideshow transitions every 4 seconds
let slideShowTimer = setInterval(display, interval);


/*** To-do */
// [ ] Aspect ratio fails after one loop through the array
// [ ] Need to use responsive design
// [ ] Implement viewport break points for header h1: it shouldn't be displaying 100%