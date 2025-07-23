$(function () {
  var swiper = new Swiper(".con3_contents", {
    initialSlide: 1,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      scale: 0.8,
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });

  let filswiper = new Swiper(".con7_img", {
    slidesPerView: '6',
    loop: true,
    spaceBetween: 52,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
  });


  gsap.registerPlugin(ScrollTrigger);

  const path = document.getElementById("arrowPath");
  const tip = document.getElementById("arrowTip");
  const pathLength = path.getTotalLength();

  // 처음엔 선을 숨기기
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  // 트리거 생성
  ScrollTrigger.create({
    trigger: ".arrow-wrapper",
    start: "top 80%",
    onEnter: () => {
      // 선 다시 숨기고 애니메이션
      gsap.set(path, { strokeDashoffset: pathLength });
      gsap.set(tip, { opacity: 0 });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          // 선이 다 그려지고 나면 꼭지 보여줌
          gsap.to(tip, { opacity: 1, duration: 0.5 });
        }
      });
    },
    onEnterBack: () => {
      // 위에서 다시 내려올 때도 실행
      gsap.set(path, { strokeDashoffset: pathLength });
      gsap.set(tip, { opacity: 0 });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(tip, { opacity: 1, duration: 0.5 });
        }
      });
    }
  });
});