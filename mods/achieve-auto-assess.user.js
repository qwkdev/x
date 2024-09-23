// ==UserScript==
// @name        Achieve Auto Assess
// @namespace   xmods
// @match       https://achieve.hashtag-learning.co.uk/assess/*
// @grant       none
// @version     1.0
// @author      xmods
// ==/UserScript==

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function retry(delay, ref, ...args) {
    while (true) {
        try {
            await wait(delay);
            return ref(...args);
        } catch (error) {
            console.error(error);
        }
    }
}

function main() {
    const url = window.location.href;
    if (url === "https://achieve.hashtag-learning.co.uk/assess/finish-page/") {
        window.location.href = "https://achieve.hashtag-learning.co.uk/assess/course/choose-questions/";
    } else if (url === "https://achieve.hashtag-learning.co.uk/assess/course/choose-questions/") {
        const buttons = document.querySelector("div.row").querySelectorAll("button");
        buttons[buttons.length - 1].click();
    }
}

retry(500, main);
