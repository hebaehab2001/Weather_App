const currentlocation = document.getElementById('currentlocation');
const currentC = document.getElementById('currentC');
const secondmaxC = document.getElementById('secondmaxC');
const secondminC = document.getElementById('secondminC');
const thirdmaxC = document.getElementById('thirdmaxC');
const thirdminC = document.getElementById('thirdminC');
const currentdayimg = document.getElementById('currentdayimg');
const seconddayimg = document.getElementById('seconddayimg');
const thirddayimg = document.getElementById('thirddayimg');
const currentimgcaption = document.getElementById('currentimgcaption');
const secondimgcaption = document.getElementById('secondimgcaption');
const thirdimgcaption = document.getElementById('thirdimgcaption');
const currentday = document.getElementById('currentday');
const secoundday = document.getElementById('secoundday');
const thirdday = document.getElementById('thirdday');
const currentdate = document.getElementById('currentdate');
const table = document.getElementById('table');
const alert = document.getElementById('alert');
let myresponse = [];
getLocation();


async function getLocation() {
    try {
        // This example uses the ipapi.co API
        let myReq = await fetch('https://ipapi.co/json/', { method: 'GET' });
        if (myReq.status >= 200 && myReq.status < 300) {
            myresponse = await myReq.json();
            getData(myresponse.city);
        }
    } catch (error) {
        table.classList.add('d-none');
        alert.classList.remove('d-none');
        alert.classList.add('d-block');
        console.log(error);
    }
}

document.getElementById('findcountrybtn').addEventListener('click', () => {
    let myquery = document.getElementById('input1').value.trim();
    if (myquery == '') {
        getData('cairo');
    }
    else {
        getData(myquery);
    }
});
document.getElementById('findcountrybtn2').addEventListener('click', () => {
    let myquery = document.getElementById('input2').value.trim();
    if (myquery == '') {
        getData('cairo');
    }
    else {
        getData(myquery);
    }
});
document.getElementById('input1').addEventListener('input', (e) => {
    let myquery = e.target.value.trim();
    if (myquery == '') {
        getData('cairo');
    }
    else {
        getData(myquery);
    }
});
document.getElementById('input2').addEventListener('input', (e) => {
    let myquery = e.target.value.trim();
    if (myquery == '') {
        getData('cairo');
    }
    else {
        getData(myquery);
    }
});


async function getData(location) {

    try {
        let myReq = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${location}&days=3&aqi=no&alerts=no`, { method: 'GET' })
        if (myReq.status >= 200 && myReq.status < 300) {
            myresponse = await myReq.json();
            // date
            currentday.textContent = getDayOfWeek(myresponse.forecast.forecastday[0].date);
            currentdate.textContent = getDate(myresponse.forecast.forecastday[0].date);
            secoundday.textContent = getDayOfWeek(myresponse.forecast.forecastday[1].date);
            thirdday.textContent = getDayOfWeek(myresponse.forecast.forecastday[2].date);
            // location
            currentlocation.textContent = myresponse.location.name;
            // temp
            currentC.innerHTML = `${myresponse.current.temp_c} <span><sup>o</sup>C</span>`;
            secondmaxC.innerHTML = `${myresponse.forecast.forecastday[1].day.maxtemp_c} <span><sup>o</sup>C</span>`;
            secondminC.innerHTML = `${myresponse.forecast.forecastday[1].day.mintemp_c} <span><sup>o</sup></span>`;
            thirdmaxC.innerHTML = `${myresponse.forecast.forecastday[2].day.maxtemp_c} <span><sup>o</sup>C</span>`;
            thirdminC.innerHTML = `${myresponse.forecast.forecastday[2].day.mintemp_c} <span><sup>o</sup></span>`;
            // img src
            currentdayimg.src = myresponse.current.condition.icon;
            seconddayimg.src = myresponse.forecast.forecastday[1].day.condition.icon;
            thirddayimg.src = myresponse.forecast.forecastday[2].day.condition.icon;
            // img caption
            currentimgcaption.textContent = myresponse.current.condition.text;
            secondimgcaption.textContent = myresponse.forecast.forecastday[1].day.condition.text;
            thirdimgcaption.textContent = myresponse.forecast.forecastday[2].day.condition.text;
        }
        else {
            throw 'error in request';
        }
    } catch (error) {
        table.classList.add('d-none');
        alert.classList.remove('d-none');
        alert.classList.add('d-block');
        console.log(error);

    }
};
function getDayOfWeek(day) {
    const today = new Date(day);
    const weekdayLong = today.toLocaleDateString('en-US', { weekday: 'long' });
    return weekdayLong;
}
function getDate(day) {
    const today = new Date(day);
    const monthName = today.toLocaleDateString('en-US', { month: 'short' });
    const dayOfMonth = today.getDate();
    return `${dayOfMonth + monthName}`;
}