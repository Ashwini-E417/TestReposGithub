let body = document.querySelector(".body");
//js of oversection
let readMore = document.querySelectorAll(".readMoreBtn");
        let clampText = document.querySelectorAll(".clampText");
        readMore.forEach((element,index) => {
            element.addEventListener("click",(e)=>{
                e.preventDefault();
                if (clampText[index].style.display=="block") {
                    clampText[index].style.display = "-webkit-box";
                    clampText[index].style.webkitLineClamp = "5";
                    element.innerHTML = "Read More";
                    clampText[index].scrollIntoView({
                        behavior:'smooth',
                    })
                }
                else {
                    clampText[index].style.display = "block";
                    clampText[index].style.webkitLineClamp = "unset";
                    element.innerHTML = "Read Less";
                }
        })
    })

//Navigation or header JS
let menubtn = document.getElementById("hamburger");
let sidebar = document.getElementById("sidebar");

menubtn.addEventListener("click",()=>{
    sidebar.classList.add("openSidebar");  
})

let menucloseBtn = document.getElementById("sidebar-close");
menucloseBtn.addEventListener("click",()=>{
    sidebar.classList.remove("openSidebar");
})

let navitem = document.querySelectorAll(".nav-item");
navitem.forEach((element)=>{
    element.addEventListener("click",(e)=>{
        e.preventDefault();
        let target = document.getElementById(element.getAttribute('href').substring(1));
        target.scrollIntoView({
            behavior:'smooth',
        })
        sidebar.classList.remove("openSidebar");
    })
})

document.querySelector(".downloadBrochure").addEventListener("click",()=>{
    sidebar.classList.remove("openSidebar");
})

/* Banner Carousel JS*/

setInterval(updateBannerCorousel,3000);

let bannerImage = document.querySelectorAll(".bannerImage");
let bannerContainer = document.querySelector(".banner");
let bannertransform = 0;
let bannercount = 0;
function updateBannerCorousel() {
    bannerContainer.style.transform =  `translateX(-${bannercount*100}%)`;
    bannercount+=1;
    if (bannercount>bannerImage.length-1){
        bannercount=0;
    }
}

