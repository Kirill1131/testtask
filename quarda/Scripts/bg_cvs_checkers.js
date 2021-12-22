var cvs = dgebi("bg_cvs");
var ctx = cvs.getContext("2d");
//strokeR(0, 0, 25, 25);
class PseudoCanvas
{
    constructor(cvs,container,zIndex = -1)
    {
        this.dom = dce("canvas", "pseudo-fixed");
        this.ctx = this.dom.getContext("2d");
        this.dom.width = cvs.width;
        this.dom.height = cvs.height;

        this.dom.style.width = Number((getComputedStyle(cvs).width).slice(0, -2));
        this.dom.style.height = Number((getComputedStyle(cvs).height).slice(0, -2));

        this.dom.style.zIndex = zIndex;

        container.appendChild(this.dom);
        //this.dom.style.background = "#f00";

        this.start_x;
        this.start_y;
    }
    fillADestIn(checker)
    {
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
        this.ctx.lineWidth = checker.over_radius * 2;

        this.ctx.moveTo(this.start_x, this.start_y);
        this.ctx.lineTo(checker.cur_x, checker.cur_y);
        this.ctx.stroke();

        this.ctx.closePath();



        this.ctx.beginPath();

        //this.ctx.globalAlpha = alpha;
        //this.ctx.globalCompositeOperation = "source-over";
        this.ctx.globalCompositeOperation = "destination-in";
        this.ctx.globalAlpha = 1;
        this.ctx.arc(this.start_x, this.start_y, checker.over_radius, 0, Math.PI*2);
        //this.ctx.fillStyle = color[0] == '#' ? color : "#" + color;
        //this.ctx.fill();



        this.ctx.lineWidth = checker.over_radius*2;
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



        //fillADestInByContext(this.ctx, this.start_x, this.start_y, checker.over_radius + 20);
        //lineFTGCOByContext(this.ctx, "destination-over", this.start_x, this.start_y, checker.cur_x, checker.cur_y, checker.over_radius);

        fillADestOutByContext(this.ctx, checker.cur_x, checker.cur_y, checker.over_radius - 20);
    }
    fillADestOut(x,y,radius)
    {
        fillADestOutByContext(this.ctx, x, y, radius- 20);
    }
    drawRect(x,y,dx,dy,color,opacity)
    {
        fillRByContext(this.ctx, x, y, dx, dy, color, opacity);
    }
    setStartCoords(x,y)
    {
        this.start_x = x;
        this.start_y = y;
    }
    clear()
    {
        this.ctx.clearRect(0, 0, this.dom.width, this.dom.height);
    }
    fixImage()
    {
        this.image_data = this.ctx.getImageData(0, 0, cvs.width, cvs.height);
    }
}
var pseudoCanvas = new PseudoCanvas(cvs, dgebi("canvas_container"));

var pseudoCanvasBottomHelp = new PseudoCanvas(cvs, dgebi("canvas_container"));
var pseudoCanvasBottom = new PseudoCanvas(cvs, dgebi("canvas_container"));
var pseudoCanvasExplosions = new PseudoCanvas(cvs, dgebi("canvas_container"), 21);
var pseudoCanvasExplosionsFixImage = new PseudoCanvas(cvs, dgebi("canvas_container"), 20);

var pseudoCanvasTop = new PseudoCanvas(cvs, dgebi("canvas_container"), 22);



//pseudoCanvas.drawRect(0, 0, pseudoCanvas.dom.width, pseudoCanvas.dom.height);

class Field
{
    constructor(x,y,wh,color)
    {
        this.x = x;
        this.y = y;
        this.wh = wh;
        this.color = color.hex;
        this.opacity = color.opacity

        this.empty = true;
        this.owner_id = -1;

        this.checker_id;
        this.id = [];
    }
    draw()
    {
        pseudoCanvasBottom.drawRect(this.x, this.y, this.wh, this.wh, this.color, this.opacity);
        //fillR(this.x, this.y, this.wh, this.wh, this.color, this.opacity);
        //this.log();
    }
    drawByContext(local_ctx)
    {
        fillRByContext(local_ctx, this.x, this.y, this.wh, this.wh, this.color, this.opacity);
        //console.log(local_ctx);
    }
    log()
    {
        fillT(this.id[0] + " " + this.id[1], this.x + 50, this.y + 50, 20, "fff");


        fillT(this.checker_id, this.x + 70, this.y + 70, 20, "fff");

        if (this.owner_id == 1) {
            fillT(this.owner_id, this.x + 50, this.y + 70, 20, "0ff");
            fillT(this.checker_id, this.x + 70, this.y + 70, 20, "0ff");

        }
        if (this.owner_id == 0) {
            fillT(this.owner_id, this.x + 50, this.y + 70, 20, "f00");
            fillT(this.checker_id, this.x + 70, this.y + 70, 20, "f00");

        }
        if (this.owner_id == -1) {
            fillT(this.owner_id, this.x + 50, this.y + 70, 20, "0f0");
        }
        if (this.empty) {
            fillR(this.x, this.y, 15, 15, "#0f0", 1);

        } else {
            fillR(this.x, this.y, 15, 15, "#f00", 1);

        }
    }
}

