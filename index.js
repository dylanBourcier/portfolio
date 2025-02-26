document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section"); // All sections
    const navLinks = document.querySelectorAll(".nav-link"); // All nav links
    const indicator = document.querySelector(".nav-indicator"); // The moving dot

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);

                    // Move the indicator to the active link
                    let { left, width } = activeLink.getBoundingClientRect();

                    let navbarLeft = document.querySelector("nav ul").getBoundingClientRect().left;
                    let newX = left - navbarLeft + width / 2 - 3;
                    
                    // Shrink the indicator during movement
                    indicator.style.width = "4px";
                    indicator.style.height = "4px";
                    indicator.style.transform = `translateX(${newX}px)`;

                    // Restore width after transition ends
                    setTimeout(() => {
                        indicator.style.width = "6px";
                        indicator.style.height = "2px";
                    }, 250);
                    indicator.style.transform = `translateX(${left - navbarLeft + width / 2 - 3}px)`;

                    // Remove "active" from all links & add to the correct one
                    navLinks.forEach((link) => link.classList.remove("active"));
                    activeLink.classList.add("active");
                }
            });
        },
        { root: null, threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    // Initialize the indicator position on load
    let activeLink = document.querySelector(".nav-link.active");
    if (activeLink) {
        let { left, width } = activeLink.getBoundingClientRect();
        let navbarLeft = document.querySelector(".navbar").getBoundingClientRect().left;
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