var chess_field = dgebi("chess");
var bottom_titel = dgebi("bottom_titel");
var side_titel = dgebi("side_titel");

var card_field = dgebi("cards");

var alphabet_ = ["NL","A", "B", "C","D", "E",
    "F",
    "G",
    "H"
];

var main_allow_pointer_delay = 50;


//fillArea();
document.getElementById("all_container").style.height = innerHeight + "px";
console.log(innerHeight);

class Player
{
    constructor()
    {
        this.units_ = [];
        this.passed = true;
    }
    turn()
    {
        console.log(this.passed);
        if (this.passed) {
            turn();
        }
    }
}
var player = new Player();

class Unit
{
    constructor()
    {
        this.piece;
        this.cards_;
    }
}

class Piece {
    constructor() {
        this.dom = dce("div", "shared-piece");
        this.dom.setAttribute("chose", "0");
        this.dom.setAttribute("fixed-class", this.dom.getAttribute("class"));
        this.dom.onclick = this.select.bind(this);
        this.curr_field = [];
    }
    select()
    {
        if (event.target.getAttribute("chose") == "1") {
            this.unSelect();
            return;
        }
        //console.log(event,this);
        addClass(event.target, " shared-piece-selected");
        event.target.setAttribute("chose", "1");
        this.ownHandler();
    }
    unSelect()
    {
        resetClass(event.target, event.target.getAttribute("fixed-class"));
        event.target.setAttribute("chose", "0");
        document.querySelectorAll(".allowField").forEach(element => element.remove());
    }
    setField(field)
    {
        this.curr_field[0] = field[0];
        this.curr_field[1] = field[1];
    }
}


class Rock extends Piece {
    constructor() {
        super();
        //this.img = dce("svg", "piece-img");
        //this.img.innerHTML = "<use xlink:href='#rock'/>";
        // <use xlink:href="#bike" />
        this.img = dce("img", "piece-img");
        this.img.src = '../Content/Media/Pieces/Rock.svg';
        //this.img.style.background = "url('../Content/Media/Pieces/Rock.svg')";
        this.dom.appendChild(this.img);
    }
    ownHandler()
    {
        //console.log(this);
        //to bottom
        let id = this.curr_field[0];
        let jd = this.curr_field[1];
        let counter = 0;

        while (true) {
            id++;
            counter++;

            let target_field;

            if (document.querySelector('div[data-j="' + id + '"][data-i="' + jd + '"]')) {
                target_field = document.querySelector('div[data-j="' + id + '"][data-i="' + jd + '"]');
            } else {
                break;
            }
            let delay = counter * main_allow_pointer_delay;
            setAllowPointer([id, jd], delay);
        }
        //to right
        id = this.curr_field[0];
        jd = this.curr_field[1];
        counter = 0;

        while (true) {
            jd++;
            counter++;

            let target_field;

            if (document.querySelector('div[data-j="' + id + '"][data-i="' + jd + '"]')) {
                target_field = document.querySelector('div[data-j="' + id + '"][data-i="' + jd + '"]');
            } else {
                break;
            }
            let delay = counter * main_allow_pointer_delay;
            setAllowPointer([id, jd], delay);
        }
        //to left
        id = this.curr_field[0];
        jd = this.curr_field[1];
        counter = 0;

        while (true) {
            jd--;
            counter++;

            let target_field;

            if (document.querySelector('div[data-j="' + id + '"][data-i="' + jd + '"]')) {
                target_field = document.querySelector('div[data-j="' + id + '"][data-i="' + jd + '"]');
            } else {
                break;
            }

            let delay = counter * main_allow_pointer_delay;
            setAllowPointer([id, jd],delay);
        }
        //to top
        id = this.curr_field[0];
        jd = this.curr_field[1];
        counter = 0;

        while (true) {
            id--;
            counter++;

            let target_field;

            if (document.querySelector('div[data-j="' + id + '"][data-i="' + jd + '"]')) {
                target_field = document.querySelector('div[data-j="' + id + '"][data-i="' + jd + '"]');
            } else {
                break;
            }

            let delay = counter * main_allow_pointer_delay;
            setAllowPointer([id, jd], delay);
        }
    }
}



var pieceClasses_ = {
    "rock": new Rock()
}
function setAllowPointer(field, delay)
{
    //console.log("delay", delay);
    (function (field) {
        setTimeout(function () {
            let target_field = document.querySelector('div[data-j="' + field[0] + '"][data-i="' + field[1] + '"]');
            let pointer = createAllowPointer();
            target_field.appendChild(pointer);
        }, delay);
    })(field);
    
}
function createAllowPointer()
{
    let pointer = dce("div", "fullsize-container-pointer allowField");
    let pointer_container = dce("div", "allow-pointer-container");
    let pointer_img = dce("div", "allow-pointer");
    pointer_container.appendChild(pointer_img);
    pointer.appendChild(pointer_container);
    return pointer;
}
function setPieceInField(className,field)
{
    let piece;// = new Rock();//pieceClasses_[className];
    switch (className) {
        case "rock":
            piece = new Rock();
            piece.setField(field);
            break;
        default:
            break;
    }
    //let targetField = document.querySelectorAll('div[data-j="' + field[0] + '"]')
    let target_field = document.querySelector('div[data-j="' + field[0] + '"][data-i="' + field[1] + '"]');



    console.log(target_field);
    target_field.appendChild(piece.dom);
    //targetField = targetField.querySelectorAll('div[data-i="' + field[1] + '"]');
}