class QuadratPiece
{
    constructor(x,y,wh,angle)
    {
        this.x = x;//-wh/2;
        this.y = y;// - wh / 2;
        this.wh = wh;
        this.wh_div2 = this.wh / 2;
        this.angle = angle;

        this.speed = 5 + getRandomInt(5);
        this.speed_dx = -1.0 + Math.random()/2;

        this.dx = Math.cos(this.angle) * this.speed;
        this.dy = Math.sin(this.angle) * this.speed;
        //console.log(this.dx);
        //console.log(this.dy);
        this._active = true;

        this.color = "fff";
    }
    draw()
    {
        pseudoCanvasExplosions.ctx.save();
        pseudoCanvasExplosions.ctx.translate(this.x , this.y );
        pseudoCanvasExplosions.ctx.rotate(this.angle);
        fillRByContext(pseudoCanvasExplosions.ctx, -this.wh_div2, -this.wh_div2, this.wh, this.wh, this.color);
        //fillRByContext(pseudoCanvasTop.ctx, this.x, this.y, this.wh, this.wh, "ff0");

        pseudoCanvasExplosions.ctx.restore();

    }
    main()
    {
        this.x += this.dx;
        this.y += this.dy;

        this.speed += this.speed_dx;
        if (this.speed < 0) {
            this._active = false;
            //console.log("f");
            //this.angle += 3;
            //this.speed = 10;

        }
        //this.angle += 0.05;

        //this.dx = Math.cos(this.angle) * this.speed;
        //this.dy = Math.sin(this.angle) * this.speed;
    }
    changeColor(color)
    {
        this.color = color
    }
    fixImage()
    {
        
        pseudoCanvasExplosionsFixImage.ctx.save();
        pseudoCanvasExplosionsFixImage.ctx.translate(this.x, this.y);
        pseudoCanvasExplosionsFixImage.ctx.rotate(this.angle);
        fillRByContext(pseudoCanvasExplosionsFixImage.ctx, -this.wh_div2, -this.wh_div2, this.wh, this.wh, "#fff",0.5);
        //fillRByContext(pseudoCanvasTop.ctx, this.x, this.y, this.wh, this.wh, "ff0");

        pseudoCanvasExplosionsFixImage.ctx.restore();
    }
    changeAngle(angle)
    {
        this.angle = angle - 0.2 + Math.random(1.4);
        this.dx = -Math.cos(this.angle) * this.speed;
        this.dy = -Math.sin(this.angle) * this.speed;
    }
}

class CircleExplosion
{
    constructor(x, y, radius, lw, blur_color,id)
    {
        this.id = id;

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.lw = lw;
        this.pieces_ = [];
        this.create();

        this.blur_color = blur_color

        this._thiggered = false;
    }
    create()
    {
        for (var i = 0; i < Math.PI*2; i+=0.1) {
            this.createPiece(i);
        }
        //console.log(this);
        this.draw();
    }
    createPiece(num)
    {
        let x = this.x + Math.cos(num) * this.radius;
        let y = this.y + Math.sin(num) * this.radius;

        //let y = this.y + (Math.PI * 2 / 10) * num;

        let piece = new QuadratPiece(x,y,4,num);
        this.pieces_.push(piece);
    }
    main()
    {
        pseudoCanvasExplosions.clear();
        for (var i = 0; i < this.pieces_.length; i++) {
            if (this.pieces_[i]._active) {
                this.pieces_[i].main();
                this.pieces_[i].draw();
            } else {
            //if (!this.pieces_[i]._active) {
                this.pieces_[i].fixImage();
                this.pieces_.splice(i, 1);
                //this.pieces_[i].changeColor("#" + hex(getRandomInt(16)) + hex(getRandomInt(16)) + hex(getRandomInt(16)));
                /*let color = "#" + hex(getRandomInt(16)) + hex(getRandomInt(16)) + hex(getRandomInt(16));
                for (var j = 0; j < this.pieces_.length; j++) {
                    this.pieces_[j].changeColor(color);
                    this.pieces_[j]._active = true;
                }
                continue;*/
            }
            //console.log(this.pieces_[i]);
        }
        if (this.pieces_.length > 0) {
            //pseudoCanvasExplosionsFixImage.image_data = pseudoCanvasExplosions.ctx.getImageData(0, 0, cvs.width, cvs.height);
            //setTimeout(this.main.bind(this), 10);
            window.requestAnimationFrame(this.main.bind(this));
        } else {
            //pseudoCanvasExplosionsFixImage.ctx.putImageData(pseudoCanvasExplosionsFixImage.image_data, 0, 0);
            //pseudoCanvasExplosionsFixImage.ctx.putImageData(pseudoCanvasExplosionsFixImage.image_data, 0, 0);
            handler.removeExplosion(this.id);
            //this = null;
        }
    }
    draw()
    {
        pseudoCanvasExplosions.clear();
        if (!this._thiggered) {
            pseudoCanvasExplosions.ctx.filter = "blur(12px)";
            strokeAByContext(pseudoCanvasExplosions.ctx, this.x, this.y, this.radius, this.blur_color, 10);
            pseudoCanvasExplosions.ctx.filter = "none";
            fillRGCOByContext(pseudoCanvasExplosions.ctx, "destination-in", board.x, board.y, board.dx, board.dy);
            //fillRGCOByContext(pseudoCanvasExplosions.ctx, "source-over", board.x, board.y, board.dx, board.dy);


            fillADestOutByContext(pseudoCanvasBottom.ctx, this.x, this.y, this.radius, "fff");
            strokeAByContext(pseudoCanvasExplosions.ctx, this.x, this.y, this.radius, "fff", this.lw);
        }



        //for (var i = 0; i < this.pieces_.length; i++) {
        //    this.pieces_[i].draw();
        //    //console.log(this.pieces_[i]);
        //}
    }
    changeAngle(angle)
    {
        for (var i = 0; i < this.pieces_.length; i++) {
            //this.pieces_[i].angle = angle;
            this.pieces_[i].changeAngle(angle);
        }
    }
    trigger(angle)
    {
        //console.log(angle);
        this.changeAngle(angle);
        pseudoCanvasExplosions.clear();
        this._thiggered = true;
        this.draw();
        //console.log(this._thiggered);
        //handler.draw();
        this.main();
    }
}


