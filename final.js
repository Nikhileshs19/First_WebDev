
const openModalBtns = document.querySelectorAll(" #addButton, #editButton"); //opens if these are clicked
const eventModal = document.getElementById("eventModal");
const closeModalBtn = eventModal.getElementsByClassName("close")[0];

openModalBtns.forEach((btn) => {
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        eventModal.style.display = "block";
    });
});

// Close the modal when the close button is clicked
closeModalBtn.onclick = function () {
    eventModal.style.display = "none";
};

// Close the modal when the user clicks outside the modal content
window.onclick = function (event) {
    if (event.target === eventModal) {
        eventModal.style.display = "none";
    }
};


const searchInput = document.getElementById('searchInput');
const eventListItems = document.querySelectorAll('.event-list li');

searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase();

    eventListItems.forEach((item) => {
        const eventName = item.querySelector('h3').textContent.toLowerCase();
        const eventDate = item.querySelector('p:nth-of-type(1)').textContent.toLowerCase();
        const eventLocation = item.querySelector('p:nth-of-type(2)').textContent.toLowerCase();

        if (eventName.includes(searchTerm) || eventDate.includes(searchTerm) || eventLocation.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

function updateCountdownTimer(eventDateStr, countdownTimer) {
    const eventDate = new Date(eventDateStr);
    const now = new Date().getTime();
    const timeRemaining = eventDate - now;

    if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        countdownTimer.textContent = `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
        // Event has already started, update the message or hide the timer
        countdownTimer.textContent = 'Event has already started';
    }
}

function updateEventCountdownTimers(sectionId) {
    const eventItems = document.querySelectorAll(`#${sectionId} .event-list li`);
    eventItems.forEach((item) => {
        const eventDateStr = item.dataset.eventDate;
        const countdownTimer = item.querySelector('.countdown-timer');
        updateCountdownTimer(eventDateStr, countdownTimer);
    });
}

setInterval(() => {
    updateEventCountdownTimers('workshops');
    updateEventCountdownTimers('seminars');
    updateEventCountdownTimers('social');
}, 1000);


const darkModeCheckbox = document.getElementById('darkModeCheckbox');
const bodyElement = document.body;

darkModeCheckbox.addEventListener('change', () => {
    if (darkModeCheckbox.checked) {
        bodyElement.classList.add('dark-mode');
    } else {
        bodyElement.classList.remove('dark-mode');
    }
});

const stickyNav = document.getElementById('stickyNav');
const headerHeight = document.querySelector('header').offsetHeight;

window.addEventListener('scroll', () => {
    if (window.pageYOffset > headerHeight) {
        stickyNav.classList.add('sticky');
    } else {
        stickyNav.classList.remove('sticky');
    }
});


const registrationForm = document.getElementById('registration');

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm()) {
            // Submit the form data to the server using AJAX or other methods
            // Display a success message to the user upon successful submission
            alert('Registration successful! You have been registered for the event.');
            registrationForm.reset(); // Reset the form after successful submission
        }
    });

    function validateForm() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');

        if (nameInput.value.trim() === '') {
            alert('Please enter your name.');
            return false;
        }

        if (emailInput.value.trim() === '') {
            alert('Please enter your email address.');
            return false;
        }

        if (!isValidEmail(emailInput.value)) {
            alert('Please enter a valid email address.');
            return false;
        }

        if (phoneInput.value.trim() === '') {
            alert('Please enter your phone number.');
            return false;
        }

        return true;
    }

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }