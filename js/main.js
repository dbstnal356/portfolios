$(function () {
  // 🔸 원형 인트로 애니메이션 
  gsap.set(".circle_overlay", { scale: 0, opacity: 0 });

  gsap.to(".circle_overlay", {
    scale: 1,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.5
  });

  gsap.to(".circle_overlay", {
    scale: 30,
    duration: 1.5,
    ease: "power2.inOut",
    delay: 2,
    onComplete: () => {
      document.querySelector("section.intro").style.display = "none";
      document.body.classList.add("show-main");
    }
  });

  // 🔸 me 이미지 타일 효과 
  const grid = document.getElementById("imageGrid");
  const rows = 6;
  const cols = 6;
  const tileWidth = 670 / cols;
  const tileHeight = 635 / rows;

  function createTiles() {
    grid.innerHTML = "";
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const tile = document.createElement("div");
        tile.style.width = `${tileWidth}px`;
        tile.style.height = `${tileHeight}px`;
        tile.style.backgroundPosition = `-${c * tileWidth}px -${r * tileHeight}px`;
        tile.style.animationDelay = `${(r + c) * 0.15}s`;
        grid.appendChild(tile);
      }
    }
  }

  const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        createTiles();
      }
    });
  }, { threshold: 0.5 });

  gridObserver.observe(grid);

  // 🔸 윤채원 타이핑 효과

  const typingText = document.querySelector('.typing_txt');
  const cursor = document.querySelector('.cursor');
  const textToType = '윤채원 Yun chae won';
  let isTyping = false;

  function startTyping() {
    if (isTyping) return;
    isTyping = true;
    typingText.textContent = '';//이전 텍스트 초기화
    cursor.style.display = 'inline-block'; //커서 다시 보이게
    let currentChar = 0;
    const typingInter = setInterval(() => {
      if (currentChar < textToType.length) {
        typingText.textContent += textToType[currentChar]; //한글자 추가
        currentChar++;
      } else {
        clearInterval(typingInter); //다 끝나면 멈춤
        cursor.style.display = 'none'; //커서 숨김
        isTyping = false; //타이핑 종료 표시
      }
    }, 100) //100ms 마다 글자 하나씩
  }

  ScrollTrigger.create({
    trigger: '.about_text',
    start: 'top 100%',
    onEnter: () => startTyping(),
    onEnterBack: () => startTyping(),
  });

  /* 스킬 부분 효과 (마우스 움직이면 배경이 움직이는 효과) */


  const LIMIT = 25;
  document.addEventListener('pointermove', ({ x, y }) => {
    const posX = gsap.utils.mapRange(0, window.innerWidth, LIMIT, -LIMIT, x);
    const posY = gsap.utils.mapRange(0, window.innerHeight, LIMIT, -LIMIT, y);
    gsap.set(document.documentElement, {
      '--x': posX,
      '--y': posY,
    });
  });






  // 🔸 텍스트 등장/퇴장 애니메이션
  gsap.registerPlugin(ScrollTrigger);

  const texts = gsap.utils.toArray(".text");

  texts.forEach((text, i) => {
    const enterAt = i * window.innerHeight;
    const leaveAt = (i + 1) * window.innerHeight;

    gsap.fromTo(text,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".spacer",
          start: () => `top+=${enterAt} top`,
          end: () => `top+=${leaveAt} top`,
          scrub: true,
        }
      }
    );

    gsap.to(text, {
      opacity: 0,
      y: -50,
      ease: "power2.in",
      scrollTrigger: {
        trigger: ".scroll-section",
        start: "center+=100",
        end: "bottom center",
        scrub: true,
      }
    });
  });

  // 🔽 이미지 & 텍스트 변화 효과 웹사이트 만든거 보여주는 곳
  const projectPanels = gsap.utils.toArray(".project_panel");
  const projectTexts = gsap.utils.toArray(".project_text");

  projectPanels.forEach((panel, i) => {
    ScrollTrigger.create({
      trigger: panel,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        projectTexts.forEach((text, j) => {
          text.style.opacity = j === i ? 1 : 0;
          text.style.zIndex = j === i ? 1 : 0;
        });
      },
      onEnterBack: () => {
        projectTexts.forEach((text, j) => {
          text.style.opacity = j === i ? 1 : 0;
          text.style.zIndex = j === i ? 1 : 0;
        });
      }
    });
  });











  // 🔸 가로 스크롤 섹션 애니메이션
  const horizontal = document.querySelector('.horizontal');
  const sections = gsap.utils.toArray('.horizontal > section');

  if (horizontal && sections.length > 0) {
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontal,
        start: 'top top',
        end: () => "+=" + (horizontal.offsetWidth - window.innerWidth),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,


      }
    });
  } else {
    console.warn("⚠️ .horizontal 또는 그 자식 section 요소를 찾을 수 없습니다.");
  }




  /* horizontal에 나타나는 첫 글자 반짝임 효과 */

  let index = 0,
    interval = 1000;

  const rand = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const animate = (star, svgColor) => {
    star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
    star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

    star.style.animation = "none";
    star.offsetHeight;
    star.style.animation = "";
  }

  for (const star of document.getElementsByClassName("magic-star")) {
    setTimeout(() => {
      const svgColor = star.querySelector("path");
      animate(star, svgColor);
      setInterval(() => animate(star, svgColor), 1000);
    }, index++ * (interval / 3));
  }








  /* contact 이메일 보내기  */

  emailjs.init("34W87O47WVeyfvqqP");

  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();
    emailjs.sendForm('service_4efhpyr', 'template_jdcdrf5', this)
      .then(function () {
        alert('메일이 성공적으로 발송되었습니다!');
      }, function (error) {
        alert('메일 발송 실패... ' + JSON.stringify(error));
      });
  });













});