class Checker
{
    constructor(color,wh,id)
    {
        this.x;
        this.y;
        this.wh = wh;
        this.over_radius = this.wh + 22;
        this.color = color;
        this.field_id = [];


        this.cur_x;
        this.cur_y;

        this.id = id;
    }
    drawBlur(context)
    {
        if (context != null) {
            fillADestOutByContext(context, this.cur_x, this.cur_y, this.wh, this.color, 1);

            pseudoCanvasTop.ctx.filter = "blur(12px)";
            strokeAByContext(context, this.cur_x, this.cur_y, this.wh, this.color, 10);
            pseudoCanvasTop.ctx.filter = "none";

            return;

        }
        //fillADestOut(this.cur_x, this.cur_y, this.wh, this.color, 1);
        fillADestOutByContext(pseudoCanvasBottom.ctx, this.cur_x, this.cur_y, this.wh, this.color, 1);


        //ctx.filter = "blur(12px)";
        strokeA(this.cur_x, this.cur_y, this.wh, this.color, 10);
        //ctx.filter = "none";
    }
    draw(context)
    {
        if (context != null) {
            strokeAByContext(context,this.cur_x, this.cur_y, this.wh, "#fff", 5);
            return;
        }
        //strokeA(this.x, this.y, this.wh, this.color, 10);
        //fillALighter(this.x, this.y, this.wh, this.color, 0.2);

        strokeA(this.cur_x, this.cur_y, this.wh, "#fff", 5);
        //strokeA(this.cur_x, this.cur_y, this.wh, this.color, 5);

        //fillT(this.id, this.cur_x, this.cur_y - 20, 30, this.color);

        //strokeA(this.x, this.y, this.wh+5, "#000", 1);

        //strokeADestOut(this.x, this.y, this.wh, this.color, 10);


        //fillR(this.x, this.y, this.wh, this.wh, this.color);
    }
    setCoord(x,y)
    {
        this.x = x;
        this.y = y;
        this.cur_x = x;
        this.cur_y = y;
    }
    setTargetCoord(x,y)
    {
        this.x = x;
        this.y = y;
    }
}

//IDea
//doska dolzhna byt' na zadnem plane i vigatsa v proporcii mousescroll/2


