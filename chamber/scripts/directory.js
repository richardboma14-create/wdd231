const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-nav");

// Load business information from the JSON file
async function getMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Could not load member information.");
    }

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
    membersContainer.textContent =
      "Sorry, the business directory could not be loaded.";
  }
}

// Display the businesses on the page
function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const membership =
      member.membershipLevel === 3
        ? "Gold Member"
        : member.membershipLevel === 2
          ? "Silver Member"
          : "Member";

    const image = document.createElement("img");
    image.src = `images/${member.image}`;
    image.alt = `${member.name} business`;
    image.loading = "lazy";

    const heading = document.createElement("h2");
    heading.textContent = member.name;

    const category = document.createElement("p");
    category.textContent = member.category;

    const description = document.createElement("p");
    description.textContent = member.description;

    const address = document.createElement("p");
    address.textContent = `Address: ${member.address}`;

    const phone = document.createElement("p");
    phone.textContent = `Phone: ${member.phone}`;

    const email = document.createElement("p");
    email.textContent = `Email: ${member.email}`;

    const level = document.createElement("p");
    level.textContent = membership;

    const website = document.createElement("a");
    website.href = member.website;
    website.textContent = "Visit Website";
    website.target = "_blank";
    website.rel = "noopener noreferrer";

    card.append(
      image,
      heading,
      category,
      description,
      address,
      phone,
      email,
      level,
      website
    );

    membersContainer.appendChild(card);
  });
}

// Switch to grid view
gridButton.addEventListener("click", () => {
  membersContainer.classList.remove("members-list");
  membersContainer.classList.add("members-grid");

  gridButton.classList.add("active");
  listButton.classList.remove("active");

  gridButton.setAttribute("aria-pressed", "true");
  listButton.setAttribute("aria-pressed", "false");
});

// Switch to list view
listButton.addEventListener("click", () => {
  membersContainer.classList.remove("members-grid");
  membersContainer.classList.add("members-list");

  listButton.classList.add("active");
  gridButton.classList.remove("active");

  listButton.setAttribute("aria-pressed", "true");
  gridButton.setAttribute("aria-pressed", "false");
});

// Mobile navigation menu
menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", isOpen);
});

// Automatically update the copyright year
document.querySelector("#current-year").textContent =
  new Date().getFullYear();

// Display the page's last modified date
const lastModified = new Date(document.lastModified);

document.querySelector("#last-modified").textContent =
  lastModified.toLocaleDateString();

// Load the directory
getMembers();