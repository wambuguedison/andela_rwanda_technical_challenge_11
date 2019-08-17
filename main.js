"use strict";
const ul = document.getElementById("results");
const url = "http://tiny.cc/fdj6az";

fetch(url)
  .then(resp => resp.json())
  .then(function(data) {
    if (!response.ok) {
      alert("Api Error");
    }
    //continue here
  })
  .catch(function(error) {
    alert("Something went wrong" + error);
  });
