// ==UserScript==
// @name        Blooket Hacks
// @namespace   xmods
// @match       *://*.blooket.com/*
// @grant       none
// @version     1.0
// @author      qwk
// @description Blooket cheat menu
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

retry(500, () => {
    (() => {
        let e = document.createElement("iframe");
        document.body.append(e), window.alert = e.contentWindow.alert.bind(window), window.prompt = e.contentWindow.prompt.bind(window), window.confirm = e.contentWindow.confirm.bind(window), e.remove()
    })(), (() => {
        let e = document.createElement("style");
        e.innerHTML = "details > summary {\n    cursor: pointer;\n    transition: .5s;\n    list-style: none;\n}\ndetails > summary:hover {\n    transform: scale(1.05);\n}\ndetails > summary::-webkit-details-marker {\n    display: none;\n}\ndetails summary ~ * {\n    animation: sweep .5s ease-in-out;\n}\n\n@keyframes sweep {\n    0%    {opacity: 0; transform: translateY(-10px)}\n    100%  {opacity: 1; transform: translateY(0)}\n}\n.cheat {\n    padding: 5px;\n    margin: 3px;\n    width: 172px;\n    height: 45px;\n    display: inline;\n    color: white;\n    transition: .2s;\n    border-radius: 7px;\n    cursor: pointer;\n    font-size: 14px;\n    line-height: 14px;\n    background: rgba(245, 245, 255, .12);\n    border: 2.5px solid rgba(255, 255, 255, .15);\n}\n.cheat:hover {\n    background: rgba(245, 245, 255, .3);\n}";
        const t = document.createElement("div");
        t.appendChild(e), t.style.width = "400px", t.style.background = "rgba(0, 0, 10, .6)", t.style.border = "2.5px solid rgba(0, 0, 20, .15)", t.style.backdropFilter = "blur(15px)", t.style.borderRadius = "10px", t.style.position = "absolute", t.style.textAlign = "center", t.style.fontFamily = "Nunito", t.style.color = "white", t.style.overflow = "hidden", t.style.top = "50px", t.style.left = "50px";
        var o = 0,
            a = 0,
            n = 0,
            r = 0;
        t.onmousedown = (e = window.event) => {
            e.preventDefault(), n = e.clientX, r = e.clientY, document.onmouseup = () => {
                document.onmouseup = null, document.onmousemove = null
            }, document.onmousemove = e => {
                (e = e || window.event).preventDefault(), o = n - e.clientX, a = r - e.clientY, n = e.clientX, r = e.clientY, t.style.top = t.offsetTop - a + "px", t.style.left = t.offsetLeft - o + "px"
            }
        };
        let s, l = document.createElement("div");
        t.appendChild(l), l.style.width = "100%", l.style.height = "35px", l.style.paddingTop = "2px", l.style.fontSize = "1.5rem", l.style.textAlign = "center", l.innerHTML = 'Blooket Hacks <span style="font-size: .75rem">v5.2.9</span>';
        let i = document.createElement("button");
        l.appendChild(i), i.style.background = "transparent", i.style.color = "#ffffff", i.style.height = "45px", i.style.width = "45px", i.style.border = "none", i.style.cursor = "pointer", i.style.position = "absolute", i.style.top = "-8px", i.style.right = "-10px", i.style.fontSize = "24px", i.style.borderRadius = "10px", i.style.fontFamily = "Nunito", i.style.fontWeight = "bolder", i.style.paddingTop = "10px", i.style.paddingRight = "15px", i.innerText = "X", i.onclick = () => {
            t.remove(), clearInterval(s), removeEventListener("keypress", M)
        };
        let d = document.createElement("button");
        l.appendChild(d), d.style.background = "transparent", d.style.color = "#ffffff", d.style.height = "45px", d.style.width = "45px", d.style.border = "none", d.style.cursor = "pointer", d.style.position = "absolute", d.style.top = "-14px", d.style.left = "-8px", d.style.fontSize = "32px", d.style.borderRadius = "10px", d.style.fontFamily = "Nunito", d.style.fontWeight = "bolder", d.style.paddingTop = "10px", d.style.paddingLeft = "15px", d.innerText = "-", d.onclick = () => {
            c.hidden = !c.hidden
        };
        let c = document.createElement("div"),
            u = document.createElement("div");
        c.appendChild(u), t.appendChild(c), u.innerHTML = `<span id="curPageEl">${T(!0)?`Current gamemode: ${T(!0)}`:"No game detected"}</span><br><span>(Press E to hide)</span><br>`, u.style.display = "block", u.style.margin = "10px", u.style.minHeight = "70px";
        let p = document.createElement("span");
        u.appendChild(p), document.body.append(t);
        let m = document.createElement("div");
        c.appendChild(m), m.style.fontSize = "1.1rem", m.style.paddingBottom = "5px", m.innerHTML = '<span>CHEATS BY <a style="color: lightblue" href="https://qwkdev.github.io/" target="_blank">QWK</a></span>';
        var h = () => new Promise(((e, t) => {
                try {
                    let t = window.webpackJsonp.map((e => Object.keys(e[1]).map((t => e[1][t])))).reduce(((e, t) => [...e, ...t]), []).find((e => /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(e.toString()) && /\(new TextEncoder\)\.encode\(\"(.+?)\"\)/.test(e.toString()))).toString();
                    e({
                        blooketBuild: t.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)[0],
                        secret: t.match(/\(new TextEncoder\)\.encode\(\"(.+?)\"\)/)[1]
                    })
                } catch {
                    t("Could not fetch auth details")
                }
            })),
            y = async (e, t) => {
                let o = window.crypto.getRandomValues(new Uint8Array(12));
                return window.btoa(Array.from(o).map((e => String.fromCharCode(e))).join("") + Array.from(new Uint8Array(await window.crypto.subtle.encrypt({
                    name: "AES-GCM",
                    iv: o
                }, await window.crypto.subtle.importKey("raw", await window.crypto.subtle.digest("SHA-256", (new TextEncoder).encode(t)), {
                    name: "AES-GCM"
                }, !1, ["encrypt"]), (new TextEncoder).encode(JSON.stringify(e))))).map((e => String.fromCharCode(e))).join(""))
            };

        function w() {
            return Object.values(document.querySelector("#app > div > div"))[1].children[1]._owner
        }
        let f, b, g, k, N, S = {
                global: {
                    "Toggle Auto Answer": () => {
                        f = !f
                    },
                    "Toggle Highlight Answers": () => {
                        b = !b
                    },
                },
                cafe: {
                    "Infinite Food": () => {
                        if ("/cafe" != document.location.pathname) return alert("This cheat doesn't work in the shop!");
                        w().stateNode.state.foods.forEach((e => e.stock = 99999)), w().stateNode.forceUpdate()
                    },
                    "Max Levels": () => {
                        if ("/cafe/shop" != document.location.pathname) return alert("This cheat only works in the shop!");
                        Object.keys(w().stateNode.state.items).forEach((e => w().stateNode.state.items[e] = 5)), w().stateNode.forceUpdate()
                    },
                    "Set Cash": () => {
                        w().stateNode.setState({
                            cafeCash: Number(parseFloat(prompt("How much cash would you like?")))
                        })
                    },
                    "MAX Cash": () => {
                        w().stateNode.setState({
                            cafeCash: Number.MAX_VALUE
                        })
                    },
                    "Reset Abilities": () => {
                        Object.keys(w().stateNode.state.abilities).forEach((e => w().stateNode.state.abilities[e] = 5)), w().stateNode.forceUpdate()
                    }
                },
                kingdom: {
                    "Choice ESP": () => {
                        g = !g
                    },
                    "Max Stats": () => {
                        w().stateNode.setState({
                            materials: 100,
                            people: 100,
                            happiness: 100,
                            gold: 100
                        })
                    },
                    "Disable Toucan": () => {
                        w().stateNode.taxCounter = Number.MAX_VALUE
                    },
                    "Skip Guest": () => {
                        w().stateNode.nextGuest()
                    },
                    "Set Guests": () => {
                        let e = Number(parseFloat(prompt("How many guests do you want?")));
                        w().stateNode.setState({
                            guestScore: e
                        })
                    },
                    "MAX Guests": () => {
                        let e = Number.MAX_VALUE;
                        w().stateNode.setState({
                            guestScore: e
                        })
                    }
                },
                crypto: {
                    "Auto Hack": () => {
                        k = !k
                    },
                    "Set Crypto": () => {
                        let e = Number(parseFloat(prompt("How much crypto do you want?")));
                        w().stateNode.setState({
                            crypto2: e,
                            crypto: e
                        })
                    },
                    "MAX Crypto": () => {
                        let e = Number.MAX_VALUE;
                        w().stateNode.setState({
                            crypto2: e,
                            crypto: e
                        })
                    }
                },
                factory: {
                    "All Mega Bot": () => {
                        let e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].fill({
                            name: "Mega Bot",
                            color: "#d71f27",
                            class: "🤖",
                            rarity: "Legendary",
                            cash: [8e4, 43e4, 42e5, 62e6, 1e9],
                            time: [5, 5, 3, 3, 3],
                            price: [7e6, 12e7, 19e8, 35e9],
                            active: !1,
                            level: 4,
                            bonus: 100
                        });
                        w().stateNode.setState({
                            blooks: e
                        })
                    },
                    "Remove Glitches": () => {
                        w().stateNode.setState({
                            glitch: "",
                            bites: 0,
                            ads: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            hazards: ["", "", "", "", ""],
                            lol: !1,
                            joke: !1,
                            slow: !1,
                            dance: !1,
                            popUpAmount: 0
                        })
                    },
                    "Max Blooks": () => {
                        w().stateNode.state.blooks.forEach((e => {
                            e.level = 4
                        }))
                    },
                    "Set Cash": () => {
                        let e = Number(parseFloat(prompt("How much cash do you want?")));
                        w().stateNode.setState({
                            cash: e
                        })
                    },
                    "MAX Cash": () => {
                        let e = Number.MAX_VALUE;
                        w().stateNode.setState({
                            cash: e
                        })
                    }
                },
                fishing: {
                    "Set Weight": () => {
                        let e = Number(parseFloat(prompt("How much weight do you want?")));
                        w().stateNode.setState({
                            weight2: e,
                            weight: e
                        })
                    },
                    "MAX Weight": () => {
                        let e = Number.MAX_VALUE;
                        w().stateNode.setState({
                            weight2: e,
                            weight: e
                        })
                    },
                    "Set Lure": () => {
                        let e = Number(parseFloat(prompt("What do you want to set your lure to? (1 - 5)"))) - 1;
                        w().stateNode.setState({
                            lure: e < 0 ? 0 : e > 4 ? 4 : e
                        })
                    }
                },
                gold: {
                    "Set Gold": () => {
                        let e = Number(parseFloat(prompt("How much gold do you want?")));
                        w().stateNode.setState({
                            gold2: e,
                            gold: e
                        })
                    },
                    "MAX Gold": () => {
                        let e = Number.MAX_VALUE;
                        w().stateNode.setState({
                            gold2: e,
                            gold: e
                        })
                    },
                    "Chest ESP": () => {
                        N = !N
                    }
                },
                racing: {
                    "Instant Win": () => {
                        w().stateNode.setState({
                            progress: w().stateNode.state.goalAmount
                        }), setTimeout((() => {
                            try {
                                Array.from(document.body.querySelectorAll('div[class*="answerText"]')).filter((e => e.firstChild.innerHTML == w().memoizedState.question.correctAnswers[0]))[0].click()
                            } catch {
                                try {
                                    Array.from(document.body.querySelectorAll('div[class*="answerText"]')).filter((e => e.firstChild.innerHTML == w().memoizedProps.client.question.correctAnswers[0]))[0].click()
                                } catch {}
                            }
                        }), 100)
                    }
                },
                defense2: {
                    "Set Round": () => {
                        let e = Number(parseFloat(prompt("What round do you want to set it to?")));
                        w().stateNode.setState({
                            round: e
                        })
                    },
                    "OP Towers": () => {
                        Object.values(function e(t = document.querySelector("body>div")) {
                            return Object.values(t)[1]?.children?.[0]?._owner.stateNode ? t : e(t.querySelector(":scope>div"))
                        }())[1].children[0]._owner.stateNode.state.towers.forEach((e => {
                            if (e.stats.dmg = 1e6, e.stats.fireRate = 20, e.stats.ghostDetect = !0, e.stats.maxTargets = 1e6, e.stats.numProjectiles &&= 100, e.stats.range = 100, e.stats.auraBuffs)
                                for (const t in e.stats.auraBuffs) e.stats.auraBuffs[t] *= 100
                        }))
                    },
                    "Set Coins": () => {
                        Object.values(function e(t = document.querySelector("body>div")) {
                            return Object.values(t)[1]?.children?.[0]?._owner.stateNode ? t : e(t.querySelector(":scope>div"))
                        }())[1].children[0]._owner.stateNode.setState({
                            coins: Number(parseFloat(prompt("How many coins do you want?")))
                        })
                    },
                    "MAX Coins": () => {
                        Object.values(function e(t = document.querySelector("body>div")) {
                            return Object.values(t)[1]?.children?.[0]?._owner.stateNode ? t : e(t.querySelector(":scope>div"))
                        }())[1].children[0]._owner.stateNode.setState({
                            coins: Number.MAX_VALUE
                        })
                    }
                },
                defense: {
                    "Clear Enemies": () => {
                        w().stateNode.enemies = []
                    },
                    "Remove Ducks": () => {
                        data = w().stateNode, data.ducks.forEach((e => {
                            data.tiles[e.y][e.x] = 0
                        })), data.ducks.length = 0
                    },
                    "OP Towers": () => {
                        w().stateNode.towers.forEach((e => {
                            e.damage = 99999999, e.range = 99999999, e.fullCd = 0
                        }))
                    },
                    "Place Towers Anywhere": () => {
                        w().stateNode.tiles = w().stateNode.tiles.map((e => e.map((e => 2 == e ? 0 : e))))
                    },
                    "Set Damage": () => {
                        let e = Number(parseFloat(prompt("How much damage do you want?")));
                        w().stateNode.dmg = e
                    },
                    "MAX Damage": () => {
                        let e = Number.MAX_VALUE;
                        w().stateNode.dmg = e
                    },
                    "Set Tokens": () => {
                        let e = Number(parseFloat(prompt("How many tokens do you want?")));
                        w().stateNode.setState({
                            tokens: e
                        })
                    },
                    "MAX Tokens": () => {
                        let e = Number.MAX_VALUE;
                        w().stateNode.setState({
                            tokens: e
                        })
                    },
                    "Set Round": () => {
                        let e = Number(parseFloat(prompt("What round do you want to set it to?")));
                        w().stateNode.setState({
                            round: e
                        })
                    }
                },
                doom: {
                    "Set Coins": () => {
                        try {
                            w().stateNode.props.setTowerCoins(Number(parseFloat(prompt("How many coins do you want?"))))
                        } catch {}
                    },
                    "Heal Player": () => {
                        w().stateNode.setState({
                            myLife: 100
                        })
                    },
                    "Lower Enemy Stats": () => {
                        let e = w().stateNode.state;
                        if ("select" != e.phase) return alert("You must be on the attribute selection page!");
                        w().stateNode.setState({
                            enemyCard: {
                                ...e.enemyCard,
                                strength: 0,
                                charisma: 0,
                                wisdom: 0
                            }
                        })
                    },
                    "Max Card Stats": () => {
                        let e = w().stateNode.state;
                        if ("select" != e.phase) return alert("You must be on the attribute selection page!");
                        w().stateNode.setState({
                            myCard: {
                                ...e.myCard,
                                strength: 20,
                                charisma: 20,
                                wisdom: 20
                            }
                        })
                    }
                }
            },
            x = document.createElement("details");
        x.innerHTML = '<summary style="padding: 10px; font-size: 1.5em; font-weight: bolder">Global</summary>';
        for (var A = 0; A < Object.keys(S.global).length; A++) {
            let e = C(Object.keys(S.global)[A]);
            e.onclick = S.global[Object.keys(S.global)[A]], x.appendChild(e)
        }
        x.open = !0, x.style.paddingBottom = "10px", u.appendChild(x);
        let E = document.createElement("div");
        u.appendChild(E), s = setInterval((() => {
            v != T() && (v = T(), curPageEl.innerText = T(!0) ? `Current gamemode: ${T(!0)}` : "No game detected", Array.from(E.children).forEach((e => e.remove())), v && S[v] && Object.keys(S[v]).forEach((e => {
                let t = C(e);
                t.onclick = S[v][e], E.appendChild(t)
            }))), E.childElementCount % 2 == 1 && (E.lastElementChild.style.cssText = "width: 350px;");
            let e = `Auto Answer: ${f?"Enabled":"Disabled"}\nHighlight Answers: ${b?"Enabled":"Disabled"}${"kingdom"==v?"\nChoice ESP: "+(g?"Enabled":"Disabled"):"crypto"==v?"\nAuto Hack: "+(k?"Enabled":"Disabled"):"gold"==v?"\nChest ESP: "+(N?"Enabled":"Disabled"):""}`;
            if (p.innerText != e && (p.innerText = e), f) try {
                Array.from(document.body.querySelectorAll('div[class*="answerText"]')).filter((e => e.firstChild.innerHTML == w().memoizedState.question.correctAnswers[0]))[0].click()
            } catch {
                try {
                    Array.from(document.body.querySelectorAll('div[class*="answerText"]')).filter((e => e.firstChild.innerHTML == w().memoizedProps.client.question.correctAnswers[0]))[0].click()
                } catch {}
            }
            if (b) try {
                Array.from(document.querySelector('div[class*="answersHolder"').children).forEach((e => {
                    w().memoizedState.question.correctAnswers.includes(e.innerText) || w().memoizedProps.client.question.correctAnswers.includes(e.innerText) ? e.firstChild.style = "background-color: rgb(0, 207, 119);" : e.firstChild.style = "background-color: rgb(225, 40, 33);"
                }))
            } catch {}
            if ("kingdom" == v && (Array.from(document.getElementsByClassName("choiceESP")).forEach((e => e.remove())), g)) try {
                let e = {
                        materials: Array.from(document.querySelectorAll("div")).find((e => Array.from(e.children).find((e => e.className.includes("tree"))))),
                        people: Array.from(document.querySelectorAll("div")).find((e => Array.from(e.children).find((e => e.className.includes("users") && e.parentElement.className.includes("statContainer"))))),
                        happiness: Array.from(document.querySelectorAll("div")).find((e => Array.from(e.children).find((e => e.className.includes("grin"))))),
                        gold: Array.from(document.querySelectorAll("div")).find((e => Array.from(e.children).find((e => e.className.includes("coins")))))
                    },
                    t = w().stateNode.state.guest;
                Object.entries(t.yes).forEach((t => {
                    if ("msg" == t[0]) return;
                    let o = document.createElement("div");
                    o.className = "choiceESP", o.style = "font-size: 24px; color: rgb(75, 194, 46); font-weight: bolder;", o.innerText = String(t[1]), e[t[0]].appendChild(o)
                })), Object.entries(t.no).forEach((t => {
                    if ("msg" == t[0]) return;
                    let o = document.createElement("div");
                    o.className = "choiceESP", o.style = "font-size: 24px; color: darkred; font-weight: bolder;", o.innerText = String(t[1]), e[t[0]].appendChild(o)
                }))
            } catch (e) {}
            if ("crypto" == v && k) {
                let {
                    stage: e,
                    correctPassword: t
                } = Object.values(document.querySelector("#app > div > div"))[1].children[1]._owner.stateNode.state;
                "hack" == e && Array.from(document.querySelectorAll("div")).filter((e => e.innerHTML == t))[0].click()
            }
            if ("gold" == v && N) try {
                if ("prize" == w().stateNode.state.stage) {
                    let {
                        choices: e
                    } = w().stateNode.state, t = document.querySelector("div[class*='regularBody']").children[1];
                    t && (document.querySelectorAll(".chest-esp").length ? e.forEach(((e, o) => {
                        3 == t.children.length && t.children[o].children[1].innerText != e.text && (t.children[o].children[1].innerText = e.text)
                    })) : e.forEach(((e, o) => {
                        textElement = document.createElement("p"), textElement.className = "chest-esp", textElement.innerText = e.text, textElement.style = "text-align: center;\n                    font-size: 30px;\n                    color: white;\n                    font-family:Titan One;\n                    sans-serif;\n                    border-color: black;\n                    margin-top: 200px;";
                        try {
                            t.children[o].appendChild(textElement)
                        } catch (e) {
                            console.log(e)
                        }
                    })))
                }
            } catch (e) {
                console.log(e)
            }
        }));
        let v = T();

        function C(e) {
            let t = document.createElement("button");
            return t.classList.add("cheat"), t.innerText = e, t
        }

        function T(e) {
            switch (window.location.pathname.split("/")[2]) {
                case "gold":
                    return e ? "Gold Quest" : "gold";
                case "fishing":
                    return e ? "Fishing Frenzy" : "fishing";
                case "hack":
                    return e ? "Crypto Hack" : "crypto";
                case "battle-royale":
                    return e ? "Battle Royale" : "royale";
                case "factory":
                    return e ? "Factory" : "factory";
                case "racing":
                    return e ? "Racing" : "racing";
                case "classic":
                    return e ? "Classic" : "classic";
                case "defense2":
                    return e ? "Tower Defense 2" : "defense2";
                default:
                    switch (window.location.pathname.split("/")[1]) {
                        case "defense":
                            return e ? "Tower Defense" : "defense";
                        case "cafe":
                            return e ? "Café" : "cafe";
                        case "tower":
                            return e ? "Tower of Doom" : "doom";
                        case "kingdom":
                            return e ? "Crazy Kingdom" : "kingdom";
                        default:
                            return !1
                    }
            }
        }

        function M(e) {
            "KeyE" == e.code && (t.hidden = !t.hidden)
        }
        v && S[v] && Object.keys(S[v]).forEach((e => {
            let t = C(e);
            t.onclick = S[v][e], E.appendChild(t)
        })), E.childElementCount % 2 == 1 && (E.lastElementChild.style.cssText = "width: 350px;"), addEventListener("keypress", M)
    })();
});