class Bot
{
    constructor(color,dir,id)
    {
        this.color = color;
        //this.board = board;
        this.direction = dir;
        this.ids_ = [];
        this.cur_avalible_ids_ = [];

        this.id = id;

        this.eating = false;

        if (id == 0) {
            this.targetFieldId = 7;

        } else
        {
            this.targetFieldId = 0;
        }
    }
    setChecker(i,j)
    {
        //console.log(i,j);
        this.ids_.push(board.addChecker(i,j,this));
    }
    setCheckers(start)
    {
        for (var i = 0; i < 4; i++) {
            for (var j = start; j < start+3; j++) {
                this.setChecker(i*2+(j%2==0?1:0),j);
            }
        }
    }
    turn()
    {
        //console.log(this.color);
        this.cur_avalible_ids_ = [];

        for (var i = 0; i < this.ids_.length; i++) {
            //console.log(this.ids_[i]);
            //console.log(board.checkers_[this.ids_[i]].field_id);
            let id = board.checkers_[this.ids_[i]].field_id;

            /*if (board.fields_[id[0] + 1][id[1] + this.direction] || board.fields_[id[0] - 1][id[1] + this.direction]) {
                console.log(id);
            }*/



            if (id[0] - 1 > 0 && id[1] + this.direction < 8 && id[1] + this.direction > 0) {
                if (!board.fields_[id[0] - 1][id[1] + this.direction].empty && board.fields_[id[0] - 1][id[1] + this.direction].owner_id!=this.id) {
                    //console.log("THIS0 ", id, this.direction, this.id);
                    //board.checkers_[this.ids_[i]].color = "#fff";
                    //this.addCurAvalibleId(this.ids_[i]);

                    let idd = id[0] - 1 - 1;
                    let jdd = id[1] + this.direction + this.direction;

                    if (jdd>0&&jdd<8&&idd>0&&idd<7) {
                        if (board.fields_[idd][jdd].empty) {

                            /*console.log("Eat: ","target", board.fields_[idd][jdd],
                                "between",board.fields_[id[0] - 1][id[1] + this.direction],
                                "from",board.fields_[id[0]][id[1]],
                                this.id);*/

                            board.eat(this.ids_[i],
                                board.fields_[idd][jdd],
                                board.fields_[id[0] - 1][id[1] + this.direction],
                                board.fields_[id[0]][id[1]],
                                this.id
                            );
                            

                            handler.cur_player -= 1;
                            this.eating = true;

                            this.cur_selected_id = this.ids_[i];
                            return;
                        }
                    }
                }
            }
            if (id[0] + 1 < 8 && id[1] + this.direction < 8 && id[1] + this.direction > 0) {

                if (!board.fields_[id[0] + 1][id[1] + this.direction].empty && board.fields_[id[0] + 1][id[1] + this.direction].owner_id!=this.id) {
                    //console.log("THIS1 ", id, this.direction, this.id);

                    let idd = id[0] + 1 + 1;
                    let jdd = id[1] + this.direction + this.direction;

                    if (jdd > 0 && jdd < 8 && idd > 0 && idd < 7) {
                        if (board.fields_[idd][jdd].empty) {

                            /*//console.log("Eat: ", "target", board.fields_[idd][jdd],
                                "between", board.fields_[id[0] + 1][id[1] + this.direction],
                                "from", board.fields_[id[0]][id[1]],
                                this.id);*/

                            board.eat(this.ids_[i],
                                board.fields_[idd][jdd],
                                board.fields_[id[0] + 1][id[1] + this.direction],
                                board.fields_[id[0]][id[1]],
                                this.id
                            );
                            

                            handler.cur_player -= 1;
                            this.eating = true;

                            this.cur_selected_id = this.ids_[i];
                            return;
                        }
                    }
                    //board.checkers_[this.ids_[i]].color = "#fff";
                    //this.addCurAvalibleId(this.ids_[i]);
                }
            }
            if (id[0] - 1 > 0 && id[1] - this.direction > 0 && id[1] - this.direction < 8) {
                if (!board.fields_[id[0] - 1][id[1] - this.direction].empty && board.fields_[id[0] - 1][id[1] - this.direction].owner_id != this.id) {
                    //console.log("THIS2 ", id, this.direction, this.id);
                    //board.checkers_[this.ids_[i]].color = "#fff";
                    //this.addCurAvalibleId(this.ids_[i]);

                    let idd = id[0] - 1 - 1;
                    let jdd = id[1] - this.direction - this.direction;
                    if (jdd > 0 && jdd < 8 && idd > 0 && idd < 7) {
                        if (board.fields_[idd][jdd].empty) {

                            /*//console.log("Eat: ", "target", board.fields_[idd][jdd],
                                "between", board.fields_[id[0] - 1][id[1] - this.direction],
                                "from", board.fields_[id[0]][id[1]],
                                this.id);*/

                            board.eat(this.ids_[i],
                                board.fields_[idd][jdd],
                                board.fields_[id[0] - 1][id[1] - this.direction],
                                board.fields_[id[0]][id[1]],
                                this.id
                            );
                            

                            handler.cur_player -= 1;
                            this.eating = true;

                            this.cur_selected_id = this.ids_[i];
                            return;
                        }
                    }
                }
            }
            if (id[0] + 1 < 8 && id[1] - this.direction > 0&& id[1] - this.direction < 8) {
                //console.log(id[0] + 1, id[1] - this.direction, board.checkers_[this.ids_[i]]);

                if (!board.fields_[id[0] + 1][id[1] - this.direction].empty && board.fields_[id[0] + 1][id[1] - this.direction].owner_id != this.id) {
                    //console.log("THIS3 ", id, this.direction, this.id);
                    //board.checkers_[this.ids_[i]].color = "#fff";
                    //this.addCurAvalibleId(this.ids_[i]);

                    let idd = id[0] + 1 + 1;
                    let jdd = id[1] - this.direction - this.direction;
                    if (jdd > 0 && jdd < 8 && idd > 0 && idd < 7) {
                        if (board.fields_[idd][jdd].empty) {

                            /*//console.log("Eat: ", "target", board.fields_[idd][jdd],
                                "between", board.fields_[id[0] + 1][id[1] - this.direction],
                                "from", board.fields_[id[0]][id[1]],
                                this.id);*/

                            board.eat(this.ids_[i],
                                board.fields_[idd][jdd],
                                board.fields_[id[0] + 1][id[1] - this.direction],
                                board.fields_[id[0]][id[1]],
                                this.id
                            );

                            

                            handler.cur_player -= 1;
                            this.eating = true;

                            this.cur_selected_id = this.ids_[i];
                            return;
                        }
                    }

                }
            }
            //board.checkers_[this.ids_[i]].field_id;
        }

        if (this.eating) {
            this.eating = false;
            //handler.cur_player ++;
            handler.main();
            return;
        }

        this.cur_avalible_ids_ = [];
        for (var i = 0; i < this.ids_.length; i++) {
            //console.log(this.ids_[i]);
            //console.log(board.checkers_[this.ids_[i]].field_id);
            let id = board.checkers_[this.ids_[i]].field_id;

            /*if (board.fields_[id[0] + 1][id[1] + this.direction] || board.fields_[id[0] - 1][id[1] + this.direction]) {
                console.log(id);
            }*/

            if (true) {
                let idd = id[0] - 1;
                let jdd = id[1] + this.direction;
                if (idd > -1 && idd < 8 && jdd > -1 && jdd < 8) {
                    if (board.fields_[idd][jdd].empty) {
                        //console.log("THIS" + id);
                        //board.checkers_[this.ids_[i]].color = "#fff";
                        this.addCurAvalibleId(this.ids_[i]);
                    }
                }
                idd = id[0] + 1;
                if (idd > -1 && idd < 8 && jdd > -1 && jdd < 8) {
                    if (board.fields_[idd][jdd].empty) {
                        //console.log("THIS" + id);
                        //board.checkers_[this.ids_[i]].color = "#fff";
                        this.addCurAvalibleId(this.ids_[i]);
                    }
                }
                
            }
            /*if (id[0] == 0) {
                if (board.fields_[id[0] + 1][id[1] + this.direction].empty) {
                    console.log("THIS" + id);
                    //board.checkers_[this.ids_[i]].color = "#fff";
                    this.addCurAvalibleId(this.ids_[i]);
                }
            }*/
            
            //board.checkers_[this.ids_[i]].field_id;
        }
        this.move();
    }
    addCurAvalibleId(id)
    {
        if (!this.cur_avalible_ids_.includes(id)) {
            this.cur_avalible_ids_.push(id);
        }
    }
    move()
    {
        if (this.cur_avalible_ids_.length > 0) {
            let id = this.cur_avalible_ids_[getRandomInt(this.cur_avalible_ids_.length)];
            let dir = Math.pow(-1, 1 + getRandomInt(3));
            let loc_id = board.checkers_[id].field_id;

            let loc_i = board.checkers_[id].field_id[0];
            let loc_j = board.checkers_[id].field_id[1];

            //console.log(loc_id, this.direction, board.fields_);
            //console.log(loc_id, this.direction, board.fields_[loc_id[0] + dir][loc_id[1] + this.direction]);
            //console.log(board.fields_[0][6]);
            //console.log(board.fields_[7][3]);
            //console.log(board.fields_[0][4]);
            //console.log(board.fields_[0][2]);

            let i;
            if (loc_i + dir < 0) {
                i = loc_i - dir;
            } else if (loc_i + dir < 7) {
                i = loc_i + dir;
            }

            if (loc_i + dir > 7) {
                i = loc_i - dir;
            } else if (loc_i + dir > 0) {
                i = loc_i + dir;
            }

            let j = loc_j + this.direction;
            //console.log(i,j);
            //console.log(board.fields_[i][j]);
            //console.log(board.fields_[i][j]);


            if (board.fields_[i][j]) {
                if (board.fields_[i][j].empty) {
                    board.moveTo(id, board.fields_[i][j], board.fields_[loc_id[0]][loc_id[1]], this.id);
                } else {
                    board.moveTo(id, board.fields_[loc_id[0] - dir][loc_id[1] + this.direction], board.fields_[loc_id[0]][loc_id[1]], this.id);
                }
            } else if (board.fields_[loc_id[0] - dir][loc_id[1] + this.direction]) {
                if (board.fields_[loc_id[0] - dir][loc_id[1] + this.direction].empty) {
                    board.moveTo(id, board.fields_[loc_id[0] + dir][loc_id[1] + this.direction], board.fields_[loc_id[0]][loc_id[1]], this.id);
                } else {
                    board.moveTo(id, board.fields_[loc_id[0] + dir][loc_id[1] + this.direction], board.fields_[loc_id[0]][loc_id[1]], this.id);
                }
            }
            /*if (board.fields_[loc_id[0] + dir][loc_id[1] + this.direction]) {
                if (board.fields_[loc_id[0] + dir][loc_id[1] + this.direction].empty) {
                    board.moveTo(id, board.fields_[loc_id[0] + dir][loc_id[1] + this.direction], board.fields_[loc_id[0]][loc_id[1]], this.id);
                } else {
                    board.moveTo(id, board.fields_[loc_id[0] - dir][loc_id[1] + this.direction], board.fields_[loc_id[0]][loc_id[1]], this.id);
                }
            } else if (board.fields_[loc_id[0] - dir][loc_id[1] + this.direction]) {
                if (board.fields_[loc_id[0] - dir][loc_id[1] + this.direction].empty) {
                    board.moveTo(id, board.fields_[loc_id[0] + dir][loc_id[1] + this.direction], board.fields_[loc_id[0]][loc_id[1]], this.id);
                } else {
                    board.moveTo(id, board.fields_[loc_id[0] + dir][loc_id[1] + this.direction], board.fields_[loc_id[0]][loc_id[1]], this.id);
                }
            }*/
            

        }
    }
}

