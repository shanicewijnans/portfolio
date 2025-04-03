window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    const load = document.querySelector(".loading");
    const loadingImage = document.querySelector(".loading-image");

    const images = [
        "assets/doodlecode.png",
        "assets/cacao.png",
        "assets/persoonlijk.png",
        "assets/storytree.png"
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];
    loadingImage.src = randomImage;

    gsap.to(load, {
        scale: 3,
        opacity: 0,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
            load.style.display = "none";
        }
    });
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
            y: -200,
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
        toggleActions: "play none none reverse",
    }
});






