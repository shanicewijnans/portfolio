gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    const load = document.querySelector(".loading");
    const loadingImage = document.querySelector(".loading-image");

    const images = [
        "assets/doodlecode.png",
        "assets/cacao.png",
        "assets/mycelium.png",
        "assets/storytree.png"
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];
    loadingImage.style.opacity = 0;
    loadingImage.src = randomImage;

    loadingImage.onload = () => {
        loadingImage.style.visibility = "visible";
        gsap.to(loadingImage, {
            opacity: 1,
            duration: 1,
            ease: "power2.inOut"
        });
        console.log("Image loaded, starting animation");
    };

    gsap.to(load, {
        scale: 3,
        opacity: 0,
        duration: 3,
        delay: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
            load.style.display = "none";
        }
    });
});

gsap.set(".kaartje, .kaartje2", {
    xPercent: -50,
    yPercent: -50
});

const counter = document.querySelector(".counter");

ScrollTrigger.create({
    trigger: ".pin",
    start: "top+=1% top",
    end: "bottom top",
    pin: true,
    scrub: true,
    onEnter: () => {
        const tl = gsap.timeline();
        tl.to(".kaartje", {
            y: -200,
            duration: 1,
            opacity: 0,
            ease: "power2.inOut",
            onComplete: () => {
                document.querySelector(".kaartje").style.zIndex = 1;
                document.querySelector(".kaartje2").style.zIndex = 2;
                counter.textContent = "2/2";
            }
        })
            .to(".kaartje", {
                y: 0,
                duration: 1,
                opacity: 1,
                ease: "power2.inOut"
            });
        gsap.to(".kaartje2", {
            y: 0,
            duration: 2,
            ease: "power2.inOut"
        });
    },
    onLeaveBack: () => {
        const tl = gsap.timeline();
        tl.to(".kaartje2", {
            y: 200,
            duration: 1,
            ease: "power2.inOut",
            opacity: 0,
            onComplete: () => {
                document.querySelector(".kaartje").style.zIndex = 2;
                document.querySelector(".kaartje2").style.zIndex = 1;
                counter.textContent = "1/2";
            }
        })
            .to(".kaartje2", {
                y: 0,
                duration: 1,
                opacity: 1,
                ease: "power2.inOut"
            });
        gsap.to(".kaartje", {
            y: 0,
            duration: 2,
            ease: "power2.inOut"
        });
    }
});

gsap.from(".postzegel", {
    opacity: 0,
    scale: 0.8,
    y: 100,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".flex",
        start: "top 50%",
        end: "top 20%",
        toggleActions: "play none none reverse"
    }
});

document.querySelectorAll('.postzegel').forEach(postzegel => {
    postzegel.addEventListener('mouseenter', () => {
        gsap.to(postzegel, {
            y: -10,
            duration: 0.3,
            ease: "power3.out"
        });
    });

    postzegel.addEventListener('mouseleave', () => {
        gsap.to(postzegel, {
            y: 0,
            duration: 0.3,
            ease: "power3.out"
        });
    });
});

document.querySelectorAll('.postzegel').forEach(postzegel => {
    postzegel.addEventListener('click', () => {
        const modalClass = postzegel.getAttribute('data-modal');
        const dialog = document.querySelector(`dialog.${modalClass}`);
        const envelop = dialog.querySelector('.envelop');
        const postzegelNieuw = dialog.querySelector('.postzegelNieuw');
        const images = dialog.querySelectorAll('img');

        dialog.showModal();

        if (scrollContainer) {
            const percentage = 50;
            scrollContainer.scrollLeft = (scrollContainer.scrollWidth - scrollContainer.clientWidth) * (percentage / 100);
        }

        images.forEach(image => {
            image.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        });

        document.addEventListener("DOMContentLoaded", () => {
            const videos = document.querySelectorAll('video');
            videos.forEach((video) => {
                video.removeAttribute('autoplay');
                video.pause();
                video.currentTime = 0;
            });
        });

        gsap.from(dialog, {
            x: -400,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(postzegelNieuw, {
            scale: 5,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
            delay: 1
        });

        dialog.addEventListener('click', (event) => {
            if (!envelop.contains(event.target)) {
                dialog.setAttribute('closing', '');
                gsap.to(dialog, {
                    x: 400,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    onComplete: () => {
                        dialog.close();
                        gsap.set(dialog, { x: 0, opacity: 1 });
                    }
                });
            }
        });
    });
});

window.onbeforeunload = (event) => {
    if (event.target.href.startsWith('mailto:')) {
        return;
    }
};

document.querySelectorAll('dialog').forEach(dialog => {
    const video = dialog.querySelector('video');
    const playButton = dialog.querySelector('.play');
    const fullscreenButton = dialog.querySelector('.fullscreen');

    if (video) {
        video.addEventListener('click', (event) => {
            event.stopPropagation();
            if (video.paused) {
                video.play();
                playButton.style.display = "none";
            } else {
                video.pause();
                playButton.style.display = "block";
            }
        });

        dialog.addEventListener('close', () => {
            video.pause();
            video.currentTime = 0;
            playButton.style.display = "block";
        });
    }

    if (video && playButton) {
        playButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (video.paused) {
                video.play();
                playButton.style.display = "none";
            } else {
                video.pause();
                playButton.style.display = "block";
            }
        });
    }

    if (video && fullscreenButton) {
        fullscreenButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        });
    }
})

const scrollContainer = document.querySelector('.scroll-container');

scrollContainer.addEventListener('wheel', (event) => {
    event.preventDefault();
    scrollContainer.scrollLeft += event.deltaX || event.deltaY;
});