"use strict";
const createNode = element => {
  return document.createElement(element);
};
const append = (parent, element) => {
  return parent.appendChild(element);
};
const ul = document.getElementById("results");
const url =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

fetch(url, { mode: "cors" })
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
        let li = createNode("li"),
          pName = createNode("p"),
          pPoplation = createNode("p"),
          pState = createNode("p"),
          pGrowth = createNode("p");
        pName.innerHTML = town["city"];
        pPoplation.innerHTML = town["population"];
        pGrowth.innerHTML = town["growth_from_2000_to_2013"];
        pState.innerHTML = town["state"];
        append(li, pName);
        append(li, pPoplation);
        append(li, pGrowth);
        append(li, pState);
        append(ul, li);
        let growth = town["growth_from_2000_to_2013"];
        growth = Number(growth.replace("%", ""));
        if (growth < 0) {
          pGrowth.style.color = "red";
        }
        if (growth > 0) {
          pGrowth.style.color = "green";
        }
      });
    });
  })
  .catch(function(error) {
    console.log("fetch error :-S", error);
  });