class ChessArea
{
    constructor()
    {
        this.dimensions_ = [8, 8];
        this.map_ = [];
        this.fillArea();
        //this.initializeMap();
        //console.log(this.map_);
    }
    fillArea()
    {
        for (var j = 0; j < this.dimensions_[1]; j++) {
            let line = dce("div", "fields-line");

            addToSideTitel(j);
            this.map_[j] = [];
            for (var i = 0; i < this.dimensions_[0]; i++) {
                let field = dce("div", "chess-field " + (j % 2 == 0 ? (i % 2 == 0 ? "bf" : "wf") : (i % 2 == 0 ? "wf" : "bf")));
                field.setAttribute("data-j", j);
                field.setAttribute("data-i", i);
                line.appendChild(field);
                field.onclick = player.turn.bind(player);

                if (j == 0) {
                    addToBottomTitel(i);
                }
                this.map_[j][i] = [];
            }
            chess_field.appendChild(line);
        }
    }
    setPieceInField(className, field)
    {
        let piece;// = new Rock();//pieceClasses_[className];
        switch (className) {
            case "rock":
                piece = new Rock();
                piece.setField(field);
                break;
            default:
                break;
        }
        //let targetField = document.querySelectorAll('div[data-j="' + field[0] + '"]')
        let target_field = document.querySelector('div[data-j="' + field[0] + '"][data-i="' + field[1] + '"]');



        console.log(target_field);
        target_field.appendChild(piece.dom);
        this.map_[field[0]][field[1]].push(piece);
        console.log(this.map_);
    }
}
var chessField = new ChessArea();
chessField.setPieceInField("rock", [1, 3]);


/*function fillArea()
{
    for (var j = 0; j < 8; j++) {
        let line = dce("div", "fields-line");

        addToBottomTitel(j);

        for (var i = 0; i < 8; i++) {
            let field = dce("div", "chess-field " + (j % 2 == 0 ? (i % 2 == 0 ? "bf" : "wf") : (i % 2 == 0 ? "wf" : "bf")));
            field.setAttribute("data-j", j);
            field.setAttribute("data-i", i);
            line.appendChild(field);
            field.onclick = turn;

            if (j == 0) {
                addToSideTitel(i);
            }
        }
        chess_field.appendChild(line);
    }

    for (var j = 0; j < 4; j++) {
        let line = dce("div", "fields-line");
        for (var i = 0; i < 4; i++) {
            //let field = dce("div", "card-field");
            //line.appendChild(field);
        }
    let field = dce("div", "card-field");
    //card_field.appendChild(field);
        //card_field.appendChild(line);
    }
}
*/



function addToSideTitel(num)
{
    let div = dce("div", "titel-piece");
    div.innerHTML = (num+1);
    side_titel.appendChild(div);
}
function addToBottomTitel(num)
{
    let div = dce("div","titel-piece");
    div.innerHTML = (alphabet_[num+1]);
    bottom_titel.appendChild(div);

}

function turn()
{
    //alert();
    //console.log("click");
    //console.log(event.target.getAttribute("data-j"));
    console.log(event.target);
    let turn = {

        i: event.target.getAttribute("data-i"),
        j: event.target.getAttribute("data-j")
    }
    let msg = JSON.stringify(turn);
    //socket.send(event.target.getAttribute("data-j")+"End");
    socket.send(msg);
}

    var socket,
        $txt = document.getElementById('message'),
        $user = document.getElementById('user'),
        $messages = document.getElementById('messages');

        if (typeof (WebSocket) !== 'undefined') {
        socket = new WebSocket("ws://localhost/WebApplication4/ChatHandler.ashx");
        } else {
        //ws://localhost:44372/WebApplication4/ChatHandler.ashx
        socket = new MozWebSocket("ws://localhost/WebApplication4/ChatHandler.ashx");
}
//socket.binaryType = ;



        socket.onmessage = function (msg) {
      //      var $el = document.createElement('p');
    //$el.innerHTML = msg.data;
            //$messages.appendChild($el);
            //console.log(msg.data, msg.data.length);
            //console.log(msg.data.slice(0, -1020)); instanceof ArrayBuffer
            //if (msg.data instanceof ArrayBuffer) {
            if (typeof msg.data == "string" ) {
                console.log('Received data string');
                let str = preParseJSON(msg.data)
                console.log("str",str);
                let obj = JSON.parse(str);
                console.log(obj.i,obj.j);
            }
            
};

        socket.onclose = function (event) {
        alert('Мы потеряли её. Пожалуйста, обновите страницу');
};

        //document.getElementById('send').onclick = function () {
        //socket.send($user.value + ' : ' + $txt.value);
    //$txt.value = '';
//};

//DosBox

function preParseJSON(str)
{
    let result = str;
    let counter = 0;
    for (var i = result.length-1; i > 0; i--) {
        if (result[i] == "}") {
            result = result.slice(0,-counter);
        }
        counter++;
    }
    if (i <= 0) {
        result = "{}";
    }
    return result;
}