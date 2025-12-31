function repositionWidget(){let e=document.querySelector("#launcher"),t=window.matchMedia("(max-width:768px)").matches?"60px":"0px";if(e){e.style.setProperty("bottom",t,"important"),e.style.setProperty("left","5px","important"),e.style.setProperty("right","auto","important"),e.style.setProperty("transform","none","important");let n=document.querySelector("iframe[title*='Chat']");n&&n.parentElement&&(n.parentElement.style.setProperty("bottom",t,"important"),n.parentElement.style.setProperty("left","5px","important"),n.parentElement.style.setProperty("right","auto","important"))}}function forceRepositioning(){let e=window.matchMedia("(max-width:768px)").matches?"0px":"60px";["#launcher","[data-testid='launcher']",".zEWidget-launcher","iframe[title*='Chat']"].forEach(t=>{let n=document.querySelector(t);if(n){let r=n.parentElement||n;r.style.setProperty("bottom",e,"important"),r.style.setProperty("left","5px","important"),r.style.setProperty("right","auto","important"),r.style.setProperty("transform","none","important")}})}function loadZeSnippet(){setTimeout(function(){var e=document.createElement("script");e.id="ze-snippet",e.src="https://static.zdassets.com/ekr/snippet.js?key=94b386d0-0e8f-40fe-b5ff-a939cb332fbc",document.head.appendChild(e),e.onload=function(){var e=setInterval(function(){if("undefined"!=typeof zE&&document.querySelector("#launcher")&&(clearInterval(e),repositionWidget(),zE("webWidget:on","open",function(){setTimeout(repositionWidget,100)}),zE("webWidget:on","close",function(){setTimeout(repositionWidget,100),setTimeout(forceRepositioning,500)}),zE("webWidget:on","minimize",function(){setTimeout(repositionWidget,100),setTimeout(forceRepositioning,500)}),zE("webWidget:on","maximize",function(){setTimeout(repositionWidget,100)}),zE("webWidget:on","launcherClick",function(){setTimeout(repositionWidget,100)}),setInterval(forceRepositioning,2e3),window.MutationObserver)){let t=new MutationObserver(function(e){e.forEach(function(e){"attributes"!==e.type||"style"!==e.attributeName&&"class"!==e.attributeName||setTimeout(repositionWidget,50)})});setTimeout(function(){let e=document.querySelector("#launcher");e&&(t.observe(e,{attributes:!0,subtree:!0}),e.parentElement&&t.observe(e.parentElement,{attributes:!0,subtree:!0}))},1e3)}},100)}},4e3)}function toggleTab(e){document.querySelectorAll('.tab input[type="checkbox"]').forEach(function(t){t.id!==e&&(t.checked=!1)})}function addPersistentCSS(){let e=document.createElement("style");e.textContent="\n        #launcher,\n        [data-testid='launcher'],\n        .zEWidget-launcher {\n            bottom: 0px !important;\n            left: 5px !important;\n            right: auto !important;\n            transform: none !important;\n        }\n        \n        /* Target the iframe container as well */\n        iframe[title*=\"Chat\"] {\n            position: fixed !important;\n            bottom: 0px !important;\n            left: 5px !important;\n            right: auto !important;\n        }\n\n        @media (max-width:768px) {\n            #launcher,\n        [data-testid='launcher'],\n        .zEWidget-launcher {\n            bottom: 60px !important;\n            left: 5px !important;\n            right: auto !important;\n            transform: none !important;\n        }\n        \n        /* Target the iframe container as well */\n        iframe[title*=\"Chat\"] {\n            position: fixed !important;\n            bottom: 60px !important;\n            left: 5px !important;\n            right: auto !important;\n        }\n        }\n    ",document.head.appendChild(e)}

