// ==UserScript==
// @name         BLOOKET ANSWER FINDER
// @namespace    http://tampermonkey.net/
// @namespace    https://violentmonkey.github.io
// @namespace    https://www.greasespot.net
// @version      2
// @description  This mod make every answer in Blooket the correct answer
// @author       XMODS
// @match        https://*.blooket.com/*
// @exclude      https://play.blooket.com/play
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @license MIT
// ==/UserScript==

/////////////////////////////////////
// 0.55 // 1st Chest = TRIPLE GOLD //
// 0.72 // 1st Chest = SWAP        //
/////////////////////////////////////

var mode = 0;
Math.random = function() { return 0.72; };
// 0 = RED AND GREEN
// 1 = BORDER

function baldy72() { Math.random = function() { return 0.72; }; try {document.getElementsByClassName("styles__headerTextCenter___4SlNZ-camelCase")[0].innerHTML = "SWAP ON"; setTimeout({}, 500); } catch {} };
function baldy55() { Math.random = function() { return 0.55; }; try {document.getElementsByClassName("styles__headerTextCenter___4SlNZ-camelCase")[0].innerHTML = "TRIPLE GOLD ON"; setTimeout({}, 500); } catch {} };
function mode0() { mode = 0; try {document.getElementsByClassName("styles__headerTextCenter___4SlNZ-camelCase")[0].innerHTML = "RED AND GREEN ON"; setTimeout({}, 500); } catch {} };
function mode1() { mode = 1; try {document.getElementsByClassName("styles__headerTextCenter___4SlNZ-camelCase")[0].innerHTML = "BORDER ON"; setTimeout({}, 500); } catch {} };

setInterval(() => {
    try {
        document.getElementsByClassName("styles__headerTextCenter___4SlNZ-camelCase")[0].innerHTML = "<button type='submit' id='baldy72'>SWAP</button><button type='submit' id='baldy55'>TRIPLE GOLD</button><button type='submit' id='m0'>RED AND GREEN</button><button type='submit' id='m1'>BORDER</button>";
        document.getElementById('baldy72').removeEventListener('click', baldy72);
        document.getElementById('baldy72').addEventListener('click', baldy72);
        document.getElementById('baldy55').removeEventListener('click', baldy55);
        document.getElementById('baldy55').addEventListener('click', baldy55);
        document.getElementById('m0').removeEventListener('click', mode0);
        document.getElementById('m0').addEventListener('click', mode0);
        document.getElementById('m1').removeEventListener('click', mode1);
        document.getElementById('m1').addEventListener('click', mode1);
    } catch {}
}, 1000)

setInterval(() => {
    const { state: o, props: t } = Object.values(document.querySelector('body div[class*="camelCase"]'))[1].children[0]._owner["stateNode"];
    [...document.querySelectorAll('[class*="answerContainer"]')].forEach((e, s) => {
    if (mode === 0) {
        if ((o.question || t.client.question).correctAnswers.includes((o.question || t.client.question).answers[s])) {
            e.style.backgroundColor = "rgb(0, 207, 119)";
        } else {
           e.style.backgroundColor = "rgb(189, 15, 38)";
        }
    } else if (mode === 1) {
        if ((o.question || t.client.question).correctAnswers.includes((o.question || t.client.question).answers[s])) {
            e.style.border = "5px solid black";
        }
    }
    });
}, 150);