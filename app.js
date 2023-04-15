function valueSetters() {
    gsap.set("#home .parent .child", { y: "100%" })
}

function revealToSpan() {
    document.querySelectorAll(".reveal").forEach(function (elem) {
        // do spans banane hai
        let parent = document.createElement("span");
        let child = document.createElement("span");

        // parent and child both set their respective classes
        parent.classList.add("parent");
        child.classList.add("child");

        // span parent gets child and child gets elem details
        child.textContent = elem.textContent;
        parent.appendChild(child);

        // elem replaces value with parent span
        elem.innerHTML = "";
        elem.appendChild(parent);
    });
}

function loaderAnimation() {
    var tl = gsap.timeline();

    tl
        .to("body", {
            overflow: "hidden"
        })

        .to("#base_black .parent .child", {
            y: "-100%",
            duration: 2,
            delay: 0,
            ease: Expo.easeInOut,
        })

        .to("#base_black", {
            height: 0,
            duration: 3,
            delay: -1,
            ease: Expo.easeInOut,
        })

        .to("#purple_loader", {
            height: "100%",
            duration: 3,
            delay: -3,
            ease: Expo.easeInOut,
            onComplete: function () {
                animateHomepage();
            }
        })

        .to("#white_loader", {
            height: "100%",
            duration: 3,
            delay: -2.6,
            ease: Expo.easeInOut,
        })

        .to("body", {
            overflow: "",
        })

        .from("#loop-container1", {
            opacity: 0,
            delay: .5,
        })

        .from("#about .parent2 .child2", {
            y: "100%",
            stagger: .1,
            delay: -1.5,
            duration: 1.5,
            ease: Expo.easeInOut,
        })

        .from("#loop-container2", {
            opacity: 0,
            delay: .5,
        })
}

function animateHomepage() {

    var tl = gsap.timeline();

    tl
        .to("#home #nav", {
            opacity: 100,
            duration: 1,
            ease: Expo.easeInOut,
        })
        .to("#home .parent .child", {
            y: 0,
            stagger: .1,
            duration: 1.5,
            ease: Expo.easeInOut,
        })
        .to(".photo", {
            opacity: 100,
            x: -100,
            delay: -1.2,
            duration: 1.5,
            ease: Expo.easeInOut,
        })
}

function heading() {
    class LoopingElement {
        constructor(element, currentTranslation, speed) {
            this.element = element;
            this.currentTranslation = currentTranslation;
            this.speed = speed;
            this.metric = 100;
            this.direction = true;
            this.scrollTop = 0;

            this.lerp = {
                current: this.currentTranslation,
                target: this.currentTranslation,
                factor: 0.2,
            };

            this.events();
            this.render();
        }

        events() {
            window.addEventListener("scroll", (e) => {
                let direction = window.pageYOffset || document.documentElement.scrollTop;

                if (direction > this.scrollTop) {
                    this.direction = true;
                    this.lerp.target += this.speed * 10;
                } else {
                    this.direction = false;
                    this.lerp.target -= this.speed * 10;
                }
                this.scrollTop = direction <= 0 ? 0 : direction;
            });
        }

        lerpFunc(current, target, factor) {
            this.lerp.current = current * (1 - factor) + target * factor;
        }

        right() {
            this.lerp.target += this.speed;
            if (this.lerp.target > this.metric) {
                this.lerp.current -= this.metric * 2;
                this.lerp.target -= this.metric * 2;
            }
        }

        left() {
            this.lerp.target -= this.speed;
            if (this.lerp.target < -this.metric) {
                this.lerp.current -= -this.metric * 2;
                this.lerp.target -= -this.metric * 2;
            }
        }

        animate() {

            this.direction ? this.right() : this.left();

            this.lerpFunc(this.lerp.current, this.lerp.target, this.lerp.factor);
            this.element.style.transform = `translateX(${this.lerp.current}%)`;
        }

        render() {
            this.animate();
            window.requestAnimationFrame(() => this.render());
        }
    }

    let element1 = document.querySelectorAll(".item1");

    new LoopingElement(element1[0], 0, 0.04);
    new LoopingElement(element1[1], -100, 0.04);

    let element2 = document.querySelectorAll(".item2");

    new LoopingElement(element2[0], 0, 0.04);
    new LoopingElement(element2[1], -100, 0.04);

    let element3 = document.querySelectorAll(".item3");

    new LoopingElement(element3[0], 0, 0.04);
    new LoopingElement(element3[1], -100, 0.04);
}

function cursor() {
    let innerCursor = document.querySelector(".inner-cursor");
    let outerCursor = document.querySelector(".outer-cursor");

    document.addEventListener('mousemove', moveCursor);

    function moveCursor(e) {
        let x = e.clientX;
        let y = e.clientY;

        innerCursor.style.left = `${x}px`;
        innerCursor.style.top = `${y}px`;
        outerCursor.style.left = `${x}px`;
        outerCursor.style.top = `${y}px`;
    }

    let links = Array.from(document.querySelectorAll("a"));

    links.forEach(
        link => {
            link.addEventListener('mouseover', () => {
                innerCursor.classList.add("grow");
            });
            link.addEventListener('mouseleave', () => {
                innerCursor.classList.remove("grow");
            });
        });
}

function jump() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}

cursor();
revealToSpan();
valueSetters();
loaderAnimation();
jump();
heading();