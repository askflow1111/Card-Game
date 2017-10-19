var cards = ["apple", "apple", "flower", "flower", "water", "water", "earth", "earth", "house", "house"];
var won = false;
var board = document.getElementById("game-board");
var cardsInPlay = [];
var flipallow = true;
var thiscard = [];
var scr = 0;
function nav(i) {
    var game = document.getElementById("game");
    var ins = document.getElementById("ins");
    var rope = document.querySelector(".rope");
    if (i === "game") {
        ins.style.display = "none";
        game.style.display = "flex";
        rope.style.display = "block";
    } else if (i === "ins") {
        game.style.display = "none";
        rope.style.display = "none";
        ins.style.display = "block";
    }
}
function createCards() {
    // for (var i = 0; i < cards.length; i += 1) {
    for (var i = 0; i < cards.length + 10; i += 1) {
        var container = document.createElement('div');
        container.className = 'container options';
        var card = document.createElement('div');
        card.id = 'card';
        container.appendChild(card);
        var front = document.createElement('figure');
        front.className = 'front';
        var back = document.createElement('figure');
        back.className = 'back';
        card.appendChild(front);
        card.appendChild(back);
        board.appendChild(container);
        var rndnumb = Math.floor(Math.random() * cards.length);
        // container.setAttribute('data-card', cards[i]);
        container.setAttribute('data-card', cards[rndnumb]);
        cards.splice(rndnumb, 1);
        container.setAttribute('count', 0);
        var con = document.querySelectorAll(".container");
        container.onclick = function(e) {
            if (this.hasAttribute('gotcard')) return false;
            if (flipallow === true) {
                this.firstChild.className = "flipped flippedfront";
                var data = this.getAttribute('data-card');
                var countdata = this.getAttribute('count');
                if (countdata == 1) {
                } else if (countdata == 0) {
                    this.firstChild.lastChild.style.backgroundImage = "url('images/" + data + ".jpg')";
                    cardsInPlay.push(data);
                    this.setAttribute('count', 1);
                }
            }
            var score = document.querySelector(".score");
            if (cardsInPlay.length === 2) {
                if (cardsInPlay[0] == cardsInPlay[1]) {
                    thiscard.push("Yes", "Yes");
                    scr += 2;
                    score.innerHTML = scr;
                    for (var a = 0; a < con.length; a += 1) {
                        if (con[a].getAttribute("count") == 1) {
                            con[a].className = "container";
                            con[a].setAttribute("gotcard", "Yes");
                            con[a].setAttribute("count", 2);
                            setTimeout(function() {
                                for (var b = 0; b < con.length; b += 1) {
                                    if (con[b].getAttribute("count") == 2) {
                                        con[b].firstChild.lastChild.style.backgroundImage = "url('images/won.jpg')";
                                    }
                                }
                            }, 1000);
                        }
                        if (thiscard.length == con.length) {
                            con[a].className += " tada";
                            $("#game-board").addClass('fadeOut');
                            setTimeout(function() {
                                $("#game-board").css({
                                    'display': "none"
                                });
                                document.querySelector("#bttn").className = "bttnv";
                                $(".rope").addClass('middle');
                            }, 4500);
                        }
                    }
                    cardsInPlay = [];
                }
                if (cardsInPlay[0] !== cardsInPlay[1]) {
                    scr -= 1;
                    score.innerHTML = scr;
                    cardsInPlay = [];
                    flipallow = false;
                    setTimeout(function() {
                        for (var b = 0; b < con.length; b += 1) {
                            if (con[b].getAttribute("gotcard") != "Yes") {
                                con[b].firstChild.className = "flipped";
                            }
                            con[b].setAttribute('count', 0);
                            flipallow = true;
                        }
                    }, 1000);
                }
            }
        }
    };
}
createCards();