// document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("hamburger"),t=document.getElementById("sidebar");e.addEventListener("click",()=>{t.classList.add("openSidebar")});document.getElementById("sidebar-close").addEventListener("click",()=>{t.classList.remove("openSidebar")});document.querySelectorAll(".nav-item").forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),document.getElementById(e.getAttribute("href").substring(1)).scrollIntoView({behavior:"smooth"}),t.classList.remove("openSidebar")})}),document.querySelectorAll(".downloadBrochure").forEach(e=>{e.addEventListener("click",()=>{t.classList.remove("openSidebar")})});let a=document.querySelectorAll(".readMoreBtn"),s=document.querySelectorAll(".clampText");a.forEach((e,t)=>{e.addEventListener("click",n=>{n.preventDefault(),"block"==s[t].style.display?(s[t].style.display="-webkit-box",s[t].style.webkitLineClamp="4",e.innerHTML="Read More ",s[t].scrollIntoView({behavior:"smooth"})):(s[t].style.display="block",s[t].style.webkitLineClamp="unset",e.innerHTML="Read Less ")})});let c=document.querySelector(".body"),d=document.querySelectorAll(".amenitiesCard img"),p=document.querySelector(".amenitiesSlide"),u=document.querySelectorAll(".amenities-description"),m=d.length-1,y=0,f=0,g=!1,v=setInterval(b,5e3);function h(){return window.innerWidth<769?105:35}function E(){return window.innerWidth<769?m+1:m-1}function L(){p.style.transform=`translateX(-${y*h()}%)`}function b(){L(),y=(y+1)%E()}function S(){clearInterval(v),v=setInterval(b,3e3)}d.forEach((e,t)=>{e.addEventListener("mouseenter",()=>clearInterval(v)),e.addEventListener("mouseout",e=>{e.preventDefault(),g||(v=setInterval(b,5e3))}),e.addEventListener("click",()=>{document.getElementById("amenities-overlay").style.display="block",document.getElementById("amenities-popupimage").src=e.src,g=!0,f=t,clearInterval(v),document.querySelector(".amenities-popup-text").innerHTML=u[f].innerHTML,c.classList.add("noscroll")}),e.addEventListener("touchstart",()=>{},{passive:!0})}),document.querySelector(".amenities-popup-close").addEventListener("click",e=>{e.preventDefault(),document.getElementById("amenities-overlay").style.display="none",document.getElementById("amenities-popupimage").src="",g=!1,v=setInterval(b,5e3),c.classList.remove("noscroll")}),document.getElementById("amenities_prevBtn").addEventListener("click",()=>{f=(f-1+d.length)%d.length,document.getElementById("amenities-popupimage").src=d[f].src,document.querySelector(".amenities-popup-text").innerHTML=u[f].innerHTML}),document.getElementById("amenities_nextBtn").addEventListener("click",()=>{f=(f+1)%d.length,document.getElementById("amenities-popupimage").src=d[f].src,document.querySelector(".amenities-popup-text").innerHTML=u[f].innerHTML}),document.querySelector(".amenities_prevBtn").addEventListener("click",e=>{e.preventDefault(),y=(y-1+E())%E(),L(),S()}),document.querySelector(".amenities_nextBtn").addEventListener("click",()=>{y=(y+1)%E(),L(),S()}),window.addEventListener("resize",()=>{L()});let $=document.querySelectorAll(".galleryCard img"),q=document.querySelector(".gallerySlide"),_=$.length-1,k=0,x=0,B=!1,w=setInterval(C,5e3);function W(){return window.innerWidth<769?105:35}function I(){return window.innerWidth<769?_+1:_-1}function A(){q.style.transform=`translateX(-${k*W()}%)`}function C(){A(),k=(k+1)%I()}function M(){clearInterval(w),w=setInterval(C,3e3)}function P(){document.querySelector(".popup-overlay").style.display="none",c.classList.remove("noscroll"),document.querySelectorAll(".payment-table-container").forEach(e=>{e.classList.contains("show-full")&&e.classList.remove("show-full")})}function T(){document.querySelector(".popup-overlay").style.display="block",c.classList.add("noscroll")}$.forEach((e,t)=>{e.addEventListener("mouseenter",()=>clearInterval(w)),e.addEventListener("mouseout",()=>{B||(w=setInterval(C,5e3))}),e.addEventListener("click",()=>{document.getElementById("gallery-overlay").style.display="block",document.getElementById("gallery-popupimage").src=e.src,B=!0,x=t,clearInterval(w),c.classList.add("noscroll")})}),document.querySelector(".gallery-popup-close").addEventListener("click",e=>{e.preventDefault(),document.getElementById("gallery-overlay").style.display="none",document.getElementById("gallery-popupimage").src="",B=!1,w=setInterval(C,5e3),c.classList.remove("noscroll")}),document.getElementById("gallery_prevBtn").addEventListener("click",()=>{x=(x-1+$.length)%$.length,document.getElementById("gallery-popupimage").src=$[x].src}),document.getElementById("gallery_nextBtn").addEventListener("click",()=>{x=(x+1)%$.length,document.getElementById("gallery-popupimage").src=$[x].src}),document.querySelector(".gallery_prevBtn").addEventListener("click",e=>{e.preventDefault(),k=(k-1+I())%I(),A(),M()}),document.querySelector(".gallery_nextBtn").addEventListener("click",()=>{k=(k+1)%I(),A(),M()}),window.addEventListener("resize",e=>{e.preventDefault(),A()}),document.querySelector(".popupform-close").addEventListener("click",()=>{P()}),document.querySelectorAll(".popup-trigger").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),document.querySelector("#popupform-heading").innerHTML=e.getAttribute("data-heading"),T()})}),window.addEventListener("load",e=>{e.preventDefault(),setTimeout(()=>{T()},4e3)});let z=document.querySelectorAll(".accordion-content"),D=document.querySelectorAll(".mobile-accordionBtn"),H=document.querySelectorAll(".accordion-arrow");function R(e){if(D[e].classList.contains("accordion-active")){D[e].classList.remove("accordion-active"),z[e].classList.remove("contentactive"),H[e].classList.remove("accordion-arrow-active");return}for(let t=0;t<D.length;t++)D[t].classList.remove("accordion-active"),z[t].classList.remove("contentactive"),H[t].classList.remove("accordion-arrow-active");D[e].classList.contains("accordion-active")||(D[e].classList.add("accordion-active"),z[e].classList.add("contentactive"),H[e].classList.add("accordion-arrow-active"))}D.forEach((e,t)=>{e.addEventListener("click",()=>{R(t)})});let X=document.querySelectorAll(".floorCard img"),N=document.querySelector(".floorSlide"),O=X.length-1,V=0,Z=setInterval(J,5e3);function j(){return window.innerWidth<768?105:0}function F(){return window.innerWidth<768?O+1:O-1}function G(){N.style.transform=`translateX(-${V*j()}%)`}function J(){G(),V=(V+1)%F()}function K(){clearInterval(Z),Z=setInterval(J,5e3)}document.querySelector(".floor_prevBtn").addEventListener("click",()=>{V=(V-1+F())%F(),G(),K()}),document.querySelector(".floor_nextBtn").addEventListener("click",()=>{V=(V+1)%F(),G(),K()}),window.addEventListener("resize",()=>(G(),window.innerWidth<768?K():clearInterval(Z))),document.querySelectorAll(".paymentEnquireBtn").forEach((e,t)=>{e.addEventListener("click",()=>{document.querySelectorAll(".payment-table-container")[t].classList.add("show-full")})})});

