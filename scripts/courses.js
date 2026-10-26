const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Frontend Web Development I",
        credits: 3,
        completed: false
    }
];

const courseList = document.querySelector("#courseList");
const creditTotal = document.querySelector("#creditTotal");
const filterButtons = document.querySelectorAll("[data-filter]");
function displayCourses(courseArray) {
    courseList.innerHTML = "";

    courseArray.forEach((course) => {
        const courseCard = document.createElement("article");

        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>Credits: ${course.credits}</p>
            <p>${course.completed ? "Completed" : "Not completed"}</p>
        `;

        courseList.appendChild(courseCard);
    });

    const totalCredits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditTotal.textContent = `Total credits: ${totalCredits}`;
}
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        let filteredCourses;

        if (filter === "all") {
            filteredCourses = courses;
        } else {
            filteredCourses = courses.filter(
                (course) => course.subject === filter
            );
        }

        displayCourses(filteredCourses);

        filterButtons.forEach((filterButton) => {
            filterButton.classList.remove("selected");
        });

        button.classList.add("selected");
    });
});

// Display all courses when the page first loads.
displayCourses(courses);