/* gallery JS */

        let galleryIndex ;
        let galleryImg = document.querySelectorAll(".galleryCard img");
        let galleryCard = document.querySelectorAll(".galleryCard");
        let gallerySlide = document.querySelector(".gallerySlide");
        let galleryTrans = 0;
        let gcount = galleryImg.length-1;
        let ccount = 1;
        let galleryCaurosel = setInterval(cauroselbegin, 3000);
        let gallerypopupopen = false

        function cauroselbegin() {
            
            if (window.innerWidth<'769') {
                galleryTrans += 105;
                if (ccount==gcount+1) {
                ccount=0;
                galleryTrans=0;
            }
            }
            else {
                galleryTrans += 35;
                if (ccount>=gcount-1) {
                    ccount=0;
                    galleryTrans=0;
                }
            }
            gallerySlide.style.transform = `translateX(-${galleryTrans}%)`;
            ccount=ccount+1;
        }

        // window.addEventListener("resize",()=>{
        //     ccount=1;
        //     clearInterval(galleryCaurosel);
            
        //     galleryCaurosel = setInterval(cauroselbegin,3000);
        // })

        galleryImg.forEach((element)=>{
            element.addEventListener("mouseenter",function () {
                clearInterval(galleryCaurosel);
            })
        })

        galleryImg.forEach((element)=>{
            element.addEventListener("mouseout",function () {
                if (!gallerypopupopen) {
                galleryCaurosel = setInterval(cauroselbegin, 3000);
                }
            })
        })

        let gallerypopupimage = document.getElementById("gallery-popupimage");
        let overlay = document.getElementById("overlay");
        galleryImg.forEach((element,index) => {
            element.addEventListener("click",(e)=>{
                e.preventDefault();
                overlay.style.display = "block";
                gallerypopupimage.src = element.src;
                clearInterval(galleryCaurosel);
                gallerypopupopen = true;
                galleryIndex = index;
                body.classList.add("noscroll");
            })
        })

        document.querySelector(".gallery-popup-close").addEventListener("click",()=>{
            overlay.style.display = "none";
            gallerypopupimage.src = "";
            gallerypopupopen = false;
            galleryCaurosel = setInterval(cauroselbegin,3000);
            body.classList.remove("noscroll");
        })

        document.querySelector("#gallery_prevBtn").addEventListener("click",()=>{
            if (galleryIndex==0) {
                galleryIndex=gcount;
            }
            else {galleryIndex--;}
            gallerypopupimage.src = galleryImg[galleryIndex].src;
        })

        document.querySelector("#gallery_nextBtn").addEventListener("click",()=>{
            if (galleryIndex==gcount) {
                galleryIndex=0;
            }
            else {galleryIndex++;}
            gallerypopupimage.src = galleryImg[galleryIndex].src;
        })
        
        document.querySelector(".car_prevBtn").addEventListener("click",()=>{
            ccount=ccount-1;
            if (window.innerWidth<'768') {
                galleryTrans -= 105;
                if (ccount<0) {
                ccount=gcount;
                galleryTrans=gcount*105;
            }
            }
            else {
                galleryTrans -= 35;
                if (ccount<0) {
                    ccount=gcount-2;
                    galleryTrans=ccount*35;
                }
            }
            gallerySlide.style.transform = `translateX(-${galleryTrans}%)`;
            clearInterval(galleryCaurosel);
            galleryCaurosel = setInterval(galleryCaurosel,300);
            
        })
    
        document.querySelector(".car_nextBtn").addEventListener("click",()=>{
            ccount=ccount+1;
            if (window.innerWidth<'768') {
                galleryTrans += 105;
                if (ccount>gcount) {
                ccount=0;
                galleryTrans=0;
            }
            }
            else {
                galleryTrans += 35;
                if (ccount>=gcount-1) {
                    ccount=0;
                    galleryTrans=0;
                }
            }
            gallerySlide.style.transform = `translateX(-${galleryTrans}%)`;
            clearInterval(galleryCaurosel);
            
            galleryCaurosel = setInterval(cauroselbegin,3000);
        })
    

        //location JS
        let accordionBtn = document.querySelectorAll(".accordionBtn");
        let accordionContent = document.querySelectorAll(".accordion-content");
        let mobileaccordionBtn = document.querySelectorAll(".mobile-accordionBtn");
        let spanArrow = document.querySelectorAll(".accordion-arrow");

        accordionBtn.forEach((element,index)=>{
            element.addEventListener("click",()=>{toogleAccordion(index)});
        })
        mobileaccordionBtn.forEach((element,index)=>{
            element.addEventListener("click",()=>{toogleAccordion(index)});
        })

        function toogleAccordion(index) {
            if (accordionBtn[index].classList.contains("accordion-active")) {
                accordionBtn[index].classList.remove("accordion-active");
            accordionContent[index].classList.remove("contentactive");
            mobileaccordionBtn[index].classList.remove("accordion-active");
            spanArrow[index].classList.remove("accordion-arrow-active");
            return;
            }
            for (let i=0;i<accordionBtn.length;i++) {
                accordionBtn[i].classList.remove("accordion-active");
                accordionContent[i].classList.remove("contentactive");
                mobileaccordionBtn[i].classList.remove("accordion-active");
                spanArrow[i].classList.remove("accordion-arrow-active");
            }
            if (!accordionBtn[index].classList.contains("accordion-active")) {
            accordionBtn[index].classList.add("accordion-active");
            accordionContent[index].classList.add("contentactive");
            mobileaccordionBtn[index].classList.add("accordion-active");
            spanArrow[index].classList.add("accordion-arrow-active");
            }
        }

        window.addEventListener("resize",()=>{
            if(window.innerWidth>900) {
                accordionBtn[0].classList.contains("accordion-active") ? "" : toogleAccordion(0);
            }
        })

        //amenities JS
            let amenitiesIndex ;
        let amenitiesImg = document.querySelectorAll(".amenitiesCard img");
        let amenitiesCard = document.querySelectorAll(".amenitiesCard");
        let amenitiesSlide = document.querySelector(".amenitiesSlide");
        let amenitiesTrans = 0;
        let acount = amenitiesImg.length-1;
        let account = 1;
        let amenitiesCaurosel = setInterval(amenitiescauroselbegin, 3000);
        let amenitiespopupopen = false

        function amenitiescauroselbegin() {
            
            if (window.innerWidth<'769') {
                amenitiesTrans += 105;
                if (account==acount+1) {
                account=0;
                amenitiesTrans=0;
            }
            }
            else {
                amenitiesTrans += 35;
                if (account>=acount-1) {
                    account=0;
                    amenitiesTrans=0;
                }
            }
            amenitiesSlide.style.transform = `translateX(-${amenitiesTrans}%)`;
            account=account+1;
        }

        // window.addEventListener("resize",()=>{
        //     account=1;
        //     clearInterval(amenitiesCaurosel);
            
        //     amenitiesCaurosel = setInterval(cauroselbegin,3000);
        // })

        amenitiesImg.forEach((element)=>{
            element.addEventListener("mouseenter",function () {
                clearInterval(amenitiesCaurosel);
            })
        })

        amenitiesImg.forEach((element)=>{
            element.addEventListener("mouseout",function () {
                if (!amenitiespopupopen) {
                amenitiesCaurosel = setInterval(amenitiescauroselbegin, 3000);
                }
            })
        })

        let amenitiespopupimage = document.getElementById("amenities-popupimage");
        let aoverlay = document.getElementById("amenities-overlay");
        amenitiesImg.forEach((element,index) => {
            element.addEventListener("click",(e)=>{
                e.preventDefault();
                aoverlay.style.display = "block";
                amenitiespopupimage.src = element.src;
                clearInterval(amenitiesCaurosel);
                amenitiespopupopen = true;
                amenitiesIndex = index;
                body.classList.add("noscroll");
            })
        })

        document.querySelector(".amenities-popup-close").addEventListener("click",()=>{
            aoverlay.style.display = "none";
            amenitiespopupimage.src = "";
            amenitiespopupopen = false;
            amenitiesCaurosel = setInterval(amenitiescauroselbegin,3000);
            body.classList.remove("noscroll");
        })

        document.querySelector("#amenities_prevBtn").addEventListener("click",()=>{
            if (amenitiesIndex==0) {
                amenitiesIndex=acount;
            }
            else {amenitiesIndex--;}
            amenitiespopupimage.src = amenitiesImg[amenitiesIndex].src;
        })

        document.querySelector("#amenities_nextBtn").addEventListener("click",()=>{
            if (amenitiesIndex==acount) {
                amenitiesIndex=0;
            }
            else {amenitiesIndex++;}
            amenitiespopupimage.src = amenitiesImg[amenitiesIndex].src;
        })
        
        document.querySelector(".amenities_prevBtn").addEventListener("click",()=>{
            account=account-1;
            if (window.innerWidth<'768') {
                amenitiesTrans -= 105;
                if (account<0) {
                account=acount;
                amenitiesTrans=acount*105;
            }
            }
            else {
                amenitiesTrans -= 35;
                if (account<0) {
                    account=acount-2;
                    amenitiesTrans=account*35;
                }
            }
            amenitiesSlide.style.transform = `translateX(-${amenitiesTrans}%)`;
            clearInterval(amenitiesCaurosel);
            amenitiesCaurosel = setInterval(amenitiescauroselbegin,3000);
            
        })
    
        document.querySelector(".amenities_nextBtn").addEventListener("click",()=>{
            account=account+1;
            if (window.innerWidth<'768') {
                amenitiesTrans += 105;
                if (account>acount) {
                account=0;
                amenitiesTrans=0;
            }
            }
            else {
                amenitiesTrans += 35;
                if (account>=acount-1) {
                    account=0;
                    amenitiesTrans=0;
                }
            }
            amenitiesSlide.style.transform = `translateX(-${amenitiesTrans}%)`;
            clearInterval(amenitiesCaurosel);
            
            amenitiesCaurosel = setInterval(amenitiescauroselbegin,3000);
        })

        // Fade in effect

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of section is visible
  });

  document.querySelectorAll(".fade-section").forEach(section => {
    observer.observe(section);
  });

  //highlightimage fadein effect

  const highlightobserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        highlightobserver.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.3 // Trigger when 10% of section is visible
  });

  document.querySelectorAll(".highlightImage").forEach(section => {
    highlightobserver.observe(section);
  });

