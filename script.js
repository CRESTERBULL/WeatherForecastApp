'use-strict';

const countryInput = document.querySelector('.country-input');
const reg = document.querySelector('.city');
const searchBtn = document.querySelector('.country-btn');
const temperature = document.querySelector('.temperature');
const condition = document.querySelector('.weather-condition');
const error = document.querySelector('.hidden');
const time = document.querySelector('.time');
const feelsLike = document.querySelector('.feels-like');
const wind = document.querySelector('.wind');
const precip = document.querySelector('.precip');
const humid = document.querySelector('.humidity');
const background = document.querySelector('.main');

const weather = {
    Sunny: "url('https://images.pexels.com/photos/267149/pexels-photo-267149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    Overcast:
        "url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTdhNTY4NjIyYTUyNmZkOWI1ZDU1NTgxZTY2MjFkYTVkNTE5ZDhiYiZjdD1n/l41lQIclE3lItAlfq/giphy.gif')",
    Mist: "url('https://wallpapershome.com/images/pages/pic_h/6203.jpg')",
    Fog: "url('https://i.pinimg.com/564x/ac/e4/37/ace43727f759f23be79fdc73e2d2b45a.jpg')",
    Rainy: "url('https://cdn.dribbble.com/users/186452/screenshots/1732130/media/9eb475492babbfb0b4bd184496b4af88.gif')",
    Clear: "url('https://static.vecteezy.com/system/resources/previews/002/986/092/non_2x/beautiful-deep-blue-sky-with-white-clouds-on-a-sunny-summer-day-fluffy-high-cloud-outdoors-bright-and-air-heaven-skies-with-light-cumulus-clouds-background-soft-cloudscape-in-clear-weather-view-free-photo.jpg')",
};

(function runOnce() {});

const userAction = async (country) => {
    const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=YOURAPIKEY=${country}&aqi=no`,
        {
            method: 'POST',
            body: 'myBody', // string or object
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    const myJson = await response.json();

    console.log(myJson);

    if (myJson.error) {
        error.style.opacity = 100;
    } else {
        error.style.opacity = 0;
        const {
            current: {
                temp_c,
                feelslike_c,
                wind_kph,
                precip_mm,
                humidity,
                condition: { text },
            },
            location: { name, region, localtime },
        } = myJson;

        // console.log(myJson);

        reg.textContent = `${name}, ${region}`;
        temperature.textContent = `${temp_c.toLocaleString(undefined, {
            style: 'unit',
            unit: 'celsius',
        })}`;
        condition.textContent = `${text}`;
        time.textContent = `${localtime}`;
        feelsLike.textContent = `${feelslike_c}`;
        wind.textContent = `${wind_kph} km/h`;
        precip_mm.textContent = `${precip_mm}`;
        humid.textContent = `${humidity}`;
        background.style.backgroundImage = weather[text.split(' ').join('-')];
        if (text.includes('snow')) {
            background.style.backgroundImage = weather.Snow;
        } else if (text.includes('rain')) {
            background.style.backgroundImage = weather.Rainy;
        }
    }
};

searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const country = countryInput.value;
    userAction(country);
    countryInput.value = '';
    countryInput.blur();
});

(function runOnce() {
    userAction('India');
})();
