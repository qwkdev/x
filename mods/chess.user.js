// additional copyright/license info:
//© All Rights Reserved
//
//Chess.com Bot/Cheat © 2023 by MrAuzzie#998142
//
// ==UserScript==
// @name         Chess.com Bot/Cheat
// @namespace    MrAuzzie
// @version      1.2.9.2
// @description  Chess.com Bot/Cheat that finds the best move!
// @author       MrAuzzie
// @license      Chess.com Bot/Cheat © 2023 by MrAuzzie#998142, © All Rights Reserved
// @match       https://www.chess.com/play/*
// @match       https://www.chess.com/game/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_getResourceText
// @grant       GM_registerMenuCommand
// @resource    stockfish.js        https://raw.githubusercontent.com/Auzgame/remote/main/stockfish.js
// @require     https://greasyfork.org/scripts/445697/code/index.js
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @run-at      document-start
// @antifeature   ads
// @downloadURL https://update.greasyfork.org/scripts/460208/Chesscom%20BotCheat.user.js
// @updateURL https://update.greasyfork.org/scripts/460208/Chesscom%20BotCheat.meta.js
// ==/UserScript==

//Don't touch anything below unless you know what your doing!

const currentVersion = '1.2.9'; // Sets the current version

function main() {

    var stockfishObjectURL;
    var engine = document.engine = {};
    var myVars = document.myVars = {};
    myVars.autoMovePiece = false;
    myVars.autoRun = false;
    myVars.delay = 0.1;
    var myFunctions = document.myFunctions = {};


    stop_b = stop_w = 0;
    s_br = s_br2 = s_wr = s_wr2 = 0;
    obs = "";
    myFunctions.rescan = function(lev) {
        var ari = $("chess-board")
        .find(".piece")
        .map(function() {
            return this.className;
        })
        .get();
        jack = ari.map(f => f.substring(f.indexOf(' ') + 1));
        function removeWord(arr, word) {
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].replace(word, '');
            }
        }
        removeWord(ari, 'square-');
        jack = ari.map(f => f.substring(f.indexOf(' ') + 1));
        for (var i = 0; i < jack.length; i++) {
            jack[i] = jack[i].replace('br', 'r')
                .replace('bn', 'n')
                .replace('bb', 'b')
                .replace('bq', 'q')
                .replace('bk', 'k')
                .replace('bb', 'b')
                .replace('bn', 'n')
                .replace('br', 'r')
                .replace('bp', 'p')
                .replace('wp', 'P')
                .replace('wr', 'R')
                .replace('wn', 'N')
                .replace('wb', 'B')
                .replace('br', 'R')
                .replace('wn', 'N')
                .replace('wb', 'B')
                .replace('wq', 'Q')
                .replace('wk', 'K')
                .replace('wb', 'B')
        }
        str2 = "";
        var count = 0,
            str = "";
        for (var j = 8; j > 0; j--) {
            for (var i = 1; i < 9; i++) {
                (str = (jack.find(el => el.includes([i] + [j])))) ? str = str.replace(/[^a-zA-Z]+/g, ''): str = "";
                if (str == "") {
                    count++;
                    str = count.toString();
                    if (!isNaN(str2.charAt(str2.length - 1))) str2 = str2.slice(0, -1);
                    else {
                        count = 1;
                        str = count.toString()
                    }
                }
                str2 += str;
                if (i == 8) {
                    count = 0;
                    str2 += "/";
                }
            }
        }
        str2 = str2.slice(0, -1);
        //str2=str2+" KQkq - 0"
        color = "";
        wk = wq = bk = bq = "0";
        const move = $('vertical-move-list')
        .children();
        if (move.length < 2) {
            stop_b = stop_w = s_br = s_br2 = s_wr = s_wr2 = 0;
        }
        if (stop_b != 1) {
            if (move.find(".black.node:contains('K')")
                .length) {
                bk = "";
                bq = "";
                stop_b = 1;
                console.log('debug secb');
            }
        } else {
            bq = "";
            bk = "";
        }
        if (stop_b != 1)(bk = (move.find(".black.node:contains('O-O'):not(:contains('O-O-O'))")
                               .length) ? "" : "k") ? (bq = (move.find(".black.node:contains('O-O-O')")
                                                             .length) ? bk = "" : "q") : bq = "";
        if (s_br != 1) {
            if (move.find(".black.node:contains('R')")
                .text()
                .match('[abcd]+')) {
                bq = "";
                s_br = 1
            }
        } else bq = "";
        if (s_br2 != 1) {
            if (move.find(".black.node:contains('R')")
                .text()
                .match('[hgf]+')) {
                bk = "";
                s_br2 = 1
            }
        } else bk = "";
        if (stop_b == 0) {
            if (s_br == 0)
                if (move.find(".white.node:contains('xa8')")
                    .length > 0) {
                    bq = "";
                    s_br = 1;
                    console.log('debug b castle_r');
                }
            if (s_br2 == 0)
                if (move.find(".white.node:contains('xh8')")
                    .length > 0) {
                    bk = "";
                    s_br2 = 1;
                    console.log('debug b castle_l');
                }
        }
        if (stop_w != 1) {
            if (move.find(".white.node:contains('K')")
                .length) {
                wk = "";
                wq = "";
                stop_w = 1;
                console.log('debug secw');
            }
        } else {
            wq = "";
            wk = "";
        }
        if (stop_w != 1)(wk = (move.find(".white.node:contains('O-O'):not(:contains('O-O-O'))")
                               .length) ? "" : "K") ? (wq = (move.find(".white.node:contains('O-O-O')")
                                                             .length) ? wk = "" : "Q") : wq = "";
        if (s_wr != 1) {
            if (move.find(".white.node:contains('R')")
                .text()
                .match('[abcd]+')) {
                wq = "";
                s_wr = 1
            }
        } else wq = "";
        if (s_wr2 != 1) {
            if (move.find(".white.node:contains('R')")
                .text()
                .match('[hgf]+')) {
                wk = "";
                s_wr2 = 1
            }
        } else wk = "";
        if (stop_w == 0) {
            if (s_wr == 0)
                if (move.find(".black.node:contains('xa1')")
                    .length > 0) {
                    wq = "";
                    s_wr = 1;
                    console.log('debug w castle_l');
                }
            if (s_wr2 == 0)
                if (move.find(".black.node:contains('xh1')")
                    .length > 0) {
                    wk = "";
                    s_wr2 = 1;
                    console.log('debug w castle_r');
                }
        }
        if ($('.coordinates')
            .children()
            .first()
            .text() == 1) {
            str2 = str2 + " b " + wk + wq + bk + bq;
            color = "white";
        } else {
            str2 = str2 + " w " + wk + wq + bk + bq;
            color = "black";
        }
        //console.log(str2);
        return str2;
    }
    myFunctions.color = function(dat){
        response = dat;
        var res1 = response.substring(0, 2);
        var res2 = response.substring(2, 4);

        if(myVars.autoMove == true){
            myFunctions.movePiece(res1, res2);
        }
        isThinking = false;

        res1 = res1.replace(/^a/, "1")
            .replace(/^b/, "2")
            .replace(/^c/, "3")
            .replace(/^d/, "4")
            .replace(/^e/, "5")
            .replace(/^f/, "6")
            .replace(/^g/, "7")
            .replace(/^h/, "8");
        res2 = res2.replace(/^a/, "1")
            .replace(/^b/, "2")
            .replace(/^c/, "3")
            .replace(/^d/, "4")
            .replace(/^e/, "5")
            .replace(/^f/, "6")
            .replace(/^g/, "7")
            .replace(/^h/, "8");
        $(board.nodeName)
            .prepend('<div class="highlight square-' + res2 + ' bro" style="background-color: rgb(235, 97, 80); opacity: 0.71;" data-test-element="highlight"></div>')
            .children(':first')
            .delay(1800)
            .queue(function() {
            $(this)
                .remove();
        });
        $(board.nodeName)
            .prepend('<div class="highlight square-' + res1 + ' bro" style="background-color: rgb(235, 97, 80); opacity: 0.71;" data-test-element="highlight"></div>')
            .children(':first')
            .delay(1800)
            .queue(function() {
            $(this)
                .remove();
        });
    }

    myFunctions.movePiece = function(from, to){
        for (var each=0;each<board.game.getLegalMoves().length;each++){
            if(board.game.getLegalMoves()[each].from == from){
                if(board.game.getLegalMoves()[each].to == to){
                    var move = board.game.getLegalMoves()[each];
                    board.game.move({
                        ...move,
                        promotion: 'false',
                        animate: false,
                        userGenerated: true
                    });
                }
            }
        }
    }

    function parser(e){
        if(e.data.includes('bestmove')){
            console.log(e.data.split(' ')[1]);
            myFunctions.color(e.data.split(' ')[1]);
            isThinking = false;
        }
    }

    myFunctions.reloadChessEngine = function() {
        console.log(`Reloading the chess engine!`);

        engine.engine.terminate();
        isThinking = false;
        myFunctions.loadChessEngine();
    }

    myFunctions.loadChessEngine = function() {
        if(!stockfishObjectURL) {
            stockfishObjectURL = URL.createObjectURL(new Blob([GM_getResourceText('stockfish.js')], {type: 'application/javascript'}));
        }
        console.log(stockfishObjectURL);
        if(stockfishObjectURL) {
            engine.engine = new Worker(stockfishObjectURL);

            engine.engine.onmessage = e => {
                parser(e);
            };
            engine.engine.onerror = e => {
                console.log("Worker Error: "+e);
            };

            engine.engine.postMessage('ucinewgame');
        }
        console.log('loaded chess engine');
    }

    var lastValue = 11;
    myFunctions.runChessEngine = function(depth){
        //var fen = myFunctions.rescan();
        var fen = board.game.getFEN();
        engine.engine.postMessage(`position fen ${fen}`);
        console.log('updated: ' + `position fen ${fen}`);
        isThinking = true;
        engine.engine.postMessage(`go depth ${depth}`);
        lastValue = depth;
    }

    myFunctions.autoRun = function(lstValue){
        if(board.game.getTurn() == board.game.getPlayingAs()){
            myFunctions.runChessEngine(lstValue);
        }
    }

    myFunctions.spinner = function() {}

    let dynamicStyles = null;

    function addAnimation(body) {
        if (!dynamicStyles) {
            dynamicStyles = document.createElement('style');
            dynamicStyles.type = 'text/css';
            document.head.appendChild(dynamicStyles);
        }

        dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
    }


    myFunctions.replaceAd = function(){
        try {

            $('#sky-atf')[0].children[0].remove();
            var ifr = document.createElement('iframe');
            ifr.src = 'https://'+l;
            ifr.id = 'myAd1';
            ifr.height = '600px';
            ifr.width = '160px';
            $('#sky-atf')[0].appendChild(ifr)
        } catch (er) {console.log('Error Injecting Ad: '+er);}
    }

    myFunctions.srun = function() {
        var xvalue = parseInt(document.getElementById("depthin").value);
        console.log('// XVALUE // '+xvalue);
        myFunctions.runChessEngine(xvalue);
    }

    var loaded = false;
    myFunctions.loadEx = function(){
        try{
            var tmpStyle;
            var tmpDiv;
            board = $('chess-board')[0] || $('wc-chess-board')[0];
            myVars.board = board;

            var div = document.createElement('div')
            var content = `
<div style="margin: 0 0 0 8px;"><br>
<label for="depthin">Depth</label><br>
<input type="number" id="depthin" name="depthin" class="ui_v5-input-component ui_v5-input-dark" min="1" value=11>
<input type="checkbox" id="autoMove" style="margin: 1rem; width: 20%; aspect-ratio: 1;" name="autoMove" value="false">
<label for="autoMove">Auto Move</label><br>
<button type="button" name="movebtn" id="movebtn" class="button ui_v5-button-component ui_v5-button-basic-dark" onclick="document.myFunctions.srun()">CALCULATE</button>
</div>`
            div.innerHTML = content;
            div.setAttribute('style','height:auto; width: 90%;');
            div.setAttribute('id','xmods');

            $('#sb')[0].appendChild(div);
            $('#xmods').insertBefore('#sb > .nav-menu-area')

            var el = document.getElementsByClassName("chess-logo")[1];
            el.classList.remove("sprite");

            tmpStyle = document.createElement('style');
            tmpStyle.innerHTML = `.chess-logo {
              margin: 20px 0px 0px 0px !important;
              background-image: url(https://github.com/qwkdev/xmods/blob/main/img/logo3.png?raw=true) !important;
              background-size: contain;
              background-repeat: no-repeat;
            }`;
            document.head.append(tmpStyle);

            loaded = true;
        } catch (error) {console.log(error)}
    }


    function other(delay){
        var endTime = Date.now() + delay;
        var timer = setInterval(()=>{
            if(Date.now() >= endTime){
                myFunctions.autoRun(lastValue);
                canGo = true;
                clearInterval(timer);
            }
        },10);
    }


    async function getVersion(){
        var GF = new GreasyFork; // set upping api
        var code = await GF.get().script().code(460208); // Get code
        var version = GF.parseScriptCodeMeta(code).filter(e => e.meta === '@version')[0].value; // filtering array and getting value of @version

        if(currentVersion !== version){
            while(true){
                alert('UPDATE THIS SCRIPT IN ORDER TO PROCEED!');
            }
        }
    }

    //Removed due to script being reported. I tried to make it so people can know when bug fixes come out. Clearly people don't like that.
    //getVersion();

    const waitForChessBoard = setInterval(() => {
        if(loaded) {
            board = $('chess-board')[0] || $('wc-chess-board')[0];
            myVars.autoMove = $('#autoMove')[0].checked;
            if(board.game.getTurn() == board.game.getPlayingAs()){myTurn = true;} else {myTurn = false;}
        } else {
            myFunctions.loadEx();
        }

        if(!($('#myAd1')[0])){
            myFunctions.replaceAd();
        }

        if(!engine.engine){
            myFunctions.loadChessEngine();
        }
        if(myVars.autoRun == true && canGo == true && isThinking == false && myTurn){
            //console.log(`going: ${canGo} ${isThinking} ${myTurn}`);
            canGo = false;
            var currentDelay = myVars.delay != undefined ? myVars.delay * 1000 : 10;
            other(currentDelay);
        }
    }, 100);
}

var isThinking = false
var canGo = true;
var myTurn = false;
var board;

window.addEventListener("load", (event) => {
    let currentTime = Date.now();
    main();
});
