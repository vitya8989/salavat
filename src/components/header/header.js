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

}