// let n=setInterval(l,5e3),r=document.querySelectorAll(".bannerImage"),i=document.querySelector(".banner"),o=0;function l(){i.style.transform=`translateX(-${100*o}%)`,(o+=1)>r.length-1&&(o=0)}document.querySelector(".bannerPrev").addEventListener("click",()=>{o=(o-1+r.length)%r.length,i.style.transform=`translateX(-${100*o}%)`,clearInterval(n),n=setInterval(l,5e3)}),document.querySelector(".bannerNext").addEventListener("click",()=>{o=(o+1)%r.length,i.style.transform=`translateX(-${100*o}%)`,clearInterval(n),n=setInterval(l,5e3)});

addPersistentCSS(),loadZeSnippet(),window.addEventListener("resize",repositionWidget);

// document.addEventListener("DOMContentLoaded",function(){
//     if (window.innerWidth <= "768") {
//         console.log("Desktop view detected, setting up banner image load event listener.");
//     const bannerImage1 = document.querySelector(".bannerImage");
//     if (bannerImage1.complete) {
//         bannerImage1.style.opacity = "1";
//         console.log("Banner image was already loaded, opacity set to 1");
//     }else {
//         bannerImage1.addEventListener("load", function() {
//             bannerImage1.style.opacity = "1";
//             console.log("Banner image loaded via event listener, opacity set to 1");
//         });
//     }
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    let e = document.getElementById("hamburger"),
        t = document.getElementById("sidebar");
    e.addEventListener("click", () => {
        t.classList.add("openSidebar");
    });
    document.getElementById("sidebar-close").addEventListener("click", () => {
        t.classList.remove("openSidebar");
    });
    document.querySelectorAll(".nav-item").forEach((e) => {
        e.addEventListener("click", (n) => {
            n.preventDefault(),
                document.getElementById(e.getAttribute("href").substring(1)).scrollIntoView({ behavior: "smooth" }),
                t.classList.remove("openSidebar");
        });
    }),
        document.querySelectorAll(".downloadBrochure").forEach((e) => {
            e.addEventListener("click", () => {
                t.classList.remove("openSidebar");
            });
        });
    let a = document.querySelectorAll(".readMoreBtn"),
        s = document.querySelectorAll(".clampText");
    a.forEach((e, t) => {
        e.addEventListener("click", (n) => {
            n.preventDefault(),
                "block" == s[t].style.display
                    ? ((s[t].style.display = "-webkit-box"),
                      (s[t].style.webkitLineClamp = "4"),
                      (e.innerHTML = "Read More "),
                      s[t].scrollIntoView({ behavior: "smooth" }))
                    : ((s[t].style.display = "block"),
                      (s[t].style.webkitLineClamp = "unset"),
                      (e.innerHTML = "Read Less "));
        });
    });
    let c = document.querySelector(".body"),
        d = document.querySelectorAll(".amenitiesCard img"),
        p = document.querySelector(".amenitiesSlide"),
        u = document.querySelectorAll(".amenities-description"),
        m = d.length - 1,
        y = 0,
        f = 0,
        g = !1,
        v = setInterval(b, 5e3);
    function h() {
        return window.innerWidth < 769 ? 105 : 35;
    }
    function E() {
        return window.innerWidth < 769 ? m + 1 : m - 1;
    }
    function L() {
        p.style.transform = `translateX(-${y * h()}%)`;
    }
    function b() {
        L(), (y = (y + 1) % E());
    }
    function S() {
        clearInterval(v), (v = setInterval(b, 3e3));
    }
    // d.forEach((e, t) => {
    //     e.addEventListener("mouseenter", () => clearInterval(v)),
    //         e.addEventListener("mouseout", (e) => {
    //             e.preventDefault(), g || (v = setInterval(b, 5e3));
    //         }),
    //         e.addEventListener("click", () => {
    //             (document.getElementById("amenities-overlay").style.display = "block"),
    //                 (document.getElementById("amenities-popupimage").src = e.src),
    //                 (g = !0),
    //                 (f = t),
    //                 clearInterval(v),
    //                 (document.querySelector(".amenities-popup-text").innerHTML = u[f].innerHTML),
    //                 c.classList.add("noscroll");
    //         }),
    //         e.addEventListener("touchstart", () => {}, { passive: !0 });
    // }),
        // document.querySelector(".amenities-popup-close").addEventListener("click", (e) => {
        //     e.preventDefault(),
        //         (document.getElementById("amenities-overlay").style.display = "none"),
        //         (document.getElementById("amenities-popupimage").src = ""),
        //         (g = !1),
        //         (v = setInterval(b, 5e3)),
        //         c.classList.remove("noscroll");
        // }),
        // document.getElementById("amenities_prevBtn").addEventListener("click", () => {
        //     (f = (f - 1 + d.length) % d.length),
        //         (document.getElementById("amenities-popupimage").src = d[f].src),
        //         (document.querySelector(".amenities-popup-text").innerHTML = u[f].innerHTML);
        // }),
        // document.getElementById("amenities_nextBtn").addEventListener("click", () => {
        //     (f = (f + 1) % d.length),
        //         (document.getElementById("amenities-popupimage").src = d[f].src),
        //         (document.querySelector(".amenities-popup-text").innerHTML = u[f].innerHTML);
        // }),
        document.querySelector(".amenities_prevBtn").addEventListener("click", (e) => {
            e.preventDefault(), (y = (y - 1 + E()) % E()), L(), S();
        }),
        document.querySelector(".amenities_nextBtn").addEventListener("click", () => {
            (y = (y + 1) % E()), L(), S();
        }),
        window.addEventListener("resize", () => {
            L();
        });
    let $ = document.querySelectorAll(".galleryCard img"),
        q = document.querySelector(".gallerySlide"),
        _ = $.length - 1,
        k = 0,
        x = 0,
        B = !1,
        w = setInterval(C, 5e3);
    function W() {
        return window.innerWidth < 769 ? 105 : 35;
    }
    function I() {
        return window.innerWidth < 769 ? _ + 1 : _ - 1;
    }
    function A() {
        q.style.transform = `translateX(-${k * W()}%)`;
    }
    function C() {
        A(), (k = (k + 1) % I());
    }
    function M() {
        clearInterval(w), (w = setInterval(C, 3e3));
    }
    function P() {
        (document.querySelector(".popup-overlay").style.display = "none"),
            c.classList.remove("noscroll"),
            document.querySelectorAll(".payment-table-container").forEach((e) => {
                e.classList.contains("show-full") && e.classList.remove("show-full");
            });
    }
    function T() {
        (document.querySelector(".popup-overlay").style.display = "block"), c.classList.add("noscroll");
    }
    // $.forEach((e, t) => {
    //     e.addEventListener("mouseenter", () => clearInterval(w)),
    //         e.addEventListener("mouseout", () => {
    //             B || (w = setInterval(C, 5e3));
    //         }),
    //         e.addEventListener("click", () => {
    //             (document.getElementById("gallery-overlay").style.display = "block"),
    //                 (document.getElementById("gallery-popupimage").src = e.src),
    //                 (B = !0),
    //                 (x = t),
    //                 clearInterval(w),
    //                 c.classList.add("noscroll");
    //         });
    // }),
        // document.querySelector(".gallery-popup-close").addEventListener("click", (e) => {
        //     e.preventDefault(),
        //         (document.getElementById("gallery-overlay").style.display = "none"),
        //         (document.getElementById("gallery-popupimage").src = ""),
        //         (B = !1),
        //         (w = setInterval(C, 5e3)),
        //         c.classList.remove("noscroll");
        // }),
        // document.getElementById("gallery_prevBtn").addEventListener("click", () => {
        //     (x = (x - 1 + $.length) % $.length), (document.getElementById("gallery-popupimage").src = $[x].src);
        // }),
        // document.getElementById("gallery_nextBtn").addEventListener("click", () => {
        //     (x = (x + 1) % $.length), (document.getElementById("gallery-popupimage").src = $[x].src);
        // }),
        document.querySelector(".gallery_prevBtn").addEventListener("click", (e) => {
            e.preventDefault(), (k = (k - 1 + I()) % I()), A(), M();
        }),
        document.querySelector(".gallery_nextBtn").addEventListener("click", () => {
            (k = (k + 1) % I()), A(), M();
        }),
        window.addEventListener("resize", (e) => {
            e.preventDefault(), A();
        }),
        document.querySelector(".popupform-close").addEventListener("click", () => {
            P();
        }),
        document.querySelectorAll(".popup-trigger").forEach((e) => {
            e.addEventListener("click", (t) => {
                t.preventDefault(),
                    (document.querySelector("#popupform-heading").innerHTML = e.getAttribute("data-heading")),
                    T();
            });
        }),
        window.addEventListener("load", (e) => {
            e.preventDefault(),
                setTimeout(() => {
                    T();
                }, 4e3);
        });
    let z = document.querySelectorAll(".accordion-content"),
        D = document.querySelectorAll(".mobile-accordionBtn"),
        H = document.querySelectorAll(".accordion-arrow");
    function R(e) {
        if (D[e].classList.contains("accordion-active")) {
            D[e].classList.remove("accordion-active"),
                z[e].classList.remove("contentactive"),
                H[e].classList.remove("accordion-arrow-active");
            return;
        }
        for (let t = 0; t < D.length; t++)
            D[t].classList.remove("accordion-active"),
                z[t].classList.remove("contentactive"),
                H[t].classList.remove("accordion-arrow-active");
        D[e].classList.contains("accordion-active") ||
            (D[e].classList.add("accordion-active"),
            z[e].classList.add("contentactive"),
            H[e].classList.add("accordion-arrow-active"));
    }
    D.forEach((e, t) => {
        e.addEventListener("click", () => {
            R(t);
        });
    });
    let X = document.querySelectorAll(".floorCard img"),
        N = document.querySelector(".floorSlide"),
        O = X.length - 1,
        V = 0,
        Z = setInterval(J, 5e3);
    function j() {
        return window.innerWidth < 768 ? 105 : 0;
    }
    function F() {
        return window.innerWidth < 768 ? O + 1 : O - 1;
    }
    function G() {
        N.style.transform = `translateX(-${V * j()}%)`;
    }
    function J() {
        G(), (V = (V + 1) % F());
    }
    function K() {
        clearInterval(Z), (Z = setInterval(J, 5e3));
    }
    document.querySelector(".floor_prevBtn").addEventListener("click", () => {
        (V = (V - 1 + F()) % F()), G(), K();
    }),
        document.querySelector(".floor_nextBtn").addEventListener("click", () => {
            (V = (V + 1) % F()), G(), K();
        }),
        window.addEventListener("resize", () => (G(), window.innerWidth < 768 ? K() : clearInterval(Z))),
        document.querySelectorAll(".paymentEnquireBtn").forEach((e, t) => {
            e.addEventListener("click", () => {
                document.querySelectorAll(".payment-table-container")[t].classList.add("show-full");
            });
        });
});