class Color
{
    constructor(hex,opacity) {
        this.hex = hex;

        this.opacity = opacity;
    }
    
}

class Board
{
    constructor()
    {

        this.color0 = new Color( "#000", 1);
        //#59f
        //"#026" 021844
        //this.color1 = new Color("#00f", 0.1);
        //this.color1 = new Color("#026", 0.6);
        this.color1 = new Color("#021844", 1);



        this.div8 = cvs.width / 16;

        this.x = cvs.width / 4;
        this.y = cvs.width / 4;
        this.dx = this.x + this.div8 * 4;
        this.dy = this.y + this.div8 * 4;

        this.border_lw = 50;


        this.border_x = this.x - this.border_lw / 2;
        this.border_y = this.y - this.border_lw / 2;
        this.border_dx = this.dx + this.border_lw;
        this.border_dy = this.dy + this.border_lw;


        this.fields_ = [];
        this.checkers_ = [];
        this.create();
        this.draw();

        this.wh_divdend = 2;
        //console.log(this.fields_);
    }
    create()
    {
        for (var i = 0; i < 8; i++) {
            this.fields_[i] = [];
            for (var j = 0; j < 8; j++) {
                let color;
                //let color =  ((i*8+j)%2==0&&(i%2==0)?"#fff":"#000");
                if (i % 2 == 0) {
                    color = (j % 2 == 0 ? this.color1 : this.color0);
                } else {
                    color = (j % 2 != 0 ? this.color1 : this.color0);
                }

                if (i==0 && j ==0) {
                    //color = "#ff0";
                }
                let field = new Field(this.x + this.div8 * i,this.y  + this.div8 * j, this.div8, color);
                field.id = [i,j];
                this.fields_[i].push(field);
            }
        }
        //this.addChecker(0,0);
    }
    addChecker(i,j,player)
    {
        //console.log(i,j,player,this);
        this.fields_[i][j].empty = false;
        this.fields_[i][j].owner_id = player.id;

        /*let checker = new Checker(player.color, this.div8/2);
        checker.field_id = [i, j];
        checker.x = this.fields_[i][j].x + this.fields_[i][j].wh/4;
        checker.y = this.fields_[i][j].y + this.fields_[i][j].wh / 4;;*/
        let checker = new Checker(player.color, this.div8 / this.wh_divdend, this.checkers_.length);
        checker.field_id = [i, j];
        let x = this.fields_[i][j].x + this.fields_[i][j].wh / this.wh_divdend;
        let y = this.fields_[i][j].y + this.fields_[i][j].wh / this.wh_divdend;
        checker.setCoord(x,y);

        this.checkers_.push(checker);

        this.fields_[i][j].checker_id = this.checkers_.length - 1;


        return this.checkers_.length - 1;
    }
    draw()
    {
        for (var i = 0; i < this.fields_.length; i++) {
            for (var j = 0; j < this.fields_[i].length; j++) {
                this.fields_[i][j].draw();
                //pseudoCanvasBottom.drawRect();
            }
        }
        //console.log(this.checkers_);
    }
    drawByContext(context)
    {
        for (var i = 0; i < this.fields_.length; i++) {
            for (var j = 0; j < this.fields_[i].length; j++) {
                //this.fields_[i][j].draw();
                //pseudoCanvasBottom.drawRect();
                //pseudoCanvasBottom.drawRect(this.x, this.y, this.wh, this.wh, this.color, this.opacity);
                fillRByContext(context, this.fields_[i][j].x, this.fields_[i][j].y, this.fields_[i][j].wh, this.fields_[i][j].wh, this.fields_[i][j].color, this.fields_[i][j].opacity);
            }
        }
    }
    cutBorder()
    {
        strokeRDestOut(this.border_x, this.border_y, this.border_dx, this.border_dy, "000", 1, this.border_lw);
    }
    moveTo(checker_id, field, field_from,player_id)
    {
        field_from.empty = true;
        field_from.owner_id = -1;
        field_from.checker_id = null;

        //console.log(checker_id, field);

        let x = field.x + field.wh / this.wh_divdend;
        let y = field.y + field.wh / this.wh_divdend;
        this.checkers_[checker_id].setTargetCoord(x,y);
        this.checkers_[checker_id].field_id = field.id;


        field.empty = false;
        field.owner_id = player_id;
        field.checker_id = checker_id;

        //console.log(field);
        //handler.is_animating = true;

        handler.animateMove(checker_id);
        //this.draw();
        //123
        if (field.id[1] == handler.players_[player_id].targetFieldId) {
            //console.log("stopGame");
            handler.stopGame();
            //alert();
        }
        //console.log(field.id[1]);
        //console.log(handler.players_[player_id].targetFieldId);


    }
    eat(checker_id,field, field_between, field_from,player_id)
    {
        //this.fields_[this.checkers_[checker_id]]
        //console.log(field, field_between, field_from, player_id);
        //console.log("target ", field, "between", field_between, "from", field_from, player_id);



        for (var i = 0; i < handler.players_[field_between.owner_id].ids_.length; i++) {

            


            if (handler.players_[field_between.owner_id].ids_[i] == field_between.checker_id) {

                handler.createCircleExplosion(board.checkers_[field_between.checker_id]);

                //handler.exp_circles_[handler.exp_circles_.length - 1].trigger();

                handler.players_[field_between.owner_id].ids_.splice(i, 1);
                break;
            }
        }
        

        field_from.empty = true;
        field_from.owner_id = -1;
        field_from.checker_id = null;
        field_between.empty = true;
        field_between.owner_id = -1;
        field_between.checker_id = null;

        field.owner_id = player_id;

        this.checkers_[checker_id].x = field.x + field.wh / 2;
        this.checkers_[checker_id].y = field.y + field.wh / 2;
        this.checkers_[checker_id].field_id = field.id;
        field.empty = false;
        field.owner_id = player_id;
        field.checker_id = checker_id;
        //console.log("target ", field, "between", field_between, "from", field_from, player_id);

        handler.animateEat(checker_id);
    }
}
var board = new Board();
//var bot0 = new Bot("#924", 1, 0);
var bot0 = new Bot("#f0f", 1, 0);