// floor JS
    window.addEventListener("resize",updatefloorCarousel);
    window.addEventListener("load",updatefloorCarousel);
    let floorInterval = null;
    let findex = 0;
    let floorcount = document.querySelectorAll(".floor-item").length;
    let floorWrapper = document.querySelector(".floorplan-Wrapper");

    function updatefloorCarousel(){
        if (window.innerWidth<=768) {
            clearInterval(floorInterval);
            findex=0;
            floorCarousel();
            floorInterval = setInterval(floorCarousel, 3000);
        }
        else {
            clearInterval(floorInterval);
            floorWrapper.style.transform = `translateX(0%)`;
        }
    }

    function floorCarousel() {
        findex++;
        if(findex >=floorcount) {
            findex = 0;
        }
        floorWrapper.style.transform = `translateX(-${findex*100}%)`;
    }

    document.querySelector(".floor_prevBtn").addEventListener("click",()=>{
        clearInterval(floorInterval);
        if(findex == 0 ) {
            findex = floorcount-1;
        }
        else {findex-=1;}
        floorWrapper.style.transform = `translateX(-${findex*100}%)`;
        floorInterval = setInterval(floorCarousel, 3000);
    })

    document.querySelector(".floor_nextBtn").addEventListener("click",()=>{
        clearInterval(floorInterval);
        if(findex == floorcount-1 ) {
            findex = 0;
        }
        else {findex+=1;}
        floorWrapper.style.transform = `translateX(-${findex*100}%)`;
        floorInterval = setInterval(floorCarousel, 3000);
    })

    //popup-form
        window.addEventListener("load",()=>{
            setTimeout(()=>{
                document.querySelector("#popupform").style.display="block";
                body.classList.add("noscroll");
            },4000);
        })

        document.querySelector(".popup-overlay").addEventListener("click",()=>{
            document.querySelector("#popupform").style.display="none";
            body.classList.remove("noscroll");
        })
        document.querySelector(".popup-overlay-close").addEventListener("click",()=>{
            document.querySelector("#popupform").style.display="none";
            body.classList.remove("noscroll");
        })

        let popupheading = document.querySelector(".popup-form-heading");
        document.querySelectorAll(".popup-trigger").forEach((element)=>{
            element.addEventListener("click",(e)=>{
                e.preventDefault();
                popupheading.innerHTML = element.getAttribute("data-heading");
                document.querySelector("#popupform").style.display="block";
                body.classList.add("noscroll");
            })
        })


        //widget JS
        function repositionWidget() {
    let launcher = document.querySelector("#launcher");
    if (launcher) {
        // Use more specific and persistent positioning
        launcher.style.setProperty("bottom", "60px", "important");
        launcher.style.setProperty("left", "5px", "important");
        launcher.style.setProperty("right", "auto", "important");
        launcher.style.setProperty("transform", "none", "important");
        
        // Also target the iframe container if it exists
        let launcherFrame = document.querySelector("iframe[title*='Chat']");
        if (launcherFrame && launcherFrame.parentElement) {
            launcherFrame.parentElement.style.setProperty("bottom", "60px", "important");
            launcherFrame.parentElement.style.setProperty("left", "5px", "important");
            launcherFrame.parentElement.style.setProperty("right", "auto", "important");
        }
    }
}

