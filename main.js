"use strict";
const createNode = element => {
  return document.createElement(element);
};
const append = (parent, element) => {
  return parent.appendChild(element);
};
const ul = document.getElementById("results");
//const url =
  //"https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const url = "http://localhost/cities/cities.json";

fetch(url, { mode: "no-cors" })
  .then(function(response) {
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code : " + response.status
      );
      return;
    }
    response.json().then(function(data) {
      let cities = data;
      console.log(data[999]);
      return cities.map(town => {
        let dataDiv = createNode("div"),
          li = createNode("li"),
          pName = createNode("p"),
          pPopulation = createNode("p"),
          pState = createNode("p"),
          pGrowth = createNode("p"),
          spanGrowth = createNode("span");

        pName.innerHTML = "City : " + "<span>" + town["city"] + "</span>";
        pPopulation.innerHTML = "Population : " + "<span>" + town["population"] + "</span>";
        pGrowth.innerHTML = "Population Growth : ";
        spanGrowth.innerHTML = town["growth_from_2000_to_2013"];
        pState.innerHTML = "State : " + "<span>" + town["state"] + "</span>";

        append(dataDiv, pName);
        append(dataDiv, pPopulation);
        append(dataDiv, pGrowth);
        append(pGrowth, spanGrowth);
        append(dataDiv, pState);
        append(li, dataDiv);

        append(ul, li);


        //check if growth is lower or greater than zero and color it accordingly
        let growth = town["growth_from_2000_to_2013"];
        growth = Number(growth.replace("%", ""));
        if (growth < 0) {
          spanGrowth.style.color = "red";
        }
        if (growth > 0) {
          spanGrowth.style.color = "green";
        }
      });
    });
  })
  .catch(function(error) {
    console.log("fetch error :-S", error);
  });