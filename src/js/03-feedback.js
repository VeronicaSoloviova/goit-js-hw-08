const refs = {
    form: document.querySelector('.feedback-form')
}

import throttle from "lodash.throttle";

const STORAGE_KEY = "feedback-form-state";

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

initialForm();

function onFormInput(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function initialForm() {
    const initialValues = JSON.parse(localStorage.getItem(STORAGE_KEY));
    
    if (initialValues) {
        const { email, message } = refs.form.elements;
        email.value = initialValues.email || '';
        message.value = initialValues.message || '';
    }
}

function onFormSubmit(event) {
    event.preventDefault();
    const formInfo = new FormData(event.currentTarget);
    formInfo.forEach((value, key) => {
        formData[key] = value;
    });
    console.log(formData);
    formData = {}
    localStorage.removeItem(STORAGE_KEY);
    event.currentTarget.reset();
}