bot0.setCheckers(0);
var bot1 = new Bot("#59f", -1,1);
bot1.setCheckers(5);

//=====================================================================
//=====================================================================
//=====================================================================
//=====================================================================
//=====================================================================
//=====================================================================
//=====================================================================

class Handler
{
    constructor(players)
    {
        this.stoped = true;

        this.players_ = players;
        this.cur_player = 0;

        this.is_animating = false;

        this.move_animation_speed = 16;
        //this.move_animation_speed = 4;

        this.move_animation_dx;
        this.move_animation_dy;
        this.move_animation_checker_id;
        this.move_animation_times = 16;

        this.move_animation_angle;

        //this.move_animation_times = 64;

        this.move_animation_times_counter = 0;

        this.is_eating = false;

        this.exp_circles_ = [];
        this.cur_exp_circles_id = 0;

        this.iteration_count = 0;

    }
    createCircleExplosion(checker)
    {
        //console.log(checker);
        let expl = new CircleExplosion(checker.cur_x, checker.cur_y, checker.wh, 5, checker.color, this.exp_circles_.length);
        //let expl = new CircleExplosion(888, 888, 111);

        expl.create();
        expl.draw();
        //expl.main();

        this.exp_circles_.push(expl);
    }
    removeExplosion(id)
    {
        this.exp_circles_[id] = null;
        this.cur_exp_circles_id = id;
    }
    stop()
    {
        this.stoped = true;
    }
    start()
    {
        this.stoped = false;
        
        this.main();
    }
    stopGame()
    {
        this.stoped = true;
    }
    main()
    {
        if (this.stoped) {
            return;
        }
        //console.log(this.is_animating);


        //console.log("================");
        //console.log(this.iteration_count);
        //console.log("================");

        this.iteration_count++;
        if (!this.is_animating) {
            this.players_[this.cur_player].turn();
            this.cur_player++;
            //this.players_[this.cur_player].turn();
            if (this.cur_player >= this.players_.length) {
                this.cur_player = 0;
            } else if (this.cur_player < 0) {
                this.cur_player = this.players_.length - 1;

            }
            //this.draw();
            //setTimeout(this.main.bind(this), 2500 + getRandomInt(1500));
        }
        //this.stoped = true;
    }
    draw(except)
    {
        //console.log("except:",except);
        ctx.clearRect(board.x, board.y, board.dx, board.dy);
        board.draw();
        ctx.filter = "blur(12px)";
        for (var i = 0; i < this.players_.length; i++) {
            for (var j = 0; j < this.players_[i].ids_.length; j++) {
                if (this.players_[i].ids_[j] == except) {
                    //console.log("YEY"+except);

                    continue;
                }
                board.checkers_[this.players_[i].ids_[j]].drawBlur();
            }
        }
        ctx.filter = "none";

        board.cutBorder();

        for (var i = 0; i < this.players_.length; i++) {
            for (var j = 0; j < this.players_[i].ids_.length; j++) {
                if (this.players_[i].ids_[j] == except) {
                    continue;
                }
                board.checkers_[this.players_[i].ids_[j]].draw();
            }
        }


        for (var i = this.cur_exp_circles_id; i < this.exp_circles_.length; i++) {
            if (this.exp_circles_[i]!=null) {
                this.exp_circles_[i].draw();
            }
        }
    }
    drawByContext(except,ctx) {
        //console.log("except:",except);
        ctx.clearRect(board.x, board.y, board.dx, board.dy);
        board.draw();
        ctx.filter = "blur(12px)";
        for (var i = 0; i < this.players_.length; i++) {
            for (var j = 0; j < this.players_[i].ids_.length; j++) {
                if (this.players_[i].ids_[j] == except) {
                    //console.log("YEY"+except);

                    continue;
                }
                board.checkers_[this.players_[i].ids_[j]].drawBlur(ctx);
            }
        }
        ctx.filter = "none";

        board.cutBorder();

        for (var i = 0; i < this.players_.length; i++) {
            for (var j = 0; j < this.players_[i].ids_.length; j++) {
                if (this.players_[i].ids_[j] == except) {
                    continue;
                }
                board.checkers_[this.players_[i].ids_[j]].draw(ctx);
            }
        }


        for (var i = this.cur_exp_circles_id; i < this.exp_circles_.length; i++) {
            if (this.exp_circles_[i] != null) {
                this.exp_circles_[i].draw();
            }
        }
    }
    clear()
    {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
    }
    cutOne(checker)
    {
        //fillASourceIn(checker.cur_x, checker.cur_y, 50);
        pseudoCanvas.fillADestIn(checker);
        //board.draw();
        //console.log("ff");
        pseudoCanvasBottom.fillADestOut(checker.cur_x, checker.cur_y, checker.over_radius);

    }
    reDrawOne(checker)
    {
        pseudoCanvasTop.ctx.clearRect(0, 0, pseudoCanvas.dom.width, pseudoCanvas.dom.height);
        //console.log(pseudoCanvasTop.ctx);
        checker.drawBlur(pseudoCanvasTop.ctx);
        checker.draw(pseudoCanvasTop.ctx);
    }

