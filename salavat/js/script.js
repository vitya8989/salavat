const header = document.querySelector('.header');

if (header) {
    let scrollPos = 0;

    if (document.querySelector('.wrapper.this--main')) {
        document.addEventListener('slider-hide', () => {
            setTimeout(() => {
                window.addEventListener('scroll', toggleHeader);
            }, 500);
        });
        document.addEventListener('slider-show', () => {
            window.removeEventListener('scroll', toggleHeader);
        });
    } else if (document.querySelector('.wrapper.blue_header')) {
        window.addEventListener('scroll', toggleHeader);
        if (window.pageYOffset > 0) {
            header.classList.remove('this--transparent')
        } else {
            header.classList.add('this--transparent');
        }
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 0) {
                header.classList.remove('this--transparent')
            } else {
                header.classList.add('this--transparent')
            }
        });
    } else {
        window.addEventListener('scroll', toggleHeader);
    }


    function toggleHeader () {
        if (scrollPos > window.pageYOffset) {
            header.classList.remove('small');
        } else {
            header.classList.add('small');
        }
        scrollPos = window.pageYOffset;
    }

    const headerTopLinks = header.querySelector('.header__top_links');
    const headerTopLinksGroup = header.querySelector('.header__top_links_group');
    const headerMenu = header.querySelector('.header__menu');

    if (window.innerWidth <= 1023) {
        headerMenu.append(headerTopLinksGroup);
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1023) {
            headerMenu.append(headerTopLinksGroup);
        } else {
            headerTopLinks.append(headerTopLinksGroup);
        }
    });

    const burger = header.querySelector('.header__burger');
    const headerMenuClose = header.querySelector('.header__menu_close');

    burger.addEventListener('click', () => {
        headerMenu.classList.add('show');
        document.body.classList.add('this--overflow');
    });

    headerMenuClose.addEventListener('click', () => {
        headerMenu.classList.remove('show');
        document.body.classList.remove('this--overflow');
    });

};
const timeNode = document.querySelectorAll('.js_footer_time');

if (timeNode.length) {
    let timeZone = new Date().getTimezoneOffset();

    function getCurrentTimeString(dots, correction) {
        let date = new Date();
        date.setMinutes(date.getMinutes() + timeZone + correction);
        return date.toTimeString().replace(/:[0-9]{2,2} .*/, '');
    }

    timeNode.forEach((node) => {
        setInterval(function() {
            node.innerHTML = getCurrentTimeString(Math.round(Date.now() / 1000) % 2, 300);
        }, 1000);
    });
}

const footer = document.querySelector('.footer');

if (footer) {
    window.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('.trading-list')) {
            let id = setInterval(() => {
                if (document.querySelector('.trading-list').offsetHeight > 300) {
                    console.log(document.querySelector('.trading-list').offsetHeight)
                    clearInterval(id);
                    let startMove = footer.getBoundingClientRect().top + window.pageYOffset + footer.getBoundingClientRect().height / 2 - window.innerHeight;
                    if (window.pageYOffset >= startMove && window.innerWidth > 1023) {
                        footer.style.top = `${(window.pageYOffset - startMove) / 2}px`;
                    }
                    window.addEventListener('scroll', () => {
                        if (window.pageYOffset >= startMove && window.innerWidth > 1023) {
                            footer.style.top = `${(window.pageYOffset - startMove) / 2}px`;
                        }
                    });
                    window.addEventListener('resize', () => {
                        startMove = footer.getBoundingClientRect().top + window.pageYOffset + footer.getBoundingClientRect().height / 2 - window.innerHeight;
                    });
                }
            }, 700);
        } else {
            setTimeout(() => {
                let startMove = footer.getBoundingClientRect().top + window.pageYOffset + footer.getBoundingClientRect().height / 2 - window.innerHeight;
                window.addEventListener('resize', () => {
                    setTimeout(() => {
                        footer.style.top = '';
                        startMove = footer.getBoundingClientRect().top + window.pageYOffset + footer.getBoundingClientRect().height / 2 - window.innerHeight;
                    }, 200);
                });
                document.addEventListener('change-height', () => {
                    setTimeout(() => {
                        footer.style.top = '';
                        startMove = footer.getBoundingClientRect().top + window.pageYOffset + footer.getBoundingClientRect().height / 2 - window.innerHeight;
                    }, 200);
                });
                if (window.pageYOffset >= startMove && window.innerWidth > 1023) {
                    footer.style.top = `${(window.pageYOffset - startMove) / 2}px`;
                }
                window.addEventListener('scroll', () => {
                    if (window.pageYOffset >= startMove && window.innerWidth > 1023) {
                        footer.style.top = `${(window.pageYOffset - startMove) / 2}px`;
                    }
                });
            }, 200);
        }
    });

};

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
};
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
};
const mainFactory = document.querySelector('.main_factory');

if (mainFactory) {
    const mainFactoryWrapper = mainFactory.querySelector('.main_factory__wrapper');
    const mainFactoryImg = mainFactory.querySelector('.js_factory_img');
    let startFactorySliderPoint;
    let endFactorySliderPoint;
    window.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth > 1024) {
            setTimeout(() => {
                mainFactory.style.height = `${mainFactoryImg.scrollHeight}px`;
                startFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset;
                endFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset + mainFactory.offsetHeight - mainFactoryWrapper.offsetHeight;

                document.addEventListener('change-height', () => {
                    startFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset;
                    endFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset + mainFactory.offsetHeight - mainFactoryWrapper.offsetHeight;
                });
            }, 100);
        }

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > startFactorySliderPoint && window.pageYOffset < endFactorySliderPoint) {
                mainFactoryImg.style.top = `-${window.pageYOffset - startFactorySliderPoint}px`;
            }
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                mainFactory.style.height = `${mainFactoryImg.scrollHeight}px`;
                startFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset;
                endFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset + mainFactory.offsetHeight - mainFactoryWrapper.offsetHeight;
            }
        });
    });
};
const aboutTop = document.querySelector('.about_top');

