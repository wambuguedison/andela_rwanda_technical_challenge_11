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
          p = createNode("p"),
          span = createNode("span");
        p.innerHTML = town["city"] + " ";
        span.innerHTML = town["growth_from_2000_to_2013"];
        append(p, span);
        append(li, p);
        append(ul, li);
      });
    });
  })
  .catch(function(error) {
    console.log("fetch error :-S", error);
  });
