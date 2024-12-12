'use strict';

import { select, getElement, listen } from "./utils.js";

const VALID_CHARS_REGEX = /^[a-zA-Z\s]{2,}$/;
const VALID_EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const dropdownBtn = select('.dropdown-btn');
const dropdownContent = select('.dropdown-content');
const modal = getElement('loginModal'); 
const modalOpen = select('.login'); 
const modalClose = select('.close'); 
const sendMessage = select('.send-message');
const name = getElement('name'); 
const email = getElement('email'); 
const subject = getElement('subject'); 
const message = getElement('message');
const output = select('.output');

dropdownBtn.addEventListener('click', function() {
    dropdownContent.classList.toggle('show');
});

listen('click', window, (event) => {
    if (!event.target.matches('.dropdown-btn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});

listen('click', modalOpen, (event) => { 
    event.preventDefault();
    modal.style.display = 'block'; 
    document.body.classList.add('modal-open');
}); 

listen('click', modalClose, () => { 
    modal.style.display = 'none'; 
    document.body.classList.remove('modal-open');
}); 

listen('click', window, (event) => { 
    if (event.target === modal) { 
        modal.style.display = 'none'; 
        document.body.classList.remove('modal-open'); 
    }    
});

listen('click', sendMessage, (event) => {
    event.preventDefault();
    const fields = [];
    output.innerText = "";

    if (!VALID_CHARS_REGEX.test(name.value)) {
        fields.push('Name');        
    }

    if (!VALID_EMAIL_REGEX.test(email.value)) {
        fields.push('Email');        
    }

    if (!VALID_CHARS_REGEX.test(subject.value)) {
        fields.push('Subject');        
    }

    if (!VALID_CHARS_REGEX.test(message.value)) {
        fields.push('Message');        
    }    

    if (fields.length > 0) {
        output.style.color = '#ff0000';
        output.innerText = `${fields.join(', ')} ${fields.length === 1 ? 'is' : 'are'} ${'not valid!'}`;

    } else {
        output.style.color = '#04a730';
        name.value = '';
        email.value = '';
        subject.value = '';
        message.value = '';
        output.innerText = 'Your message was sent successfully!';
    }
});