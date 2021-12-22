var header = dgebi("header");
//var header_height = Number(getComputedStyle(header).height.slice(0, -2));
var header_height = header.offsetHeight;

//var crutch_1 = dgebi("relative_crutch_1");
//crutch_1.style.height = header_height + "px";
document.body.style.paddingTop = header_height + "px";

//var crutch_0 = dgebi("relative_crutch_0");
//var games_bar_section = dgebi("games_bar_section");




//console.log(header_height);


class HoldingContainer
{
    constructor(node_id,crutch_id)
    {
        this.triggered = false;
        this.header_triggered = false;
        this.to_absolute_triggered = false;

        this.dom = dgebi(node_id);
        this.crutch = dgebi(crutch_id);
        this.h = this.dom.getElementsByTagName("h1")[0];
        this.h.style.transition = "0.5s";

        this.to_absolute_y;
        this.from_absolute_y;

        this.top_value = 50;

        this.deAnchorer = dgebi("rating_sec");

        window.onload = function () {
            this.resize();


        }.bind(this);

    }
    resize()
    {
        this.h_height = this.h.offsetHeight;

        this.height = this.dom.offsetHeight;//getClientHeight(this.dom);

        this.y = getCoords(this.dom).top + this.h_height - this.top_value;//-50
        this.off_y = getCoords(this.dom).top - this.top_value;

        //console.log("height", this.height);

        scroll_bg.base_height = this.off_y + this.height;
        this.dom.style.width = window.innerWidth + "px";

        this.to_absolute_y = getCoords(this.deAnchorer).top - (this.height - this.h_height) - this.top_value;

    }
    scroll(direction)
    {
        //console.log(window.scrollY);

        if (!this.header_triggered) {
            if (window.scrollY > this.off_y) {
                this.h.style.opacity = 0;
                this.header_triggered = true;
            }
        } else {
            if (window.scrollY < this.off_y) {
                this.h.style.opacity = 1;
                this.header_triggered = false;

            }
        }

        if (!this.triggered) {

            if (window.scrollY > this.y) {
                this.fix();
                this.triggered = true;
            }
        } else
        {
            if (window.scrollY < this.y) {
                this.unfix();
                this.triggered = false;
                //this.h.style.opacity = 1;

            }
        }

        if (!this.to_absolute_triggered) {
            if (window.scrollY > this.to_absolute_y) {
                this.toAbsolute();
                this.to_absolute_triggered = true;
            }
        } else {
            if (window.scrollY < this.to_absolute_y) {
                this.fix();
                this.to_absolute_triggered = false;
                //this.h.style.opacity = 1;

            }
        }

    }
    fix()
    {
        this.dom.style.position = "fixed";
        this.dom.style.top = -this.h_height + this.top_value+"px";
        this.dom.style.zIndex = "5";

        this.dom.style.background = "linear-gradient(0deg, #000003 60%, #000003ff 100%)";

        this.crutch.style.height = this.height + "px";

        this.h.style.opacity = 0;

        this.dom.style.width = window.innerWidth + "px";
    }
    unfix()
    {
        this.dom.style.position = "relative";
        this.dom.style.background = "linear-gradient(0deg, #000003 60%, #00000355 100%)";
        this.crutch.style.height = 0 + "px";
        this.dom.style.top = "0px";
        this.h.style.opacity = 1;

    }
    toAbsolute()
    {
        this.dom.style.position = "absolute";
        //this.dom.style.background = "linear-gradient(0deg, #000003 60%, #00000355 100%)";
        //this.crutch.style.height = 0 + "px";
        this.dom.style.top = this.to_absolute_y + this.top_value - this.h_height + "px";
        //this.h.style.opacity = 1;
    }
    deAbsolute()
    {

    }
}

var holding_container = new HoldingContainer("games_bar_section", "relative_crutch_0");


class AppearAnimQuadratGridBg
{
    constructor(container_node)
    {
        this.lineStyle = "border:2px solid #00d;display:flex; flex-grow:1;min-height:300px;";
        this.blockStyle = "border:2px solid red; width:100px;height:100%;";
        this.domStyle = "display:flex;flex-direction:column;";

        this.container = container_node;
        this.dom = dce("div");
        this.dom.setAttribute("style",this.domStyle);
        this.container.appendChild(this.dom);


        this.createGrid();
    }
    createGrid()
    {
        let line;
        for (var i = 0; i < 2; i++) {
            line = dce("div");
            line.setAttribute("style", this.lineStyle);
            for (var j = 0; j < 10; j++) {
                let div = dce("div");
                div.setAttribute("style", this.blockStyle);
                line.appendChild(div);
            }
            this.dom.appendChild(line);
        }
    }
}

//var aaqgb = new AppearAnimQuadratGridBg(dgebi("appear_anim_bg"));


var scrollPos = 0;
var scroll_direction = 0;
document.onscroll = function () {

    if ((document.body.getBoundingClientRect()).top > scrollPos)
        scroll_direction = 1;
    else
        scroll_direction = -1;
    scrollPos = (document.body.getBoundingClientRect()).top;

    //console.log(event);
    scroll_bg.scroll(scroll_direction);
    holding_container.scroll(scroll_direction);
}

document.addEventListener("keyup", keyUpHandler, false);
function keyUpHandler(e) {
    //console.log(e);
    if (e.key == "z") {
        handler.stop();

        classic_games_bar.setByData(classic_games_data);
        //handler.createCircleExplosion(board.checkers_[0]);

        //handler.players_[0].ids_.splice(0, 1);

        //handler.draw();
    }
    if (e.key == "c") {

        //handler.exp_circles_[0].trigger();
    }
    if (e.key == "x") {
        //handler.start();

        //handler.startGameOverAnimation();
    }
}

window.addEventListener("load", pageOnLoad, false);
function pageOnLoad()
{

    setTimeout(function(){
        handler.start();
    }, 2000);

    scroll_bg.scroll(1);
    holding_container.scroll(1);
}

window.onresize = function ()
{
    holding_container.unfix();
    holding_container.resize();

    console.log("resized");
}