    animateMove(checker_id)
    {
        this.is_eating = false;
        this.startMoveAnimation(checker_id);

    }
    animateEat(checker_id)
    {
        this.is_eating = true;
        this.startMoveAnimation(checker_id);
    }
    startMoveAnimation(checker_id)
    {
        this.is_animating = true;
        this.start_value = null;
        //console.log("ANIMATEMOVE");
        //console.log("X",board.checkers_[checker_id].x);
        //console.log("Y",board.checkers_[checker_id].y);
        //console.log("CX",board.checkers_[checker_id].cur_x);
        //console.log("CY", board.checkers_[checker_id].cur_y);

        let x = board.checkers_[checker_id].cur_x - board.checkers_[checker_id].x;
        let y = board.checkers_[checker_id].cur_y - board.checkers_[checker_id].y;

        let angle = Math.atan2(y, x);// * 180 / Math.PI;
        this.move_animation_angle = angle;
        //console.log(angle);

        this.move_animation_times_counter = 0;

        board.drawByContext(pseudoCanvasBottomHelp.ctx);
        fillADestInByContext(pseudoCanvasBottomHelp.ctx,
            board.checkers_[checker_id].cur_x,
            board.checkers_[checker_id].cur_y,
            board.checkers_[checker_id].wh+10
        );
        pseudoCanvasBottomHelp.fixImage();

        let coef = (this.is_eating == true ? 2 : 1);

        //this.move_animation_times = 17;//(this.is_eating == true ? 18 : 17);
        this.move_animation_dx = Math.cos(angle) * this.move_animation_speed / 2 * coef;
        this.move_animation_dy = Math.sin(angle) * this.move_animation_speed / 2 * coef;

        this.draw(checker_id);

        this.move_animation_checker_id = checker_id;

        pseudoCanvas.setStartCoords(board.checkers_[checker_id].cur_x, board.checkers_[checker_id].cur_y);

        window.requestAnimationFrame(this.animatingMove.bind(this));
    }
    animatingMove(timestamp)
    {
        if (!this.start_value) {
            this.start_value = timestamp;
        }
        //if (timestamp - this.start_value < 1000) {
        if (this.move_animation_times_counter < this.move_animation_times) {
            //console.log(timestamp - this.start_value);

            this.move_animation_times_counter++;

            this.cutOne(board.checkers_[this.move_animation_checker_id]);

            fillADestOutByContext(pseudoCanvasExplosionsFixImage.ctx,
                board.checkers_[this.move_animation_checker_id].cur_x,
                board.checkers_[this.move_animation_checker_id].cur_y,
                board.checkers_[this.move_animation_checker_id].wh
            );

            pseudoCanvasBottomHelp.ctx.putImageData(pseudoCanvasBottomHelp.image_data,0,0)
            fillADestOutByContext(pseudoCanvasBottomHelp.ctx,
                board.checkers_[this.move_animation_checker_id].cur_x,
                board.checkers_[this.move_animation_checker_id].cur_y,
                board.checkers_[this.move_animation_checker_id].wh
            );


            board.checkers_[this.move_animation_checker_id].cur_x -= this.move_animation_dx;

            board.checkers_[this.move_animation_checker_id].cur_y -= this.move_animation_dy;

            for (let i = 0; i < this.exp_circles_.length; i++) {
                if (this.exp_circles_[i] != null) {
                    if (!this.exp_circles_[i]._thiggered) {
                        if (this.checkCollision(board.checkers_[this.move_animation_checker_id], this.exp_circles_[i])) {
                            //alert();

                            this.exp_circles_[i].trigger(this.move_animation_angle);
                            break;
                        }
                    }
                    
                }
            }

            //this.draw();
            //this.reDrawOne(board.checkers_[this.move_animation_checker_id]);
            this.reDrawOne(board.checkers_[this.move_animation_checker_id]);

            if (this.move_animation_times_counter % 20 == 0) {
                //this.draw();
            }
            window.requestAnimationFrame(this.animatingMove.bind(this));
            return;
        }
        let i = board.checkers_[this.move_animation_checker_id].field_id[0];
        let j = board.checkers_[this.move_animation_checker_id].field_id[1];
        //let field =;

        board.checkers_[this.move_animation_checker_id].cur_x = board.fields_[i][j].x + board.div8 / 2;
        board.checkers_[this.move_animation_checker_id].cur_y = board.fields_[i][j].y + board.div8/2;

        //console.log(board.fields_[board.checkers_[this.move_animation_checker_id].field_id[0]]);
        this.draw();
        pseudoCanvasTop.clear();

        this.is_animating = false;


        //setTimeout(this.main.bind(this),500+ getRandomInt(1000));
        //setTimeout(this.main.bind(this), 500 + getRandomInt(500));
        //123

        if (this.stoped) {
            //alert("here");
            this.startGameOverAnimation();
        }
        //setTimeout(this.main.bind(this), 1);
        setTimeout(this.main.bind(this), 500 + getRandomInt(1500));


        //this.main();
        //board.checkers_[checker_id].cur_x
    }
    checkCollision(checker,explosion)
    {
        //console.log(checker, explosion);
        //console.log(Math.sqrt(Math.pow(checker.cur_x - explosion.x, 2) + Math.pow(checker.cur_y - explosion.y, 2)), checker.wh + explosion.radius);
        if (Math.sqrt(Math.pow(checker.cur_x - explosion.x, 2) + Math.pow(checker.cur_y - explosion.y, 2)) <= checker.wh + explosion.radius) {
            //alert();
            return true;
        }
        else {
            return false;
        }
    }
    startGameOverAnimation()
    {
        this.clear();
        pseudoCanvas.clear();

        pseudoCanvasBottomHelp.clear();
        pseudoCanvasBottom.clear();
        pseudoCanvasExplosions.clear();
        pseudoCanvasExplosionsFixImage.clear();

        pseudoCanvasTop.clear();

        //draws on pseudoCanvasBottom
        //board.draw();

        this.drawByContext(null, pseudoCanvasBottom.ctx);

        var imgData = pseudoCanvasBottom.ctx.getImageData(board.x, board.y, board.dx, board.dy);
        //console.log(imgData);
        pseudoCanvasBottom.clear();
        pseudoCanvasBottom.ctx.putImageData(imgData, board.x, board.y);

        let particlesAnimator = new ParticlesAnimator(pseudoCanvasBottom.dom, pseudoCanvasBottom.ctx, imgData, board.x, board.y);
        particlesAnimator.animate();
    }
}
var handler = new Handler([bot0, bot1]);
handler.main();


