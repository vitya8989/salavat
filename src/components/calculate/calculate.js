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
}