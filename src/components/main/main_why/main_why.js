const mainWhy = document.querySelector('.main_why');

if (mainWhy) {
    const items = mainWhy.querySelector('.main_why__items');
    let startScroll;
    let endScroll;
    let coeff = 2;
    let space;
    let cardWidth = items.scrollWidth / items.querySelectorAll('.main_why__item').length;
    let translateCoeff = 1 / items.querySelectorAll('.main_why__item').length * (items.querySelectorAll('.main_why__item').length - 1);

    if (window.innerWidth > 1024) {
        space = 46;
    } else {
        space = 130;
    }

    if (window.innerWidth < cardWidth) {
        mainWhy.style.height = `${(items.scrollWidth + cardWidth - window.innerWidth + space) / coeff + window.innerHeight}px`;
    } else {
        mainWhy.style.height = `${(items.scrollWidth + space) / coeff + window.innerHeight}px`;
    }
    startScroll = mainWhy.getBoundingClientRect().top + window.pageYOffset;
    endScroll = mainWhy.getBoundingClientRect().bottom + window.pageYOffset - window.innerHeight;

    window.addEventListener('resize', () => {
        mainWhy.style.height = `${items.scrollWidth / coeff + window.innerHeight}px`;
        startScroll = mainWhy.getBoundingClientRect().top + window.pageYOffset;
        endScroll = mainWhy.getBoundingClientRect().bottom + window.pageYOffset - window.innerHeight;
        cardWidth = items.scrollWidth / items.querySelectorAll('.main_why__item').length;
        if (window.innerWidth > 1024) {
            space = 46;
        } else {
            space = 130;
        }
        if (window.innerWidth < cardWidth) {
            mainWhy.style.height = `${(items.scrollWidth - cardWidth + window.innerWidth + space) / coeff + window.innerHeight}px`;
        } else {
            mainWhy.style.height = `${(items.scrollWidth + space) / coeff + window.innerHeight}px`;
        }

    });

    if (window.pageYOffset > startScroll && window.pageYOffset <= endScroll) {
        items.style.transform = `translateX(-${(Math.floor(window.pageYOffset) - startScroll) * coeff * translateCoeff}px)`;
    }

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > startScroll && window.pageYOffset <= endScroll) {
            items.style.transform = `translateX(-${(Math.floor(window.pageYOffset) - startScroll) * coeff * translateCoeff}px)`;
        } else if (window.pageYOffset <= startScroll) {
            items.style.transform = `translateX(0)`;
        }
    });
}