board.draw();
handler.draw();

class ScrollElement
{
    constructor(element,delta)
    {
        this.y = 0;
        this.dom = element;
        this.delta = delta;

        this.base_height = window.innerHeight;
        this.height = window.innerHeight;

        this.rotated_container = dgebi("rotated_container");
        this.angle = -20;// getComputedStyle(this.rotaited_container).transform;
        //console.log(this.angle);
        //console.log(this.height);


        this.is_triggered = false;

        this.cut_sec = dgebi("cut_section");
    }
    scroll(scroll_direction)
    {
        this.y += this.delta * scroll_direction;
        this.dom.style.top = this.y + "px";
        //this.height += scroll_direction*10;
        this.height = this.base_height - window.scrollY;

        this.cut_sec.style.height = this.height + "px";
        //this.dom.style.height = this.height + "px";
        //console.log(this.height);
        if (!this.is_triggered) {
            this.angle -= scroll_direction / 20;

            this.rotated_container.style.transform = "rotate(" + this.angle + "deg)";
            //console.log(window.scrollY);
            /*if (window.scrollY > 500) {
                this.rotated_container.style.left = 0 + "px";
                this.rotated_container.style.transform = "rotate(" + 0 + "deg)";
                this.is_triggered = true;
            }*/
        }

        
    }
}

var scroll_bg = new ScrollElement(dgebi("scroll_bg"), 0.8);
//console.log(scroll_bg);



//pseudoCanvas.fillASourceIn();