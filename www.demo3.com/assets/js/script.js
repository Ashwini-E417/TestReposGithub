$(document).ready(function() {

    // Initialize AOS (Animate on Scroll)
    AOS.init();

    // Initialize Magnify Plugin
    $('.magnify-image, .magnify-image2').magnify({
        speed: 200,
    });

    // Initialize Main Amenities Owl Carousel
    const amenitiesCarousel = $('.owl-carousel.owl-theme');
    amenitiesCarousel.owlCarousel({
        loop: true,
        margin: 30,
        stagePadding: 20,
        center: true,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 1000,
        nav: true,
        navText: [
            '<iconify-icon icon="grommet-icons:link-previous"></iconify-icon>',
            '<iconify-icon icon="grommet-icons:link-next"></iconify-icon>'
        ],
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    });

    // Initialize Floorplan Owl Carousel
    const floorplanCarousel = $('.floorowl-carousel');
    floorplanCarousel.owlCarousel({
        loop: true,
        margin: 20,
        stagePadding: 20,
        center: true,
        autoplay: false,
        smartSpeed: 1000,
        nav: false,
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    });

    // Custom Navigation for Floorplan Carousel
    $('.owl-prevone').on('click', function() {
        floorplanCarousel.trigger('prev.owl.carousel');
    });
    $('.owl-nextone').on('click', function() {
        floorplanCarousel.trigger('next.owl.carousel');
    });

    // Initialize Swiper for Mobile Slider
    const swiper = new Swiper(".swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // Initialize FancyBox
    $('[data-fancybox]').fancybox({
        buttons: ["zoom", "fullScreen", "close"],
        loop: true,
    });

    // Counter-Up Animation
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    // Proximity Section Hover Logic
    $('.legend-item').on('mouseenter', function() {
        const imageClasses = ['School', 'Corporates', 'Retail', 'Hospitals', 'Metro'];
        const index = $(this).index() - 1;
        const targetClass = imageClasses[index];

        $('.connectcontainer img').removeClass('visible').addClass('hidden');
        $(`.connectcontainer .${targetClass}`).removeClass('hidden').addClass('visible');
    }).on('mouseleave', function() {
        $('.connectcontainer img').removeClass('visible').addClass('hidden');
        $('.connectcontainer .mainimg').removeClass('hidden').addClass('visible');
    });

    // Vertical Scroll Section Logic (Desktop)
    if (window.innerWidth >= 1024) {
        const sections = document.querySelectorAll(".vertical-slider .content-wrapper");
        const images = document.querySelectorAll(".vertical-slider .image-wrapper");
        const dots = document.querySelectorAll(".vertical-slider .dot");
        const fillLine = document.querySelector(".nav-dots-fill");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const index = parseInt(entry.target.dataset.index);
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    images.forEach(img => img.classList.remove("show"));
                    if (images[index]) {
                        images[index].classList.add("show");
                    }
                    dots.forEach(dot => dot.classList.remove("active"));
                    if (dots[index]) {
                        dots[index].classList.add("active");
                    }
                    // Update fill line
                    const activeDot = dots[index];
                    const containerTop = activeDot.parentElement.getBoundingClientRect().top;
                    const dotCenter = activeDot.getBoundingClientRect().top + activeDot.offsetHeight / 2;
                    fillLine.style.height = `${dotCenter - containerTop}px`;
                } else {
                    entry.target.classList.remove("in-view");
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));

        dots.forEach(dot => {
            dot.addEventListener("click", () => {
                const index = parseInt(dot.dataset.index);
                sections[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
    }

    // Popup Modal Logic
    // Show modal on page load
    $('#popupModal').modal('show');
    
    // Show modal on button click
    $('.inquireButtonnew').on('click', function(e) {
        e.preventDefault();
        $('#popupModal').modal('show');
    });
    
    // Logic for floorplan popups (if form needs to be shown first)
    $(".plan-popup-open").on("click", function(e) {
        e.preventDefault();
        $('#popupModal').modal('show');
        // You can add logic here to open fancybox only after form submission
    });

    // Form Validation
    $("#floating_Form, #popupform").each(function() {
        $(this).validate({
            rules: {
                name: "required",
                email: { required: true, email: true },
                phone: { required: true, number: true, minlength: 10 }
            },
            messages: {
                name: "Please enter your name",
                email: "Please enter a valid email",
                phone: "Please enter a valid 10-digit phone number"
            },
            submitHandler: function(form) {
                // On successful validation, you can handle form submission here
                // For example, show a thank you message or send data via AJAX
                alert("Thank you for your enquiry!");
                $('#popupModal').modal('hide'); 
                // In a real scenario, you would prevent default and use AJAX.
                // form.submit(); 
                return false; // Prevents actual form submission for this demo
            }
        });
    });

    // International Phone Input
    const phoneInputs = document.querySelectorAll("input[type='tel']");
    phoneInputs.forEach(input => {
        window.intlTelInput(input, {
            initialCountry: "in",
            separateDialCode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });
    });
});







//////////////////////////////////////////
//AMENITIES JS
//////////////////////////////////////////
/*class AmenitiesCarousel {
    constructor() {
        // Get the original slides
        this.originalSlides = Array.from(document.querySelectorAll('.amenities-slide'));
        this.amenitiesTotalSlides = this.originalSlides.length;

        // Store data for lightbox
        this.amenitiesImages = [];
        this.amenitiesTexts = [];

        // Extract data from original slides
        this.originalSlides.forEach(slide => {
            const img = slide.querySelector('.amenities-image');
            const text = slide.querySelector('.amenities-text-overlay');
            this.amenitiesImages.push(img.src);
            this.amenitiesTexts.push(text.textContent);

            // Add error handling for images
            img.onerror = () => {
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3MjhEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
            };
        });

        // Setup carousel variables
        this.amenitiesCurrentIndex = 0;
        this.amenitiesTrack = document.getElementById('amenitiesTrack');
        // this.amenitiesDotsContainer = document.getElementById('amenitiesDots');
        this.amenitiesPrevBtn = document.getElementById('amenitiesPrev');
        this.amenitiesNextBtn = document.getElementById('amenitiesNext');
        this.amenitiesAutoPlayInterval = null;
        this.amenitiesIsTransitioning = false;

        // Calculate starting position for seamless infinite scroll
        this.amenitiesPosition = this.amenitiesTotalSlides;

        // Lightbox elements
        this.amenitiesLightbox = document.getElementById('amenitiesLightbox');
        this.amenitiesLightboxImage = document.getElementById('amenitiesLightboxImage');
        this.amenitiesLightboxClose = document.getElementById('amenitiesLightboxClose');
        this.amenitiesLightboxPrev = document.getElementById('amenitiesLightboxPrev');
        this.amenitiesLightboxNext = document.getElementById('amenitiesLightboxNext');
        this.amenitiesLightboxCounter = document.getElementById('amenitiesLightboxCounter');
        this.amenitiesLightboxTitle = document.getElementById('amenitiesLightboxTitle');
        this.amenitiesLightboxCurrentIndex = 0;

        // Initialize the carousel
        this.amenitiesInit();
    }

    amenitiesInit() {
        // Clone slides for infinite effect
        this.amenitiesCloneSlides();

        // Create dots
        // this.amenitiesCreateDots();

        // Bind events
        this.amenitiesBindEvents();
        this.amenitiesBindLightboxEvents();

        // Position the carousel
        this.amenitiesUpdateCarousel();

        // Start autoplay
        this.amenitiesStartAutoPlay();
    }

    amenitiesCloneSlides() {
        // Create clones for infinite scrolling effect
        const fragmentStart = document.createDocumentFragment();
        const fragmentEnd = document.createDocumentFragment();

        // Clone first 3 slides to the end
        for (let i = 0; i < 3; i++) {
            const clone = this.originalSlides[i].cloneNode(true);
            fragmentEnd.appendChild(clone);
        }

        // Clone last 3 slides to the beginning
        for (let i = this.amenitiesTotalSlides - 3; i < this.amenitiesTotalSlides; i++) {
            const clone = this.originalSlides[i].cloneNode(true);
            fragmentStart.appendChild(clone);
        }

        // Append clones to track
        this.amenitiesTrack.prepend(fragmentStart);
        this.amenitiesTrack.appendChild(fragmentEnd);

        // Setup image click events for all slides
        this.amenitiesSetupImageClickEvents();
    }

    amenitiesSetupImageClickEvents() {
        const slides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
        slides.forEach((slide, index) => {
            const img = slide.querySelector('.amenities-image');
            // Remove previous event listener to prevent duplicates
            const newImg = img.cloneNode(true);
            img.parentNode.replaceChild(newImg, img);

            // Add the new event listener
            newImg.addEventListener('click', () => {
                let originalIndex = index - 3;
                if (originalIndex < 0) {
                    originalIndex = this.amenitiesTotalSlides + originalIndex;
                } else if (originalIndex >= this.amenitiesTotalSlides) {
                    originalIndex = originalIndex - this.amenitiesTotalSlides;
                }
                this.openAmenitiesLightbox(originalIndex);
            });
        });
    }

    // amenitiesCreateDots() {
    //     for (let i = 0; i < this.amenitiesTotalSlides; i++) {
    //         const amenitiesDot = document.createElement('button');
    //         amenitiesDot.className = 'amenities-dot';
    //         amenitiesDot.addEventListener('click', () => this.amenitiesGoToSlide(i));
    //         this.amenitiesDotsContainer.appendChild(amenitiesDot);
    //     }
    // }

    amenitiesBindEvents() {
        this.amenitiesPrevBtn.addEventListener('click', () => this.amenitiesPrevSlide());
        this.amenitiesNextBtn.addEventListener('click', () => this.amenitiesNextSlide());

        // Touch events for mobile
        let amenitiesStartX = 0;
        let amenitiesEndX = 0;

        this.amenitiesTrack.addEventListener('touchstart', (e) => {
            amenitiesStartX = e.touches[0].clientX;
        }, {
            passive: true
        });

        this.amenitiesTrack.addEventListener('touchend', (e) => {
            amenitiesEndX = e.changedTouches[0].clientX;
            const amenitiesDiff = amenitiesStartX - amenitiesEndX;

            if (Math.abs(amenitiesDiff) > 50) {
                if (amenitiesDiff > 0) {
                    this.amenitiesNextSlide();
                } else {
                    this.amenitiesPrevSlide();
                }
            }
        }, {
            passive: true
        });

        // Pause autoplay on hover
        this.amenitiesTrack.addEventListener('mouseenter', () => this.amenitiesStopAutoPlay());
        this.amenitiesTrack.addEventListener('mouseleave', () => this.amenitiesStartAutoPlay());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.amenitiesPrevSlide();
            } else if (e.key === 'ArrowRight') {
                this.amenitiesNextSlide();
            } else if (e.key === 'Escape' && this.amenitiesLightbox.classList.contains('active')) {
                this.closeAmenitiesLightbox();
            }
        });
    }

    amenitiesBindLightboxEvents() {
        // Close lightbox events
        this.amenitiesLightboxClose.addEventListener('click', () => this.closeAmenitiesLightbox());
        this.amenitiesLightbox.addEventListener('click', (e) => {
            if (e.target === this.amenitiesLightbox) {
                this.closeAmenitiesLightbox();
            }
        });

        // Lightbox navigation
        this.amenitiesLightboxPrev.addEventListener('click', () => this.amenitiesLightboxPrevImage());
        this.amenitiesLightboxNext.addEventListener('click', () => this.amenitiesLightboxNextImage());
    }

    openAmenitiesLightbox(index) {
        console.log(index);
        this.amenitiesLightboxCurrentIndex = index;
        this.amenitiesLightboxImage.src = this.amenitiesImages[index];
        this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[index];
        this.updateAmenitiesLightboxCounter();
        this.amenitiesLightbox.classList.add('active');
        this.amenitiesStopAutoPlay();
        document.body.style.overflow = 'hidden';
    }

    closeAmenitiesLightbox() {
        this.amenitiesLightbox.classList.remove('active');
        this.amenitiesStartAutoPlay();
        document.body.style.overflow = 'auto';
    }

    amenitiesLightboxPrevImage() {
        this.amenitiesLightboxCurrentIndex = (this.amenitiesLightboxCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides;
        this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex];
        this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex];
        this.updateAmenitiesLightboxCounter();
    }

    amenitiesLightboxNextImage() {
        this.amenitiesLightboxCurrentIndex = (this.amenitiesLightboxCurrentIndex + 1) % this.amenitiesTotalSlides;
        this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex];
        this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex];
        this.updateAmenitiesLightboxCounter();
    }

    updateAmenitiesLightboxCounter() {
        this.amenitiesLightboxCounter.textContent = `${this.amenitiesLightboxCurrentIndex + 1} / ${this.amenitiesTotalSlides}`;
    }

    amenitiesUpdateCarousel() {
        const amenitiesSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
        // const amenitiesDots = this.amenitiesDotsContainer.querySelectorAll('.amenities-dot');

        // Calculate which slide is in the center
        const amenitiesIsMobile = window.innerWidth <= 576;
        const amenitiesCenterIndex = amenitiesIsMobile ?
            this.amenitiesPosition + 1 :
            this.amenitiesPosition + 1;

        // Update center slide highlighting
        amenitiesSlides.forEach((slide, index) => {
            slide.classList.remove('amenities-center');
            if (index === amenitiesCenterIndex) {
                slide.classList.add('amenities-center');
            }
        });

        // Update active dot
        // amenitiesDots.forEach((dot, index) => {
        //     dot.classList.remove('amenities-active');
        //     if (index === this.amenitiesCurrentIndex) {
        //         dot.classList.add('amenities-active');
        //     }
        // });

        // Move carousel
        const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
        const amenitiesTranslateX = -(this.amenitiesPosition * amenitiesSlideWidth);
        this.amenitiesTrack.style.transform = `translateX(${amenitiesTranslateX}%)`;
    }

    amenitiesNextSlide() {
        if (this.amenitiesIsTransitioning) return;
        this.amenitiesIsTransitioning = true;

        this.amenitiesPosition++;
        this.amenitiesCurrentIndex = (this.amenitiesCurrentIndex + 1) % this.amenitiesTotalSlides;

        this.amenitiesUpdateCarousel();

        // Reset position for seamless infinite scroll
        setTimeout(() => {
            const totalSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide').length;
            if (this.amenitiesPosition >= totalSlides - 3) {
                this.amenitiesTrack.style.transition = 'none';
                this.amenitiesPosition = 3;

                const amenitiesIsMobile = window.innerWidth <= 576;
                const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
                this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * amenitiesSlideWidth}%)`;

                setTimeout(() => {
                    this.amenitiesTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, 50);
            }
            this.amenitiesIsTransitioning = false;
        }, 600);
    }

    amenitiesPrevSlide() {
        if (this.amenitiesIsTransitioning) return;
        this.amenitiesIsTransitioning = true;

        this.amenitiesPosition--;
        this.amenitiesCurrentIndex = (this.amenitiesCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides;

        this.amenitiesUpdateCarousel();

        // Reset position for seamless infinite scroll
        setTimeout(() => {
            if (this.amenitiesPosition <= 0) {
                this.amenitiesTrack.style.transition = 'none';
                const totalSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide').length;
                this.amenitiesPosition = totalSlides - 6;
                const amenitiesIsMobile = window.innerWidth <= 576;
                const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
                this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * amenitiesSlideWidth}%)`;

                setTimeout(() => {
                    this.amenitiesTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, 50);
            }
            this.amenitiesIsTransitioning = false;
        }, 600);
    }

    amenitiesGoToSlide(index) {
        if (this.amenitiesIsTransitioning || index === this.amenitiesCurrentIndex) return;

        this.amenitiesIsTransitioning = true;

        // Calculate the difference
        const diff = index - this.amenitiesCurrentIndex;
        this.amenitiesPosition += diff;
        this.amenitiesCurrentIndex = index;

        this.amenitiesUpdateCarousel();

        setTimeout(() => {
            this.amenitiesIsTransitioning = false;
        }, 600);
    }

    amenitiesStartAutoPlay() {
        this.amenitiesStopAutoPlay();
        this.amenitiesAutoPlayInterval = setInterval(() => {
            this.amenitiesNextSlide();
        }, 5000);
    }

    amenitiesStopAutoPlay() {
        if (this.amenitiesAutoPlayInterval) {
            clearInterval(this.amenitiesAutoPlayInterval);
            this.amenitiesAutoPlayInterval = null;
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AmenitiesCarousel();
}); 
*/

class AmenitiesCarousel {
    constructor() {
        // Get the original slides
        this.originalSlides = Array.from(document.querySelectorAll('.amenities-slide'));
        this.amenitiesTotalSlides = this.originalSlides.length;

        // Store data for lightbox
        this.amenitiesImages = [];
        this.amenitiesTexts = [];

        // Extract data from original slides
        this.originalSlides.forEach(slide => {
            const img = slide.querySelector('.amenities-image');
            const text = slide.querySelector('.amenities-text-overlay');
            this.amenitiesImages.push(img.src);
            this.amenitiesTexts.push(text.textContent);

            // Add error handling for images
            img.onerror = () => {
                img.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3MjhEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
            };
        });

        // Setup carousel variables
        this.amenitiesCurrentIndex = 0;
        this.amenitiesTrack = document.getElementById('amenitiesTrack');
        this.amenitiesPrevBtn = document.getElementById('amenitiesPrev');
        this.amenitiesNextBtn = document.getElementById('amenitiesNext');
        this.amenitiesAutoPlayInterval = null;
        this.amenitiesIsTransitioning = false;

        // Calculate starting position for seamless infinite scroll
        this.amenitiesPosition = this.amenitiesTotalSlides;

        // Lightbox elements
        this.amenitiesLightbox = document.getElementById('amenitiesLightbox');
        this.amenitiesLightboxImage = document.getElementById('amenitiesLightboxImage');
        this.amenitiesLightboxClose = document.getElementById('amenitiesLightboxClose');
        this.amenitiesLightboxPrev = document.getElementById('amenitiesLightboxPrev');
        this.amenitiesLightboxNext = document.getElementById('amenitiesLightboxNext');
        this.amenitiesLightboxCounter = document.getElementById('amenitiesLightboxCounter');
        this.amenitiesLightboxTitle = document.getElementById('amenitiesLightboxTitle');
        this.amenitiesLightboxCurrentIndex = 0;

        // Initialize the carousel
        this.amenitiesInit();
    }

    amenitiesInit() {
        // Clone slides for infinite effect
        this.amenitiesCloneSlides();

        // Bind events
        this.amenitiesBindEvents();
        this.amenitiesBindLightboxEvents();

        // Position the carousel
        this.amenitiesUpdateCarousel();

        // Start autoplay
        this.amenitiesStartAutoPlay();
    }

    amenitiesCloneSlides() {
        const fragmentStart = document.createDocumentFragment();
        const fragmentEnd = document.createDocumentFragment();

        // Clone first 3 slides to the end
        for (let i = 0; i < 3; i++) {
            const clone = this.originalSlides[i].cloneNode(true);
            fragmentEnd.appendChild(clone);
        }

        // Clone last 3 slides to the beginning
        for (let i = this.amenitiesTotalSlides - 3; i < this.amenitiesTotalSlides; i++) {
            const clone = this.originalSlides[i].cloneNode(true);
            fragmentStart.appendChild(clone);
        }

        this.amenitiesTrack.prepend(fragmentStart);
        this.amenitiesTrack.appendChild(fragmentEnd);

        this.amenitiesSetupImageClickEvents();
    }

    amenitiesSetupImageClickEvents() {
        const slides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
        slides.forEach((slide, index) => {
            const img = slide.querySelector('.amenities-image');
            const newImg = img.cloneNode(true);
            img.parentNode.replaceChild(newImg, img);

            newImg.addEventListener('click', () => {
                let originalIndex = index - 3;
                if (originalIndex < 0) {
                    originalIndex = this.amenitiesTotalSlides + originalIndex;
                } else if (originalIndex >= this.amenitiesTotalSlides) {
                    originalIndex = originalIndex - this.amenitiesTotalSlides;
                }
                this.openAmenitiesLightbox(originalIndex);
            });
        });
    }

    amenitiesBindEvents() {
        this.amenitiesPrevBtn.addEventListener('click', () => this.amenitiesPrevSlide());
        this.amenitiesNextBtn.addEventListener('click', () => this.amenitiesNextSlide());

        // Touch events for mobile
        let amenitiesStartX = 0;
        let amenitiesEndX = 0;

        this.amenitiesTrack.addEventListener('touchstart', (e) => {
            amenitiesStartX = e.touches[0].clientX;
        }, { passive: true });

        this.amenitiesTrack.addEventListener('touchend', (e) => {
            amenitiesEndX = e.changedTouches[0].clientX;
            const amenitiesDiff = amenitiesStartX - amenitiesEndX;

            if (Math.abs(amenitiesDiff) > 50) {
                if (amenitiesDiff > 0) {
                    this.amenitiesNextSlide();
                } else {
                    this.amenitiesPrevSlide();
                }
            }
        }, { passive: true });

        // Pause autoplay on hover
        this.amenitiesTrack.addEventListener('mouseenter', () => this.amenitiesStopAutoPlay());
        this.amenitiesTrack.addEventListener('mouseleave', () => this.amenitiesStartAutoPlay());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.amenitiesPrevSlide();
            else if (e.key === 'ArrowRight') this.amenitiesNextSlide();
            else if (e.key === 'Escape' && this.amenitiesLightbox.classList.contains('active')) {
                this.closeAmenitiesLightbox();
            }
        });
    }

    amenitiesBindLightboxEvents() {
        this.amenitiesLightboxClose.addEventListener('click', () => this.closeAmenitiesLightbox());
        this.amenitiesLightbox.addEventListener('click', (e) => {
            if (e.target === this.amenitiesLightbox) this.closeAmenitiesLightbox();
        });
        this.amenitiesLightboxPrev.addEventListener('click', () => this.amenitiesLightboxPrevImage());
        this.amenitiesLightboxNext.addEventListener('click', () => this.amenitiesLightboxNextImage());
    }

    openAmenitiesLightbox(index) {
        this.amenitiesLightboxCurrentIndex = index;
        this.amenitiesLightboxImage.src = this.amenitiesImages[index];
        this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[index];
        this.updateAmenitiesLightboxCounter();
        this.amenitiesLightbox.classList.add('active');
        this.amenitiesStopAutoPlay();
        document.body.style.overflow = 'hidden';
    }

    closeAmenitiesLightbox() {
        this.amenitiesLightbox.classList.remove('active');
        this.amenitiesStartAutoPlay();
        document.body.style.overflow = 'auto';
    }

    amenitiesLightboxPrevImage() {
        this.amenitiesLightboxCurrentIndex = (this.amenitiesLightboxCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides;
        this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex];
        this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex];
        this.updateAmenitiesLightboxCounter();
    }

    amenitiesLightboxNextImage() {
        this.amenitiesLightboxCurrentIndex = (this.amenitiesLightboxCurrentIndex + 1) % this.amenitiesTotalSlides;
        this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex];
        this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex];
        this.updateAmenitiesLightboxCounter();
    }

    updateAmenitiesLightboxCounter() {
        this.amenitiesLightboxCounter.textContent =
            `${this.amenitiesLightboxCurrentIndex + 1} / ${this.amenitiesTotalSlides}`;
    }

    amenitiesUpdateCarousel() {
        const amenitiesSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide');

        const amenitiesIsMobile = window.innerWidth <= 576;
        const amenitiesCenterIndex = this.amenitiesPosition + 1;

        amenitiesSlides.forEach((slide, index) => {
            slide.classList.remove('amenities-center');
            if (index === amenitiesCenterIndex) {
                slide.classList.add('amenities-center');
            }
        });

        const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
        const amenitiesTranslateX = -(this.amenitiesPosition * amenitiesSlideWidth);
        this.amenitiesTrack.style.transform = `translateX(${amenitiesTranslateX}%)`;
    }

    amenitiesNextSlide() {
        if (this.amenitiesIsTransitioning) return;
        this.amenitiesIsTransitioning = true;

        this.amenitiesPosition++;
        this.amenitiesCurrentIndex = (this.amenitiesCurrentIndex + 1) % this.amenitiesTotalSlides;

        this.amenitiesUpdateCarousel();

        setTimeout(() => {
            const totalSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide').length;
            if (this.amenitiesPosition >= totalSlides - 3) {
                this.amenitiesTrack.style.transition = 'none';
                this.amenitiesPosition = 3;

                const amenitiesIsMobile = window.innerWidth <= 576;
                const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
                this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * amenitiesSlideWidth}%)`;

                setTimeout(() => {
                    this.amenitiesTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    this.amenitiesUpdateCarousel(); // ✅ re-apply center class after reset
                }, 50);
            }
            this.amenitiesIsTransitioning = false;
        }, 600);
    }

    amenitiesPrevSlide() {
        if (this.amenitiesIsTransitioning) return;
        this.amenitiesIsTransitioning = true;

        this.amenitiesPosition--;
        this.amenitiesCurrentIndex =
            (this.amenitiesCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides;

        this.amenitiesUpdateCarousel();

        setTimeout(() => {
            if (this.amenitiesPosition <= 0) {
                this.amenitiesTrack.style.transition = 'none';
                const totalSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide').length;
                this.amenitiesPosition = totalSlides - 6;
                const amenitiesIsMobile = window.innerWidth <= 576;
                const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
                this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * amenitiesSlideWidth}%)`;

                setTimeout(() => {
                    this.amenitiesTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    this.amenitiesUpdateCarousel(); // ✅ re-apply center class after reset
                }, 50);
            }
            this.amenitiesIsTransitioning = false;
        }, 600);
    }

    amenitiesGoToSlide(index) {
        if (this.amenitiesIsTransitioning || index === this.amenitiesCurrentIndex) return;

        this.amenitiesIsTransitioning = true;

        const diff = index - this.amenitiesCurrentIndex;
        this.amenitiesPosition += diff;
        this.amenitiesCurrentIndex = index;

        this.amenitiesUpdateCarousel();

        setTimeout(() => {
            this.amenitiesIsTransitioning = false;
        }, 600);
    }

    amenitiesStartAutoPlay() {
        this.amenitiesStopAutoPlay();
        this.amenitiesAutoPlayInterval = setInterval(() => {
            this.amenitiesNextSlide();
        }, 5000);
    }

    amenitiesStopAutoPlay() {
        if (this.amenitiesAutoPlayInterval) {
            clearInterval(this.amenitiesAutoPlayInterval);
            this.amenitiesAutoPlayInterval = null;
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AmenitiesCarousel();
});




