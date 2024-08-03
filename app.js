import { teamData } from "./data.js";
import { doughnutData } from "./data.js";
import { countriesData } from "./data.js";

// Преобразование импортированного json
const teamDataList = JSON.parse(teamData);

// Имена членов команды
const teamNames = teamDataList.map((member) => member.name);

// Данные для каждого графика
const totalTasksData = teamDataList.map((member) => member.tasks_per_month);
const completedTasksData = teamDataList.map((member) => member.completed_tasks);
const remainingTasksData = teamDataList.map((member) => member.remaining_tasks);

// Цвета для каждого графика
const totalTasksColors = "#3e95cd";
// const totalTasksBorderColor = "rgba(255, 99, 132, 1)";

const completedTasksColors = "#3cba9f";
// const completedTasksBorderColor = "rgba(54, 162, 235, 1)";

const remainingTasksColors = "#c45850";
// const remainingTasksBorderColor = "rgba(75, 192, 192, 1)";

// функция для графиков
function createChart(ctx, label, data, backgroundColor) {
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: teamNames,
            datasets: [
                {
                    label: label,
                    data: data,
                    backgroundColor: backgroundColor,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}
// Создание графиков
window.onload = function () {
    const totalTasksCtx = document
        .getElementById("totalTasksChart")
        .getContext("2d");
    const completedTasksCtx = document
        .getElementById("completedTasksChart")
        .getContext("2d");
    const remainingTasksCtx = document
        .getElementById("remainingTasksChart")
        .getContext("2d");

    createChart(
        totalTasksCtx,
        "Всего задач на месяц",
        totalTasksData,
        totalTasksColors
    );
    createChart(
        completedTasksCtx,
        "Выполненные задачи",
        completedTasksData,
        completedTasksColors
    );
    createChart(
        remainingTasksCtx,
        "Оставшиеся задачи",
        remainingTasksData,
        remainingTasksColors
    );
};

// Курсы
const usdOutput = document.querySelector("#usd-rate");
const eurOutput = document.querySelector("#eur-rate");
const cnyOutput = document.querySelector("#cny-rate");

fetch("https://www.cbr-xml-daily.ru/daily_json.js")
    .then((response) => response.json())
    .then((data) => {
        const rateUSD = data.Valute.USD.Value.toFixed(2);
        const rateEUR = data.Valute.EUR.Value.toFixed(2);
        const rateCNY = data.Valute.CNY.Value.toFixed(2);
        usdOutput.textContent = rateUSD;
        eurOutput.textContent = rateEUR;
        cnyOutput.textContent = rateCNY;
    })
    .catch((error) => {
        console.error(error);
    });

// Клиенты по сегментам - диаграмма
const doughnutDataList = JSON.parse(doughnutData);
const segmentData = doughnutDataList.map((item) => item.segment);
const quantityData = doughnutDataList.map((item) => item.quantity);

let ctxDoughnut = document.querySelector("#doughnut-chart");

ctxDoughnut.parentNode.style.height = "300px";
ctxDoughnut.parentNode.style.width = "300px";
let myChart = new Chart(ctxDoughnut, {
    type: "doughnut",
    data: {
        labels: segmentData,
        datasets: [
            {
                label: "количество клиентов",
                backgroundColor: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#c45850",
                ],
                data: quantityData,
            },
        ],
    },
    options: {
        title: {
            display: true,
            text: "Клиенты по сегментам",
        },
        maintainAspectRatio: true,
    },
});

// клиенты по странам - диаграмма
const countriesDataList = JSON.parse(countriesData);
const countryData = countriesDataList.map((item) => item.country);
const quantityCountryData = countriesDataList.map((item) => item.quantity);

let ctxCountry = document.querySelector("#country-chart");
ctxCountry.parentNode.style.height = "300px";
ctxCountry.parentNode.style.width = "300px";
let myCountryChart = new Chart(ctxCountry, {
    type: "pie",
    data: {
        labels: countryData,
        datasets: [
            {
                label: "количество клиентов",
                backgroundColor: [
                    "#6fb9e8",
                    "#b593c6",
                    "#7ed7bb",
                    "#f0dbcf",
                    "#e1846a",
                ],
                data: quantityCountryData,
            },
        ],
    },
    options: {
        title: {
            display: true,
            text: "Клиенты по странам",
        },
        maintainAspectRatio: true,
    },
});

//Темная - светлая темы
function darkMode() {
    const body = document.body;
    const wasDarkMode = localStorage.getItem("darkmode") === "true";

    localStorage.setItem("darkmode", !wasDarkMode);
    body.classList.toggle("dark-mode", !wasDarkMode);
}
document.querySelector(".btn").addEventListener("click", darkMode);

// запись в LocalStorage
function onloadMode() {
    document.body.classList.toggle(
        "dark-mode",
        localStorage.getItem("darkmode") === "true"
    );
}

document.addEventListener("DOMContentLoaded", onloadMode);