function forceRepositioning() {
    // Multiple selectors to catch different states of the widget
    const selectors = [
        "#launcher",
        "[data-testid='launcher']",
        ".zEWidget-launcher",
        "iframe[title*='Chat']"
    ];
    
    selectors.forEach(selector => {
        let element = document.querySelector(selector);
        if (element) {
            let container = element.parentElement || element;
            container.style.setProperty("bottom", "60px", "important");
            container.style.setProperty("left", "5px", "important");
            container.style.setProperty("right", "auto", "important");
            container.style.setProperty("transform", "none", "important");
        }
    });
}

function loadZeSnippet() {
    setTimeout(function () {
        var script = document.createElement("script");
        script.id = "ze-snippet";
        script.src = "https://static.zdassets.com/ekr/snippet.js?key=94b386d0-0e8f-40fe-b5ff-a939cb332fbc";
        document.head.appendChild(script);

        script.onload = function () {
            var checkInterval = setInterval(function () {
                if (typeof zE !== "undefined" && document.querySelector("#launcher")) {
                    clearInterval(checkInterval);

                    // Initial positioning
                    repositionWidget();
                    
                    // Listen to all widget events
                    zE("webWidget:on", "open", function() {
                        setTimeout(repositionWidget, 100);
                    });
                    
                    zE("webWidget:on", "close", function() {
                        setTimeout(repositionWidget, 100);
                        setTimeout(forceRepositioning, 500); // Extra delay for close
                    });
                    
                    zE("webWidget:on", "minimize", function() {
                        setTimeout(repositionWidget, 100);
                        setTimeout(forceRepositioning, 500);
                    });
                    
                    zE("webWidget:on", "maximize", function() {
                        setTimeout(repositionWidget, 100);
                    });
                    
                    zE("webWidget:on", "launcherClick", function() {
                        setTimeout(repositionWidget, 100);
                    });

                    // Aggressive repositioning every 2 seconds
                    setInterval(forceRepositioning, 2000);
                    
                    // Watch for DOM changes that might reset position
                    if (window.MutationObserver) {
                        const observer = new MutationObserver(function(mutations) {
                            mutations.forEach(function(mutation) {
                                if (mutation.type === 'attributes' && 
                                    (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
                                    setTimeout(repositionWidget, 50);
                                }
                            });
                        });
                        
                        // Observe the launcher and its parent
                        setTimeout(function() {
                            let launcher = document.querySelector("#launcher");
                            if (launcher) {
                                observer.observe(launcher, { attributes: true, subtree: true });
                                if (launcher.parentElement) {
                                    observer.observe(launcher.parentElement, { attributes: true, subtree: true });
                                }
                            }
                        }, 1000);
                    }
                }
            }, 100);
        };
    }, 4000);
}

function toggleTab(id) {
    document.querySelectorAll('.tab input[type="checkbox"]').forEach(function (el) {
        if (el.id !== id) el.checked = false;
    });
}

// Also add CSS to make positioning more persistent
function addPersistentCSS() {
    const style = document.createElement('style');
    style.textContent = `
        #launcher,
        [data-testid='launcher'],
        .zEWidget-launcher {
            bottom: 60px !important;
            left: 5px !important;
            right: auto !important;
            transform: none !important;
        }
        
        /* Target the iframe container as well */
        iframe[title*="Chat"] {
            position: fixed !important;
            bottom: 60px !important;
            left: 5px !important;
            right: auto !important;
        }
    `;
    document.head.appendChild(style);
}

// Load everything
addPersistentCSS();
loadZeSnippet();