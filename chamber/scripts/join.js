// Set the current date and time when the form loads
const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}

// Select all membership modal buttons
const modalButtons = document.querySelectorAll("[data-modal]");

// Open the appropriate modal when a button is clicked
modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        if (modal) {
            modal.showModal();
        }
    });
});

// Close modal buttons
const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});

// Close modal when clicking outside its content
document.querySelectorAll("dialog").forEach((modal) => {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});