class Layer {
    constructor(cvs, container, zIndex = -1) {
        this.dom = dce("canvas", "pseudo-fixed");
        this.ctx = this.dom.getContext("2d");
        this.dom.width = cvs.width;
        this.dom.height = cvs.height;

        this.dom.style.width = Number((getComputedStyle(cvs).width).slice(0, -2));
        this.dom.style.height = Number((getComputedStyle(cvs).height).slice(0, -2));

        this.dom.style.zIndex = zIndex;

        container.appendChild(this.dom);
        //this.dom.style.background = "#f00";
        this.cadres_ = [];

    }
    fillADistIn(checker) {
        this.ctx.clearRect(0, 0, this.dom.width, this.dom.height);
        for (var i = 0; i < board.fields_.length; i++) {

            //board.fields_[i].drawByContext(this.ctx);
            for (var j = 0; j < board.fields_[i].length; j++) {

                board.fields_[i][j].drawByContext(this.ctx);
                //console.log("f");
            }
        }
        //lineFTByContext(this.ctx, this.start_x, this.start_y, checker.cur_x, checker.cur_y, checker.over_radius*2, "#F00");
        this.ctx.beginPath();
        this.ctx.globalCompositeOperation = "destination-in";
        this.ctx.lineWidth = checker.over_radius * 3;

        this.ctx.moveTo(this.start_x, this.start_y);
        this.ctx.lineTo(checker.cur_x, checker.cur_y);
        this.ctx.stroke();

        this.ctx.closePath();



        this.ctx.beginPath();

        //this.ctx.globalAlpha = alpha;
        //this.ctx.globalCompositeOperation = "source-over";
        this.ctx.globalCompositeOperation = "destination-in";
        this.ctx.globalAlpha = 1;
        this.ctx.arc(this.start_x, this.start_y, checker.over_radius, 0, Math.PI * 2);
        //this.ctx.fillStyle = color[0] == '#' ? color : "#" + color;
        //this.ctx.fill();



        this.ctx.lineWidth = checker.over_radius * 2;
        //this.ctx.moveTo(this.start_x, this.start_y);
        //this.ctx.lineTo(checker.cur_x, checker.cur_y);
        //this.ctx.rect(this.start_x, this.start_y, checker.cur_x, checker.cur_y);
        this.ctx.arc(checker.cur_x, checker.cur_y, checker.over_radius, 0, Math.PI * 2);
        //this.ctx.globalCompositeOperation = "destination-in";

        //this.ctx.strokeStyle = "#f00";
        //this.ctx.stroke();

        this.ctx.fillStyle = "#f00";
        //this.ctx.fill();
        this.ctx.closePath();
        this.ctx.globalCompositeOperation = "source-over";



        //fillADistInByContext(this.ctx, this.start_x, this.start_y, checker.over_radius + 20);
        //lineFTGCOByContext(this.ctx, "destination-over", this.start_x, this.start_y, checker.cur_x, checker.cur_y, checker.over_radius);

        fillADistOutByContext(this.ctx, checker.cur_x, checker.cur_y, checker.over_radius - 20);
    }
    fillADistOut(x, y, radius) {
        fillADistOutByContext(this.ctx, x, y, radius - 20);
    }
    drawRect(x, y, dx, dy, color, opacity) {
        fillRByContext(this.ctx, x, y, dx, dy, color, opacity);
    }
    setStartCoords(x, y) {
        this.start_x = x;
        this.start_y = y;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.dom.width, this.dom.height);
    }
}


class QuadratPiece {
    constructor(x, y, wh, angle) {
        this.x = x;//-wh/2;
        this.y = y;// - wh / 2;
        this.wh = wh;
        this.wh_div2 = this.wh / 2;
        this.angle = angle;

        this.speed = 10;
        this.speed_dx = -0.1;

        this.dx = Math.cos(this.angle) * this.speed;
        this.dy = Math.sin(this.angle) * this.speed;
        //console.log(this.dx);
        //console.log(this.dy);
        this._active = true;

        this.color = "ff0";
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        fillRByContext(ctx, -this.wh_div2, -this.wh_div2, this.wh, this.wh, this.color);
        //fillRByContext(pseudoCanvasTop.ctx, this.x, this.y, this.wh, this.wh, "ff0");

        ctx.restore();

    }
    main() {
        this.x += this.dx;
        this.y += this.dy;

        this.speed += this.speed_dx;
        if (this.speed < 0) {
            this._active = false;
            console.log("f");
            this.angle += 3;
            this.speed = 10;

        }
        this.angle += 0.01;

        this.dx = Math.cos(this.angle) * this.speed;
        this.dy = Math.sin(this.angle) * this.speed;
    }
    changeColor(color) {
        this.color = color
    }
}

class CircleExplosion {
    constructor(x, y, radius, lw,context) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.lw = lw;
        this.pieces_ = [];
        this.create();

        this.ctx = context;
    }
    create() {
        for (var i = 0; i < Math.PI * 2; i += 0.4) {
            this.createPiece(i);
        }
        //console.log(this);
        this.draw();
    }
    createPiece(num) {
        let x = this.x + Math.cos(num) * this.radius;
        let y = this.y + Math.sin(num) * this.radius;

        //let y = this.y + (Math.PI * 2 / 10) * num;

        let piece = new QuadratPiece(x, y, 10, num);
        this.pieces_.push(piece);
    }
    main() {
        //pseudoCanvasTop.clear();
        for (var i = 0; i < this.pieces_.length; i++) {
            this.pieces_[i].main();
            this.pieces_[i].draw(this.ctx);
            if (!this.pieces_[i]._active) {
                //this.pieces_.splice(i,1);
                //this.pieces_[i].changeColor("#" + hex(getRandomInt(16)) + hex(getRandomInt(16)) + hex(getRandomInt(16)));
                let color = "#" + hex(getRandomInt(16)) + hex(getRandomInt(16)) + hex(getRandomInt(16));
                for (var j = 0; j < this.pieces_.length; j++) {
                    this.pieces_[j].changeColor(color);
                    this.pieces_[j]._active = true;
                }
                continue;
            }
            //console.log(this.pieces_[i]);
        }
        setTimeout(this.main.bind(this), 10);
    }
    draw() {
        strokeAByContext(pseudoCanvasTop.ctx, this.x, this.y, this.radius, "F00", this.lw);
        for (var i = 0; i < this.pieces_.length; i++) {
            this.pieces_[i].draw(this.ctx);
            //console.log(this.pieces_[i]);
        }
    }
}




//var cvs = 

class EditableText
{
    constructor(text, func, container)
    {
        this.text = text;
        this.func = func;


        this.dom = dce("div", "editable-text-container");
        this.editable = dce("div", "editable-text");
        this.editable.setAttribute("contenteditable","true");
        this.editable.innerHTML = text;

        this.dom.appendChild(this.editable);
        this.editable.addEventListener("input", this.func, false);
        this.editable.addEventListener("keydown", this.keyDown.bind(this), false);

        container.appendChild(this.dom);
    }
    cancel()
    {
        this.func();
    }
    keyDown(e)
    {
        if (e.keyCode == 13) {
            e.preventDefault();
            //console.log(e.target);
            this.text = this.editable.innerHTML;
            e.target.blur();
        }
        if (e.keyCode == 27) {
            e.preventDefault();
            //console.log(e.target);
            this.editable.innerHTML = this.text;
            this.cancel();
            e.target.blur();

        }
    }
}

class LayersPanel
{
    constructor()
    {
        this.dom = dce("div","layers-panel-container");
        //this.dom.addEventListener("");
        this.init();
    }
    init()
    {
        this.layers_list = dce("div", "layers-panel-layers-list");
        this.toolbox = dce("div", "layers-panel-toolbox");
        this.dom.appendChild(this.layers_list);
        this.dom.appendChild(this.toolbox);
    }

}


class DrawSpace {
    constructor(width = 100,height = 100)
    {
        this.dom = dce("div", "window-draw-space");

        this.width = width;
        this.height = height;

        this.pix_width = width;
        this.pix_height = height;

        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";

        this.layers_ = [];
    }
}

class Window
{
    //constructor(canvas,container,name)
    constructor(container, name)
    {
        this.window = dce("div", "window");
        container.appendChild(this.window);

        this.name = name


        this.layers_container = container;

        //this.canvas_sample = canvas;
        this.layers_ = [];

        this.cadres_id = 0;

        this.initWindow();
        this.initLayersPanel();
    }
    initWindow()
    {
        this.header = dce("div", "window-header");

        this.name_box = dce("div", "window-header-name-box");

        let edit_text = new EditableText("window0", this.changeName.bind(this), this.name_box);

        //this.name_box.appendChild(edit_text.dom);

        this.header.appendChild(this.name_box);


        this.draw_space = new DrawSpace();

        this.draw_space_container = dce("div", "window-draw-space-container");
        this.draw_space_container.appendChild(this.draw_space.dom);

        this.window.appendChild(this.header);
        this.window.appendChild(this.draw_space_container);

    }
    initLayersPanel()
    {
        this.layersPanel = new LayersPanel();
        this.layers_container.appendChild(this.layersPanel.dom);
    }
    addLayer()
    {
        let layer = new Layer(this.canvas_sample, this.layers_container, this.layers_.length);
        this.layers_.push(layer);
        this.draw_space.appendChild(layer.dom);
    }
    changeName()
    {
        this.name = event.target.innerHTML;
        //console.log(this);
    }
}


let canvas0 = dce("canvas", "pseudo-fixed");

canvas0.width = 1000;
canvas0.height = 1000;

//var window = new Window(canvas0, dgebi("everything_container"),"window1");
var window = new Window(dgebi("everything_container"), name);

//window.addLayer();

document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("click", mouseClickHandler,false);

function mouseClickHandler() {

}

function keyUpHandler(e) {
    //console.log(e);
    /*if (e.key == "z") {
        //handler.stop();
        //handler.createCircleExplosion(board.checkers_[0]);

    }
    if (e.key == "x") {
        handler.start();
    }*/
}