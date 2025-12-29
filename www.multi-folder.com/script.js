 document.addEventListener("DOMContentLoaded",()=>{
            window.addEventListener("scroll",()=>{
                if (window.scrollY >= 30) {
                    document.querySelector(".navbar").classList.add("scrolled");
            }
            else {
                   document.querySelector(".navbar").classList.remove("scrolled");
            }
            })

            const burgerMenu = document.getElementById("burgerMenu");
            const nav = document.querySelector(".navigationMenu");
            burgerMenu.addEventListener("click", function (t) {
            if (window.innerWidth<="1024") {
                        burgerMenu.classList.toggle("active"),
                        nav.style.transform = nav.style.transform === "translateX(0%)" ? "translateX(-100%)" : "translateX(0%)";
            }
                    });
            document.querySelectorAll(".navLink").forEach(element=>{
                element.addEventListener("click",(e)=>{
                    e.preventDefault();
                    if (window.innerWidth<=1024) {
                    nav.style.transform = nav.style.transform === "translateX(0%)" ? "translateX(-100%)" : "translateX(0%)";
                    burgerMenu.classList.toggle("active");
                    //more functions to come

                    }
                });
            })

            window.addEventListener("resize",()=>{
                if (window.innerWidth>"1024") {
                    nav.style.transform = "translateX(0%)";
                }
                else {
                    nav.style.transform = "translateX(-100%)";
                }
            });

            let bannerSlideCount = document.querySelectorAll(".bannerImageSlide").length;
            let bannerCaouselContainer = document.querySelector(".bannerImageCarouselContainer");
            let bannerPrev = document.querySelector(".bannerPrev");
            let bannerNext = document.querySelector(".bannerNext");
            let bannerSlide = 0;

            if (bannerSlideCount == 1) {
                bannerNext.style.display = "none";
                bannerPrev.style.display = "none";
            }

            bannerNext.addEventListener("click",(e)=>{
                e.preventDefault();
                bannerSlide = (bannerSlide  + 1) % bannerSlideCount;
                bannerCaouselContainer.style.transform =  `translateX(-${bannerSlide * 100}%)`;
            });

            bannerPrev.addEventListener("click",(e)=>{
                e.preventDefault();
                bannerSlide = (bannerSlide + bannerSlideCount - 1) % bannerSlideCount;
                bannerCaouselContainer.style.transform =  `translateX(-${bannerSlide * 100}%)`;
            });
        })




        document.addEventListener('DOMContentLoaded', () => {
        const offerTrack = document.querySelector('.offerTrack');
const offerSlides = document.querySelectorAll('.offerSlide');
const offerPrev = document.querySelector('.offerPrev');
const offerNext = document.querySelector('.offerNext');

let currentIndex = 0;
const totalSlides = offerSlides.length;
let isAnimating = false;

// Clone first and last slides for infinite effect
const firstClone = offerSlides[0].cloneNode(true);
const lastClone = offerSlides[totalSlides - 1].cloneNode(true);

offerTrack.appendChild(firstClone);
offerTrack.insertBefore(lastClone, offerSlides[0]);

// Update position without animation
function updatePositionInstant(index) {
    offerTrack.style.transition = 'none';
    offerTrack.style.transform = `translateX(-${index * 100}%)`;
}

// Update position with animation
function updatePosition(index) {
    offerTrack.style.transition = 'transform 0.5s ease-in-out';
    offerTrack.style.transform = `translateX(-${index * 100}%)`;
}

// Initialize position (account for prepended clone)
currentIndex = 1;
updatePositionInstant(currentIndex);

// Next slide
function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;
    
    currentIndex++;
    updatePosition(currentIndex);
    
    setTimeout(() => {
        if (currentIndex === totalSlides + 1) {
            currentIndex = 1;
            updatePositionInstant(currentIndex);
        }
        isAnimating = false;
    }, 500);
}

// Previous slide
function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;
    
    currentIndex--;
    updatePosition(currentIndex);
    
    setTimeout(() => {
        if (currentIndex === 0) {
            currentIndex = totalSlides;
            updatePositionInstant(currentIndex);
        }
        isAnimating = false;
    }, 500);
}

// Event listeners
offerNext.addEventListener('click', nextSlide);
offerPrev.addEventListener('click', prevSlide);

// Auto-play (optional)
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pause auto-play on hover
const offerContainer = document.querySelector('.offerContainer');
offerContainer.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

offerContainer.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(nextSlide, 5000);
});

        });












        document.addEventListener('DOMContentLoaded', () => {
                let viewMoreButton = document.querySelector('.viewMoreButton');
                let propertyCardsContainer = document.querySelector('.property-cards-container');
                viewMoreButton.addEventListener('click', () => {
                    propertyCardsContainer.classList.toggle('hideContainer');
                    viewMoreButton.querySelector('span').innerHTML = propertyCardsContainer.classList.contains('hideContainer') ? 'View More Properties' : 'View Less Properties';
                });
            });












            let readMoreLink = document.querySelector(".readMoreLink");
    readMoreLink.addEventListener("click",(e,i)=>{
        e.preventDefault();
        document.querySelector(".clampText").classList.toggle("active");
        readMoreLink.querySelector("span").innerHTML = (readMoreLink.querySelector("span").innerHTML === "Show More") ? "Show Less" : "Show More"; 
    })