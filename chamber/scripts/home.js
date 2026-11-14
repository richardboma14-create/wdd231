// ======================================
// PORT HARCOURT CHAMBER HOME PAGE
// ======================================

// MOBILE NAVIGATION
const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});

// FOOTER DATES
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    document.lastModified;


// ======================================
// WEATHER API
// ======================================

const apiKey = "cf2f7020f19a789c52386c1bc92b8bed";

const latitude = 4.8156;
const longitude = 7.0498;

const weatherContainer = document.querySelector("#weather-container");
const forecastContainer = document.querySelector("#forecast-container");

async function getWeather() {
    try {
        const currentURL =
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

        const forecastURL =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentURL),
            fetch(forecastURL)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Unable to retrieve weather information.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        weatherContainer.innerHTML =
            "<p>Weather information is currently unavailable.</p>";

        forecastContainer.innerHTML =
            "<p>Forecast information is currently unavailable.</p>";

        console.error("Weather error:", error);
    }
}


// DISPLAY CURRENT WEATHER
function displayCurrentWeather(data) {
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherContainer.innerHTML = `
        <div class="weather-current">
            <img
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${description}"
                width="80"
                height="80"
            >
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Conditions:</strong> ${description}</p>
            <p><strong>Location:</strong> Port Harcourt, Nigeria</p>
        </div>
    `;
}


// DISPLAY THREE-DAY FORECAST
function displayForecast(data) {
    const today = new Date().toLocaleDateString("en-CA");

    const dailyForecasts = {};

    data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];

        if (date !== today) {
            if (!dailyForecasts[date]) {
                dailyForecasts[date] = [];
            }

            dailyForecasts[date].push(item);
        }
    });

    const nextThreeDays = Object.entries(dailyForecasts).slice(0, 3);

    const forecastHTML = nextThreeDays.map(([date, readings]) => {

        // Select the forecast closest to midday
        const middayForecast = readings.reduce((closest, current) => {
            const currentHour = Number(current.dt_txt.slice(11, 13));
            const closestHour = Number(closest.dt_txt.slice(11, 13));

            return Math.abs(currentHour - 12) <
                Math.abs(closestHour - 12) ? current : closest;

        });

        const day = new Date(`${date}T12:00:00`).toLocaleDateString(
            "en-US",
            { weekday: "long" }
        );

        const temperature = Math.round(middayForecast.main.temp);
        const description = middayForecast.weather[0].description;

        return `
            <article class="forecast-day">
                <h4>${day}</h4>
                <p>${temperature}°C</p>
                <p>${description}</p>
            </article>
        `;

    }).join("");

    forecastContainer.innerHTML = `
        <h3>Three-Day Forecast</h3>
        <div class="forecast-container">
            ${forecastHTML}
        </div>
    `;
}


// ======================================
// BUSINESS SPOTLIGHTS
// ======================================

const spotlightsContainer =
    document.querySelector("#spotlights-container");

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load business information.");
        }

        const members = await response.json();

        // Select Gold and Silver members only
        const eligibleMembers = members.filter(member =>
            member.membershipLevel === 2 ||
            member.membershipLevel === 3
        );

        // Randomize the eligible businesses
        const shuffledMembers = [...eligibleMembers].sort(
            () => Math.random() - 0.5
        );

        // Randomly display two or three businesses
        const numberToDisplay = Math.random() < 0.5 ? 2 : 3;

        const selectedMembers =
            shuffledMembers.slice(0, numberToDisplay);

        displaySpotlights(selectedMembers);

    } catch (error) {
        spotlightsContainer.innerHTML =
            "<p>Business spotlights are currently unavailable.</p>";

        console.error("Spotlight error:", error);
    }
}


// DISPLAY BUSINESS CARDS
function displaySpotlights(members) {

    spotlightsContainer.innerHTML = members.map(member => {

        const membership =
            member.membershipLevel === 3 ? "Gold Member" : "Silver Member";

        return `
            <article class="spotlight-card">

                <img
                    src="images/${member.image}"
                    alt="${member.name} logo"
                    loading="lazy"
                >

                <h3>${member.name}</h3>

                <p>${member.description}</p>

                <p><strong>Phone:</strong> ${member.phone}</p>

                <p><strong>Address:</strong> ${member.address}</p>

                <p>
                    <strong>Website:</strong>
                    <a href="${member.website}"
                       target="_blank"
                       rel="noopener noreferrer">
                        Visit Website
                    </a>
                </p>

                <p><strong>Membership:</strong> ${membership}</p>

            </article>
        `;

    }).join("");
}


// ======================================
// INITIALIZE HOME PAGE
// ======================================

getWeather();
getSpotlights();