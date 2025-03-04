document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link"); // All nav links
    const indicator = document.querySelector(".nav-indicator"); // The moving dot

    window.addEventListener("scroll", () => {
        let sections = document.querySelectorAll("section");
        let scrollPosition = window.scrollY + window.innerHeight / 2; // On prend le milieu de l'écran
    
        sections.forEach((section) => {
            let sectionTop = section.offsetTop;
            let sectionBottom = sectionTop + section.offsetHeight;
    
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                let activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
    
                let { left, width } = activeLink.getBoundingClientRect();
                let navbarLeft = document.querySelector("nav ul").getBoundingClientRect().left;
                let newX = left - navbarLeft + width / 2 - 3;
    
                indicator.style.width = "4px";
                indicator.style.height = "4px";
                indicator.style.transform = `translateX(${newX}px)`;
    
                setTimeout(() => {
                    indicator.style.width = "6px";
                    indicator.style.height = "2px";
                }, 250);
    
                navLinks.forEach((link) => link.classList.remove("active"));
                activeLink.classList.add("active");
            }
        });
    });
    // Initialize the indicator position on load
    let activeLink = document.querySelector(".nav-link.active");
    console.log(activeLink);
    
    if (activeLink) {
        let { left, width } = activeLink.getBoundingClientRect();
        let navbarLeft = document.querySelector("nav ul").getBoundingClientRect().left;
        indicator.style.transform = `translateX(${left - navbarLeft + width / 2 - 3}px)`;
    }
});

document.querySelectorAll(".projectCard").forEach((card) => {
    card.addEventListener("click", (event) => {
        const url = card.getAttribute("data-url");
        if (url) {
            window.open(url, "_blank"); // Ouvre dans un nouvel onglet
        }
    });
});