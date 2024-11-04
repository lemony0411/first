
$(function () {
  
  AOS.init();


  /* ********************시놉시스 배경색 변경 시작******************** */
  let offBottm = $('.synopsis .bottom').offset().top - 300;
  let changePoint = $('main').offset().top - 200; // 배경색을 변경할 스크롤 위치(px)
  function scrollBgChange(offBottm, changePoint) {
    const scrollPosition = window.scrollY; // 현재 스크롤된 위치
    if (scrollPosition >= changePoint && scrollPosition < offBottm) {
      document.querySelector('main .synopsis').classList.add('on'); // 배경색을 변경
    } else {
      document.querySelector('main .synopsis').classList.remove('on');// 기본 배경색
    }
  }
  window.addEventListener('scroll', function () {
    scrollBgChange(offBottm, changePoint);
  });
  $(window).resize(function () {
    offBottm = $('.synopsis .bottom').offset().top - 300;
    changePoint = $('main').offset().top - 200;
    scrollBgChange(offBottm, changePoint);
  });

  /* ********************시놉시스 배경색 변경 끝******************** */


  /* ********************눈내리는 효과 시작******************** */
  const canvas = $('.snow')[0];
  const context = canvas.getContext('2d');

  // 캔버스의 초기 너비와 높이를 설정합니다.
  let canvasWidth = $('.snow_wrap').width();
  let canvasHeight = $('.snow_wrap').height();
  let lastDeviceType = window.innerWidth > 768 ? 'desktop' : (window.innerWidth < 360 ? 'mobie' : 'tablet');

  // 눈송이 파티클을 생성하는 함수입니다.
  function createParticles() {
    // 기존 파티클을 삭제하고 새 파티클을 생성합니다.
    snowParticles = [];
    // 디바이스에 따라 파티클 수를 조정합니다.
    const particleCount = lastDeviceType === 'desktop' ? 80 : (lastDeviceType === 'tablet' ? 40 : 20);
    for (let i = 0; i < particleCount; i++) {
      snowParticles.push(new createParticle());
    }
  }
  function setCanvasSize() {
    offBottm = $('.synopsis .bottom').offset().top - 100;
    scrollBgChange(offBottm, changePoint);
    const currentDeviceType = window.innerWidth > 768 ? 'desktop' : (window.innerWidth < 360 ? 'mobie' : 'tablet');
    // 디바이스가 변경되면 새로운 파티클을 생성합니다.
    if (currentDeviceType !== lastDeviceType) {
      lastDeviceType = currentDeviceType;
      createParticles();
    }
    // 임시 캔버스를 사용하여 현재 내용을 저장합니다.
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvasWidth;
    tempCanvas.height = canvasHeight;
    tempCtx.drawImage(canvas, 0, 0);

    // 캔버스의 크기를 재설정합니다.
    canvasWidth = $('.snow_wrap').width();
    canvasHeight = $('.snow_wrap').height();
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 임시 캔버스의 내용을 원래 캔버스에 복원합니다.
    context.drawImage(tempCanvas, 0, 0);
  }

  // 눈송이 파티클을 저장할 배열입니다.
  let snowParticles = [];

  // 개별 눈송이 파티클을 생성하는 생성자 함수입니다.
  function createParticle() {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = Math.random() * 7 - 2;
    this.vy = Math.random() * 7 + 6;
    this.color = `rgba(255, 255, 255, ${Math.random()})`;
    this.radius = Math.random() * 3 + 2;
  }

  // 눈송이 파티클을 그리는 함수입니다.
  function draw() {
    context.clearRect(0, 0, canvasWidth, canvasHeight); // 캔버스를 지웁니다.
    snowParticles.forEach(function (particle) {
      context.beginPath();
      let gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius);
      gradient.addColorStop(1, particle.color);
      gradient.addColorStop(1, "rgb(166, 166, 166)");
      context.fillStyle = gradient;
      context.arc(particle.x, particle.y, particle.radius, Math.PI * 2, false);
      context.fill();
      // 파티클 위치 업데이트
      particle.x += particle.vx;
      particle.y += particle.vy;
      // 파티클이 캔버스 밖으로 나가면 반대편에서 다시 시작
      if (particle.x < -50) particle.x = canvasWidth + 50;
      if (particle.y < -50) particle.y = canvasHeight + 50;
      if (particle.x > canvasWidth + 50) particle.x = -50;
      if (particle.y > canvasHeight + 50) particle.y = -50;
    });
  }

  // 창 크기가 변경될 때마다 캔버스 크기를 조정합니다.
  $(window).resize(setCanvasSize);
  setCanvasSize(); // 초기 캔버스 크기를 설정합니다.
  createParticles(); // 초기 파티클을 생성합니다.
  setInterval(draw, 33); // 33ms 간격으로 눈송이 애니메이션을 시작합니다.

  /* ********************눈내리는 효과 끝******************** */



  let review_allswiper = new Swiper(".review_all", {
    slidesPerView: 'auto',
    spaceBetween: 0,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      431: {
        slidesPerView: 3.04,
        spaceBetween: 20,
        slideOffsetBefore: 20,
      }
    }
  });


  let listswiper = new Swiper(".list", {
    slidesPerView: 1,
    pagination: {
      el: ".list .swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  let listswiperNum = new Swiper(".list", {
    pagination: {
      el: ".list .fraction",
      type: "fraction",
    },
  });
  listswiper.controller.control = listswiperNum;




  /* 오디오시작 */

  const playBtn = document.getElementById("play");
  const audio = document.getElementById("audio");

  function loadSong(song) {
    title.innerText = song;
    audio.src = `http://127.0.0.1:5500/music/${song}.mp3`;
    imgCover.src = `http://127.0.0.1:5500/images/${song}.jpg`;
  }

  function playMusic() {
    musicContainer.classList.add("play");

    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;

    audio.play();
  }

  function pauseMusic() {
    musicContainer.classList.remove('play');
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;

    audio.pause();
  }

  playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });
  /* 오디오 끝 */


  /* *******************캐릭터 남자 여자 클릭 이벤트 시작******************* */

  let imgSrc = ['img/women_gray.png','img/men_gray.png'];
  let imgSrcOn = ['img/women.png','img/men.png'];
  $('.mini_c > div').click(function () {
    let i = $(this).index();
    $('.characters .wrap >div').removeClass('on').eq(i).addClass('on')
    $(this).find('img').attr('src',imgSrcOn[i]);
    let si = $(this).siblings().find('img').attr('src');
    $(this).siblings().find('img').attr({'src':si.replace('.png','_gray.png')})
  });




  // $('.mini_c .women').click(function(){
  //   $('.wrap .women').addClass('on').siblings().removeClass('on');
  //   $(this).children().css("opacity","0").siblings().children().css("opacity","100%")
  // });

  // $('.mini_c .men').click(function(){
  //   $('.wrap .men').addClass('on').siblings().removeClass('on');
  //   $(this).children().css("opacity","0").siblings().children().css("opacity","100%")
  // })

  /* *******************캐릭터 남자 여자 클릭 이벤트 끝******************* */






  /* *******************시놉시스 줄거리 이벤트 시작******************* */

// ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

// .main_frame을 스크롤할 때 고정
gsap.to("main .main_frame", {
  scrollTrigger: {
    trigger: "main .img_box",
    start: "top top",     // 화면 상단에 닿을 때 시작
    end: "+=1200",        // 스크롤 길이 설정
    pin: true,            // 고정 설정
    pinSpacing: false,    // 고정된 요소에 여백 추가 방지
    scrub: true
  }
});


const imgBoxImg = document.querySelector(".img_box img");
// 각 .main_txt li 요소에 ScrollTrigger와 슬라이딩 애니메이션 추가
gsap.utils.toArray(".main_txt li").forEach((li, i) => {
  const liImgSrc = li.querySelector("img").src;  // 각 li의 이미지 src 가져오기
  gsap.to(li, {
    scrollTrigger: {
      trigger: li,
      start: "top center",       // li가 화면의 80% 위치에 도달하면 시작
      toggleClass: "on",
      scrub: true,
    },
    y: -50,                   // 왼쪽에서 시작
    opacity: 0,                // 투명도 0에서 시작
    duration: 1,               // 애니메이션 지속 시간
    ease: "power2.out",       // 자연스러운 애니메이션 효과
  });


  // .img_box의 이미지 src를 변경
  // li가 on 상태가 될 때 .img_box의 img src와 페이드 효과 변경
  ScrollTrigger.create({
    trigger: li,
    start: "top center",
    onEnter: () => {
      gsap.to(imgBoxImg, {
        opacity: 0, duration: 0.1, onComplete: () => {
          imgBoxImg.src = liImgSrc;
          gsap.to(imgBoxImg, { opacity: 1, duration: 0.1 });
        }
      });
    },
    onLeaveBack: () => {
      gsap.to(imgBoxImg, {
        opacity: 0, duration: 0.1, onComplete: () => {
          imgBoxImg.src = liImgSrc;
          gsap.to(imgBoxImg, { opacity: 1, duration: 0.1 });
        }
      });
    }
  });
});

/* ******************************************* */


bottomImages.forEach((img, index) => {
  if (index > 0) { // 첫 번째 이미지를 제외한 나머지를 숨김
    gsap.set(img, { opacity: 0 });
  }

  gsap.to(img, {
    scrollTrigger: {
      trigger: ".bottom", // 스크롤 트리거 설정
      start: "top center+=" + (index * 100), // 이미지 변경 위치 조정
      toggleActions: "play none none reverse", // 스크롤 방향에 따른 이미지 보임/숨김
      scrub: true,
    },

    
  });
});


// /* *******************시놉시스 줄거리 이벤트 끝******************* */
});