if (aboutTop) {
   const dateSlider = new Swiper('.date_slider', {
        effect: 'fade',
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        autoHeight: true,
        fadeEffect: {
            crossFade: true,
        },
        pagination: {
            el: '.date_slider__pagination',
            clickable: true
        }

    });

    dateSlider.slideTo(dateSlider.slides.length - 1, 0);
    setTimeout(() => {
        dateSlider.slideTo(0, 0);
        dateSlider.update();
    }, 10);

    const teamCardSlider = new Swiper('.team_card__slider', {
        spaceBetween: 13,
        slidesPerView: 'auto',
    });
};
const onlyRus = document.querySelectorAll('.js_only_rus');
const onlyEng = document.querySelectorAll('.js_only_eng');
const onlyNumber = document.querySelectorAll('.js_only_number');

if (onlyRus.length > 0) {
    for (let i = 0; i < onlyRus.length; i++) {
        onlyRus[i].addEventListener('input', function () {
            this.value = this.value.replace(/[\w]/g, '');
        });
    }
}
if (onlyEng.length > 0) {
    for (let i = 0; i < onlyEng.length; i++) {
        onlyEng[i].addEventListener('input', function () {
            this.value = this.value.replace(/[а-яА-ЯёЁ]/g, '');
        });
    }
}
if (onlyNumber.length > 0) {
    for (let i = 0; i < onlyNumber.length; i++) {
        onlyNumber[i].addEventListener('input', function () {
            this.value = this.value.replace(/[^\d]/g, '');
        });
    }
}

if (document.querySelector('.js_tel_mask')) {
    $('.js_tel_mask').inputmask({
        mask: '+7 (999) 999-9999',
        showMaskOnHover: false
    });
}

const calculateForm = document.querySelector('.js_calculate_form');

if (calculateForm) {
    const calculateFormReqInputs = calculateForm.querySelectorAll('.js_required_input');

    calculateFormReqInputs.forEach((input) => {
        input.addEventListener('focus', () => {
            if (input.classList.contains('error')) {
                input.classList.remove('error');
            }
        });
    });

    const datepickerInput = calculateForm.querySelector('.js_datepicker');
    datepickerInput.addEventListener('input', () => {
        if (datepickerInput.value !== '') {
            datepickerInput.classList.add('filled');
        } else {
            datepickerInput.classList.remove('filled');
        }
    });

    const calculateFormAreas = calculateForm.querySelectorAll('.drop-area');
    calculateFormAreas.forEach((area) => {
        const fileInput = area.querySelector('input[type="file"]');
        const calculateFormFileClear = area.querySelector('.js_calculate_form_file_clear');

        fileInput.addEventListener('change', () => {
            fileInput.nextElementSibling.classList.add('active');
            fileInput.nextElementSibling.innerHTML = `файл: ${fileInput.files[0].name}`
            calculateFormFileClear.classList.add('show');
        });

        calculateFormFileClear.addEventListener('click', (e) => {
            e.stopPropagation();
            fileInput.value = '';
            fileInput.nextElementSibling.classList.remove('active');
            calculateFormFileClear.classList.remove('show');
            fileInput.nextElementSibling.innerHTML = `  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="20" viewBox="0 0 29 20" fill="none">
                                        <path d="M15.3822 19.1923V9.88464M15.3822 9.88464L17.9207 12M15.3822 9.88464L12.8438 12" stroke="#1D1D1D"/>
                                        <path d="M20.4615 19.1923H24.0577C26.5111 19.1923 28.5 17.2034 28.5 14.75V14.75C28.5 12.2966 26.5111 10.3077 24.0577 10.3077H23V8.61539C23 4.40953 19.5905 1 15.3846 1H14.5385C10.7999 1 7.76923 4.03069 7.76923 7.76923V7.76923H6.71154C3.55714 7.76923 1 10.3264 1 13.4808V13.4808C1 16.6352 3.55714 19.1923 6.71154 19.1923H10.7308" stroke="#1D1D1D"/>
                                    </svg>
                                    <p class="drop-area__text">прикрепите или перетащите файл<br>
                                        (формат: pdf , макс. размер: 2 Гб)</p>`
        });

        area.addEventListener('drop', handleDrop, false);
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            area.addEventListener(eventName, preventDefaults, false)
        });
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        function handleDrop(e) {
            let dt = e.dataTransfer;
            let files = dt.files;
            fileInput.files = files;
            fileInput.dispatchEvent(new Event('change'));
        }
    });

    $( ".js_datepicker" ).datepicker({
        onClose: () => {
            datepickerInput.dispatchEvent(new Event('input'));
        },
        firstDay: 1,
        dateFormat: "dd/mm/yy",
        monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ]
    });

    calculateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm(calculateForm)) {
            return;
        }
        // Отправка формы
        //
        calculateForm.reset();
    });

    function validateForm (form) {
        let valid = true;
        const validateInputs = form.querySelectorAll('.js_required_input');

        validateInputs.forEach((input) => {
            if (input.value === '') {
                valid = false;
                input.classList.add('error');
            }
            if (input.classList.contains('js_tel_mask') && input.value.indexOf('_') !== -1) {
                valid = false;
                input.classList.add('error');
            }
        });

        return valid;
    }
};
