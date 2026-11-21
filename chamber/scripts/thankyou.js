const params = new URLSearchParams(window.location.search);

const firstName = params.get("firstName");
const lastName = params.get("lastName");
const email = params.get("email");
const phone = params.get("phone");
const businessName = params.get("businessName");
const timestamp = params.get("timestamp");

const detailsContainer = document.querySelector("#application-details");

if (firstName && lastName && email && phone && businessName && timestamp) {
    const applicationFields = [
        ["First Name", firstName],
        ["Last Name", lastName],
        ["Email Address", email],
        ["Mobile Number", phone],
        ["Business Name", businessName],
        ["Application Date", new Date(timestamp).toLocaleString()]
    ];

    applicationFields.forEach(([label, value]) => {
        const paragraph = document.createElement("p");
        const strong = document.createElement("strong");

        strong.textContent = `${label}: `;
        paragraph.appendChild(strong);
        paragraph.append(document.createTextNode(value));

        detailsContainer.appendChild(paragraph);
    });
} else {
    detailsContainer.textContent =
        "No complete application information was received. Please return to the membership application page.";
}
