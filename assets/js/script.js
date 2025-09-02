 // Function to set the theme and update UI
 function setTheme(theme) {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    var switchThemeBtn = document.getElementById('switchTheme');
    if (switchThemeBtn) {
        switchThemeBtn.innerHTML = theme === 'dark' ?  '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
    }
    //console.log(`Switched to ${theme} theme`);
}

var currentTheme = localStorage.getItem('theme') || 'dark';
setTheme(currentTheme);

// Event listener for the switch theme button
var switchThemeBtn = document.getElementById('switchTheme');
if (switchThemeBtn) {
    switchThemeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });
}

//AOS Initiliaze
AOS.init();

// Fixed Header & back to top button on Scroll
window.addEventListener('scroll', () => {
    // fixed header
    const header = document.getElementById('header');
    if (window.scrollY > 30 && !header.classList.contains('fixed-top')) {
        header.classList.add('fixed-top');
        document.getElementById('offcanvasNavbar').classList.add('fixedHeaderNavbar');
    } else if (window.scrollY <= 30 && header.classList.contains('fixed-top')) {
        header.classList.remove('fixed-top');
        document.getElementById('offcanvasNavbar').classList.remove('fixedHeaderNavbar');
    }

    //backtotop
    const backToTopButton = document.getElementById("backToTopButton");
    if (window.scrollY > 400 && backToTopButton.style.display === 'none') {
        backToTopButton.style.display = 'block';
    } else if (window.scrollY <= 400 && backToTopButton.style.display === 'block') {
        backToTopButton.style.display = 'none';
    }
});


//jumping to top function
function scrollToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//Testimonial Slider
$(document).ready(function(){
    $("#testimonial-slider").owlCarousel({
        items:3,
        nav:true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive:{
            0:{
                items:1,
            },
            768:{
                items:2,
            },
            1170:{
                items:3,
            }
        }
    });
});
const images = document.querySelectorAll(".kupal");

        images.forEach(img => {
            img.dataset.enlarged = "false"; // Store enlargement state in dataset

            img.addEventListener("click", () => {
                if (img.dataset.enlarged === "false") {
                    img.classList.add("enlarged");
                    img.dataset.enlarged = "true";
                } else {
                    img.classList.remove("enlarged");
                    img.dataset.enlarged = "false";
                }
            });
        });

        window.addEventListener("scroll", () => {
            images.forEach(img => {
                if (img.dataset.enlarged === "true") {
                    img.classList.remove("enlarged");
                    img.dataset.enlarged = "false";
                }
            });
        });
        const img = document.getElementById("image");
        let isEnlarged = false;

        img.addEventListener("click", () => {
            isEnlarged = !isEnlarged;
            img.style.transform = isEnlarged ? "scale(1.5)" : "scale(1)";
        });

        window.addEventListener("scroll", () => {
            if (isEnlarged) {
                img.style.transform = "scale(1)";
                isEnlarged = false;
            }
        });
        let isSectionVisible = false;
        
        function toggleSection() {
            const section = document.getElementById('extraSection');
            const header = document.getElementById('headerSection');
            if (isSectionVisible) {
                section.style.display = 'none';
                header.style.display = 'none';
                document.body.classList.remove("noscroll");
            } else {
                section.style.display = 'block';
                header.style.display = 'block';
                document.body.classList.add("noscroll");
            }
            isSectionVisible = !isSectionVisible;
        }

        function openFullscreen(element) {
            const imageSrc = element.querySelector('img').src;
            document.getElementById('fullscreenImage').src = imageSrc;
            document.getElementById('fullscreenContainer').style.display = 'flex';
        }

        function closeFullscreen() {
            document.getElementById('fullscreenContainer').style.display = 'none';
        }

        ;

        
