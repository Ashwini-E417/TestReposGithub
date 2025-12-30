let menubtn = document.getElementById("hamburger");
let sidebar = document.getElementById("sidebar");

menubtn.addEventListener("click",()=>{
    sidebar.classList.add("openSidebar");  
})

let menucloseBtn = document.getElementById("sidebar-close");
menucloseBtn.addEventListener("click",()=>{
    sidebar.classList.remove("openSidebar");
})

