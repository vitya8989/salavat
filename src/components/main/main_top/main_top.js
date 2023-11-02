const mainTop = document.querySelector('.main_top');

const mainTopBtn = document.querySelector('.js_main_top_btn');
if (mainTopBtn) {
    mainTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const scrollTarget = document.querySelector('.main_why');
        let topOffset = header.offsetHeight - 51;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;
        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
}
if (mainTop) {
   const secondBg = mainTop.querySelector('.main_top__second_bg');
   let startScale = 0.25;
   let endScroll;
   if (window.innerWidth >= 1024) {
       mainTop.style.height = `${window.innerHeight + 750}px`;
       endScroll = mainTop.getBoundingClientRect().bottom + window.pageYOffset - window.innerHeight;
   } else {
       mainTop.style.height = `${window.innerHeight}px`;
   }

   window.addEventListener('resize', () => {
       if (window.innerWidth >= 1024) {
           mainTop.style.height = `${window.innerHeight + 750}px`;
           endScroll = mainTop.getBoundingClientRect().bottom + window.pageYOffset - window.innerHeight;
       } else {
           mainTop.style.height = `${window.innerHeight}px`;
       }
   });

    if (window.innerWidth >= 1024 && window.pageYOffset > 0 && window.pageYOffset < endScroll) {
        secondBg.style.transform = `scale(${startScale + window.pageYOffset / 1000})`
    } else if (window.innerWidth >= 1024 && window.pageYOffset >= endScroll) {
        secondBg.style.transform = `scale(1)`;
    }

   window.addEventListener('scroll', () => {
       if (window.innerWidth >= 1024 && window.pageYOffset > 0 && window.pageYOffset < endScroll) {
           secondBg.style.transform = `scale(${startScale + window.pageYOffset / 1000})`
       } else if (window.innerWidth >= 1024 && window.pageYOffset >= endScroll) {
           secondBg.style.transform = `scale(1)`;
       }
   });
}