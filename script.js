function init(){
  gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
el: document.querySelector(".main"),
smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
scrollTop(value) {
  return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
}, 
getBoundingClientRect() {
  return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
},
pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

let mm = gsap.matchMedia();

  mm.add("(min-width: 501px)", () => {
    // Desktop animations
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top 50%",
        end: "top 0",
        scrub: 3,
      },
    });
    tl.to(".page1 h1", { x: 250 }, "anim");
    tl.to(".page1 h2", { x: -250 }, "anim");
    tl.to(".page1 video", { width: "90%" }, "anim");

    var tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top -70%",
        end: "top -120",
        scrub: 3,
      },
    });
    tl2.to(".main", { backgroundColor: "#fff" });
  });

  mm.add("(max-width: 500px)", () => {
    // Mobile animations
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top 27%",
        end: "top 0",
        scrub: 3,
      },
    })
    tl.to(".page1 h1", { x: -100 }, "anim");
    tl.to(".page1 h2", { x: 100 }, "anim");
    tl.to(".page1 video", { width: "80%" }, "anim");

    var tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top -20%",
        end: "top -100",
        scrub: 3,
      },
    });
    tl2.to(".main", { backgroundColor: "#fff" });
  });
}

init();

//page 3

let items = document.querySelectorAll('.expedition-card-section .expedition-card');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    
    let active = 3;
    function loadShow(){
        let stt = 0;
        items[active].style.transform = `none`;
        items[active].style.zIndex = 1;
        items[active].style.filter = 'none';
        items[active].style.opacity = 1;
        for(var i = active + 1; i < items.length; i++){
            stt++;
            items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
        stt = 0;
        for(var i = active - 1; i >= 0; i--){
            stt++;
            items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
    }
    loadShow();
    next.onclick = function(){
        active = active + 1 < items.length ? active + 1 : active;
        loadShow();
    }
    prev.onclick = function(){
        active = active - 1 >= 0 ? active - 1 : active;
        loadShow();
    }

//page 4

const carouselItems = document.querySelectorAll('.carousel-item');
const popup = document.getElementById('videoPopup');
const popupVideo = document.getElementById('popupVideo');
const closeButton = document.querySelector('.close');

// Video play on hover
carouselItems.forEach(item => {
  const video = item.querySelector('video');
  const playBtn = item.querySelector('.play-btn');

  item.addEventListener('mouseenter', () => {
    video.play();
    playBtn.style.display = 'none'; // Hide the play button
  });

  item.addEventListener('mouseleave', () => {
    video.pause();
    playBtn.style.display = 'flex'; // Show the play button
  });

  item.addEventListener('click', () => {
    popup.style.display = 'flex';
    popupVideo.src = video.src;
    popupVideo.play();
  });
});

// Close popup
closeButton.addEventListener('click', () => {
  popup.style.display = 'none';
  popupVideo.pause();
  popupVideo.src = ''; // Reset the video source
});

// Close popup when clicking outside of the popup content
popup.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none';
    popupVideo.pause();
    popupVideo.src = ''; // Reset the video source
  }
});

