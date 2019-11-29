"use strict";
const createNode = element => {
  return document.createElement(element);
};
const append = (parent, element) => {
  return parent.appendChild(element);
};
const ul = document.getElementById("results");
const usNumberFormat = new Intl.NumberFormat("en-US");
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

        pName.innerHTML = "City : " + "<span id='city'>" + town["city"] + "</span>";
        pPopulation.innerHTML = "Population : " + "<span>" + usNumberFormat.format(town["population"]) + "</span>";
        pGrowth.innerHTML = "Population Growth : ";
        spanGrowth.innerHTML = town["growth_from_2000_to_2013"];
        pState.innerHTML = "State : " + "<span>" + town["state"] + "</span>";

        append(dataDiv, pName);
        append(dataDiv, pState);
        append(dataDiv, pPopulation);
        append(dataDiv, pGrowth);
        append(pGrowth, spanGrowth);
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

  const search = () => {
    let input = document.getElementById("search"),
      filter = input.value.toUpperCase(),
      li = document.getElementsByTagName("li"),
      cityValue, stateValue;
    for (let i = 0; i < li.length; i++) {
      let city = li[i].getElementsByTagName("span")[0],
        state =  li[i].getElementsByTagName("span")[1];
      cityValue = city.textContent || city.innerText;
      stateValue = state.textContent || state.innerText;
      if (cityValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } if (stateValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  };