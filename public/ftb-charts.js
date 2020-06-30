"use strict";

let ctxOne = document.getElementById("chartOne").getContext("2d");
let chartOne = new Chart(ctxOne, {
  type: "pie",
  data: {
    labels: ["Green", "Blue", "Black"],
    datasets: [
      {
        backgroundColor: ["#2ecc71", "#e74c3c", "#34495e"],
        data: [12, 19, 7],
      },
    ],
  },
  options: {
    responsive: true,
  },
});

let ctxTwo = document.getElementById("chartTwo").getContext("2d");
let chartTwo = new Chart(ctxTwo, {
  type: "pie",
  data: {
    labels: [
      "Single Family",
      "Townhouse/Condo",
      "Land",
      "Multifamily",
      "Farm/Ranch",
      "Commercial",
    ],
    datasets: [
      {
        backgroundColor: [
          "#5093ce",
          "#c7ccd1",
          "#37fc77f",
          "#fab657",
          "#eaaede",
          "#dd6864",
        ],
        data: [52, 12, 6, 8, 8, 14],
      },
    ],
  },
  options: {
    responsive: true,
  },
});

let ctxThree = document.getElementById("chartThree").getContext("2d");
let stars = [135850, 52122, 148825, 16939, 9763];
let frameworks = ["React", "Angular", "Vue", "Hyperapp", "Omi"];

let chartThree = new Chart(ctxThree, {
  type: "bar",
  data: {
    labels: frameworks,
    datasets: [
      {
        label: "Github Stars",
        backgroundColor: [
          "#5093ce",
          "#dd6864",
          "aquamarine",
          "#fab657",
          "#eaaede",
        ],
        data: stars,
      },
    ],
  },
  options: {
    responsive: true,
  },
});

let ctxFour = document.getElementById("chartFour").getContext("2d");
let chartFour = new Chart(ctxFour, {
  type: "line",
  data: {
    labels: frameworks,
    datasets: [
      {
        label: "Github Stars",
        data: stars,
        backgroundColor: "lightpink",
        borderColor: "deeppink",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
  },
});

/*let ctxFive = document.getElementById("chartFive").getContext("2d");
let chartFive = new Chart(ctxFive, {
  type: "pie",
  data: {
    labels: ["Green", "Blue", "Black"],
    datasets: [
      {
        backgroundColor: ["#2ecc71", "#e74c3c", "#34495e"],
        data: [12, 19, 7],
      },
    ],
  },
  options: {
    responsive: true,
  },
});*/
