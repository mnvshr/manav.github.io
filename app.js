function valueSetters() {
  gsap.set("#home .parent .child", { y: "100%" });
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

  tl.to("body", {
    overflow: "hidden",
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
      },
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
      delay: 0.5,
    })

    .from("#about .parent2 .child2", {
      y: "100%",
      stagger: 0.1,
      delay: -1.5,
      duration: 1.5,
      ease: Expo.easeInOut,
    })

    .from("#loop-container2", {
      opacity: 0,
      delay: 0.5,
    });
}

function animateHomepage() {
  var tl = gsap.timeline();

  tl.to("#home #nav", {
    opacity: 100,
    duration: 1,
    ease: Expo.easeInOut,
  })
    .to(".top-bar", {
      opacity: 100,
      duration: 1,
      ease: Expo.easeInOut,
    })
    .to("#home .parent .child", {
      y: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: Expo.easeInOut,
    })
    .to(".photo", {
      opacity: 100,
      x: -100,
      delay: -1.2,
      duration: 3,
      ease: Expo.easeInOut,
    });
}

// Variables
const el = document.querySelector(".item1");
const el2 = document.querySelector(".item2");
const el3 = document.querySelector(".item3");

// Variables ~ Widths
let elWidth = el.offsetWidth;
let windowWidth = window.innerWidth;

// Variables ~ Mouse
let mouseX = 0;
let prevMouseX = 0;

// Target: value we want to animate to
let skewTarget = 0;
let translateTarget = 0;

// WithEasing: value we use to animate
let skewWithEasing = 0;
let translateWithEasing = 0;

// EasingFactor: determines how quick the animation/interpolation goes
let skewEasingFactor = 0.1;
let translateEasingFactor = 0.1;

// Events
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", handleWindowResize);

// Functions
function handleMouseMove(e) {
  mouseX = e.pageX;
}

function handleWindowResize(e) {
  elWidth = el.offsetWidth;
  windowWidth = window.innerWidth;
}

function lerp(start, end, factor) {
  return (1 - factor) * start + factor * end;
}

function animateMe() {
  // Get difference between current and previous mouse position
  skewTarget = mouseX - prevMouseX;
  prevMouseX = mouseX;

  // Calc how much we need to translate our el
  translateTarget = ((elWidth - windowWidth) / windowWidth) * mouseX * -1;

  // Ease between start and target values (skew)
  skewWithEasing = lerp(skewWithEasing, skewTarget, skewEasingFactor);

  // Limit our skew to a range of 75 degrees so it doesn't "over-skew"
  skewWithEasing = Math.min(Math.max(parseInt(skewWithEasing), -75), 75);

  // Ease between start and target values (translate)
  translateWithEasing = lerp(
    translateWithEasing,
    translateTarget,
    translateEasingFactor
  );

  el.style.transform = `
    translateX(${translateWithEasing}px)
    skewX(${skewWithEasing}deg)
  `;
  el2.style.transform = `
    translateX(${translateWithEasing}px)
    skewX(${skewWithEasing}deg)
  `;
  el3.style.transform = `
    translateX(${translateWithEasing}px)
    skewX(${skewWithEasing}deg)
  `;

  // RAF
  window.requestAnimationFrame(animateMe);
}

window.requestAnimationFrame(animateMe);

function cursor() {
  let innerCursor = document.querySelector(".inner-cursor");
  let outerCursor = document.querySelector(".outer-cursor");

  document.addEventListener("mousemove", moveCursor);

  function moveCursor(e) {
    let x = e.clientX;
    let y = e.clientY;

    innerCursor.style.left = `${x}px`;
    innerCursor.style.top = `${y}px`;
    outerCursor.style.left = `${x}px`;
    outerCursor.style.top = `${y}px`;
  }

  let links = Array.from(document.querySelectorAll("a"));

  links.forEach(link => {
    link.addEventListener("mouseover", () => {
      innerCursor.classList.add("grow");
    });
    link.addEventListener("mouseleave", () => {
      innerCursor.classList.remove("grow");
    });
  });
}

function jump() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

cursor();
revealToSpan();
valueSetters();
loaderAnimation();
jump();
heading();
