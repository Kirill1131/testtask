function save() {
    ctx.save();
}
function translate(x, y) {
    ctx.translate(x, y);
}
function restore() {
    ctx.restore();
}
function rotate(angle) {
    ctx.rotate(angle);
}
function clearCvs() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function begin() {
    ctx.beginPath();
}

function beginLT(x, y) {
    ctx.moveTo(x, y)
}
function lineTo(x, y) {
    ctx.lineTo(x, y);
}

function endLT(x, y) {
    ctx.lineTo(x, y);
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "#f00";
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#000"//+color;
    ctx.stroke();
}

function fill(color = "000") {
    ctx.fillStyle = color[0] == "#" ? color : "#" + color;
    ctx.fill();
}

function stroke(color = "f00", lw = 2) {
    ctx.lineWidth = lw;
    ctx.strokeStyle = color[0] == "#" ? color : "#" + color;
    ctx.stroke();
}

function end() {
    ctx.closePath();
}
function lineFT(bx, by, ex, ey, lw = 2, color = "000") {
    ctx.beginPath();
    ctx.lineWidth = lw;
    ctx.moveTo(bx, by);
    ctx.lineTo(ex, ey);
    ctx.strokeStyle = color[0] == '#' ? color : "#" + color;
    ctx.stroke();
    ctx.closePath();
}
function lineFTwopS(bx, by, ex, ey, lw, color = "000") {
    //without path
    ctx.lineWidth = lw;
    ctx.moveTo(bx, by);
    ctx.lineTo(ex, ey);
    // ctx.fillStyle = "#000";
    // ctx.fill();
    ctx.strokeStyle = color[0] == '#' ? color : "#" + color;
    ctx.stroke();

}
function lineFTwopF(bx, by, ex, ey, lw, color = "000") {
    //without path
    ctx.lineWidth = lw;
    ctx.moveTo(bx, by);
    ctx.lineTo(ex, ey);
    ctx.fillStyle = color[0] == '#' ? color : "#" + color;
    ctx.fill();
}

function fillT(text, x, y, size = 20, color = "000") {
    ctx.beginPath();
    ctx.font = size + "px Arial";
    ctx.textAlign =
        //"left"
        "center";
    ctx.lineWidth = 1;
    ctx.fillStyle = color[0] == '#' ? color : "#" + color;
    ctx.fillText(text, x, y);
    ctx.closePath();
}

function fillR(x, y, dx, dy, color = "000", alpha = 1) {
    ctx.beginPath();
    if (alpha != 1) {
        //Чтобы не напрягать процесс
        ctx.globalAlpha = alpha;
    }
    ctx.rect(x, y, dx, dy);
    ctx.fillStyle = color[0] == '#' ? color : "#" + color;
    ctx.fill();
    if (alpha != 1) {
        ctx.globalAlpha = 1;
    }
    ctx.closePath();
}

function strokeR(x, y, dx, dy, color = "000000", alpha = 1, lineWidth = 1) {
    ctx.beginPath();
    if (alpha != 1) {
        //Чтобы не напрягать процесс, не хочется смотреть что там понамешано
        ctx.globalAlpha = alpha;
    }
    ctx.rect(x, y, dx, dy);
    ctx.strokeStyle = color[0] == '#' ? color : "#" + color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    if (alpha != 1) {
        ctx.globalAlpha = 1;
    }
    ctx.closePath();
}

function strokeRDestOut(x, y, dx, dy, color = "000000", alpha = 1, lineWidth = 1)
{
    ctx.globalCompositeOperation = "destination-out";
    strokeR(x, y, dx, dy,color, alpha, lineWidth);
    ctx.globalCompositeOperation = "source-over";
}

function strokeRByArr(dim, color = "#f00", alpha = 1, lineWidth = 1) {
    ctx.beginPath();
    if (alpha != 1) {
        ctx.globalAlpha = alpha;
    }
    ctx.lineWidth = lineWidth;

    ctx.rect(dim[0], dim[1], dim[2], dim[3]);
    ctx.strokeStyle = color[0] == '#' ? color : "#" + color;
    ctx.stroke();
    if (alpha != 1) {
        ctx.globalAlpha = 1;
    }
    ctx.closePath();
}
function fillRByArr(dim, color = "#f00", alpha = 1) {
    ctx.beginPath();
    if (alpha != 1) {
        ctx.globalAlpha = alpha;
    }

    ctx.rect(dim[0], dim[1], dim[2], dim[3]);
    ctx.fillStyle = color[0] == '#' ? color : "#" + color;
    ctx.fill();
    if (alpha != 1) {
        ctx.globalAlpha = 1;
    }
    ctx.closePath();
}


function strokeA(x, y, r, color = "000", lineWidth = 1, alpha = 1, frad = 0, srad = Math.PI * 2) {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = alpha;
    ctx.arc(x, y, r, frad, srad);
    ctx.strokeStyle = color[0] == '#' ? color : "#" + color;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.closePath();
}

function strokeADestOut(x, y, r, color = "000", lineWidth = 1, alpha = 1, frad = 0, srad = Math.PI * 2)
{
    ctx.beginPath();
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = alpha;
    ctx.arc(x, y, r, frad, srad);
    ctx.strokeStyle = color[0] == '#' ? color : "#" + color;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.closePath();
    ctx.globalCompositeOperation = "source-over";

}

function fillA(x, y, r, color = "000", alpha = 1, frad = 0, srad = Math.PI * 2) {
    ctx.beginPath();
    ctx.globalAlpha = alpha;
    ctx.arc(x, y, r, frad, srad);
    ctx.fillStyle = color[0] == '#' ? color : "#" + color;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.closePath();
}

function fillADestOut(x, y, r, color = "000", alpha = 1, frad = 0, srad = Math.PI * 2) {
    ctx.globalCompositeOperation = "destination-out";
    fillA(x, y, r, color, alpha, frad, srad);
    ctx.globalCompositeOperation = "source-over";

}

function fillALighter(x, y, r, color = "000", alpha = 1, frad = 0, srad = Math.PI * 2) {
    ctx.globalCompositeOperation = "lighter";
    fillA(x, y, r, color, alpha, frad, srad);
    ctx.globalCompositeOperation = "source-over";
}
function fillASourceIn(x, y, r, color = "000", alpha = 1, frad = 0, srad = Math.PI * 2) {
    ctx.globalCompositeOperation = "source-in";
    fillA(x, y, r, color, alpha, frad, srad);
    ctx.globalCompositeOperation = "source-over";
}

function fillSpecA(x, y, r, color = "000", alpha = 1, frad = 0, srad = Math.PI * 2) {
    ctx.beginPath();
    ctx.globalAlpha = alpha;
    ctx.moveTo(x, y);
    ctx.arc(x, y, r, frad, srad);
    ctx.fillStyle = color[0] == '#' ? color : "#" + color;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.closePath();
}

function clearRect() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
}

function pow2(v) {
    return Math.pow(v, 2);
}
function sqrt(v) {
    return Math.sqrt(v);
}


function fillRByContext(local_ctx,x, y, dx, dy, color = "000", alpha = 1) {
    local_ctx.beginPath();
    //local_ctx.globalCompositeOperation = "source-over";
    if (alpha != 1) {

        //Чтобы не напрягать процесс
        local_ctx.globalAlpha = alpha;
    }
    local_ctx.rect(x, y, dx, dy);
    local_ctx.fillStyle = color[0] == '#' ? color : "#" + color;
    local_ctx.fill();
    if (alpha != 1) {
        local_ctx.globalAlpha = 1;
    }
    local_ctx.closePath();
}
function fillRGCOByContext(local_ctx, gco, x, y, dx, dy, color = "000", alpha = 1)
{
    local_ctx.globalCompositeOperation = gco;
    fillRByContext(local_ctx, x, y, dx, dy, color, alpha);
    local_ctx.globalCompositeOperation = "source-over"
}

function fillRDestInByContext(local_ctx, x, y, dx,dy) {
    local_ctx.globalCompositeOperation = "destination-in";
    fillRByContext(local_ctx, x, y, dx,dy);
    local_ctx.globalCompositeOperation = "source-over";
}


function strokeAByContext(local_ctx, x, y, r, color = "000", lineWidth, alpha = 1, frad = 0, srad = Math.PI * 2) {
    //console.log(local_ctx.stroke);
    //console.log(local_ctx.stroke);
    local_ctx.beginPath();
    local_ctx.globalAlpha = alpha;
    local_ctx.lineWidth = lineWidth;

    local_ctx.arc(x, y, r, frad, srad);
    local_ctx.strokeStyle = color[0] == '#' ? color : "#" + color;
    local_ctx.stroke();
    local_ctx.globalAlpha = 1;
    local_ctx.closePath();
}
function fillAByContext(local_ctx,x, y, r, color = "000", alpha = 1, frad = 0, srad = Math.PI * 2) {
    local_ctx.beginPath();
    local_ctx.globalAlpha = alpha;
    local_ctx.arc(x, y, r, frad, srad);
    local_ctx.fillStyle = color[0] == '#' ? color : "#" + color;
    local_ctx.fill();
    local_ctx.globalAlpha = 1;
    local_ctx.closePath();
}

function fillADestInByContext(local_ctx, x, y, r, color = "000", alpha = 1, frad = 0, srad = Math.PI * 2) {
    local_ctx.globalCompositeOperation = "destination-in";
    fillAByContext(local_ctx,x, y, r, color, alpha, frad, srad);
    local_ctx.globalCompositeOperation = "source-over";
}
function fillADestOutByContext(local_ctx, x, y, r, color = "000", alpha = 1, frad = 0, srad = Math.PI * 2) {
    local_ctx.globalCompositeOperation = "destination-out";
    fillAByContext(local_ctx, x, y, r, color, alpha, frad, srad);
    local_ctx.globalCompositeOperation = "source-over";
}



function lineFTByContext(local_ctx,bx, by, ex, ey, lw = 2, color = "000") {
    local_ctx.beginPath();
    local_ctx.lineWidth = lw;
    local_ctx.moveTo(bx, by);
    local_ctx.lineTo(ex, ey);
    local_ctx.strokeStyle = color[0] == '#' ? color : "#" + color;
    local_ctx.stroke();
    local_ctx.closePath();
}
function lineFTGCOByContext(local_ctx, gco, bx, by, ex, ey, lw = 2, color = "000") {
    local_ctx.globalCompositeOperation = gco;
    lineFTByContext(local_ctx, gco, bx, by, ex, ey, lw, color);
    local_ctx.globalCompositeOperation = "source-over";
}

function drawLitter() {
    //draw_point.main();
    //draw_point.move();
}

function hexRegister(count) {
    if (count == 10) {
        return "A";
    }
    if (count == 11) {
        return "B";
    }
    if (count == 12) {
        return "C";
    }
    if (count == 13) {
        return "D";
    }
    if (count == 14) {
        return "E";
    }
    if (count == 15) {
        return "F";
    }
    if ((count > -1) & (count < 10)) {
        return count;
    }
}
function hex(count) {
    let dividend = count;
    let rests_ = [0];
    let i = 0;
    let result = "";
    while (Math.floor(dividend % 16) != 0) {
        // console.log(dividend);
        rests_[i] = Math.floor(dividend % 16);
        // dividend /= 16 //dividend % 16;
        dividend = Math.floor(dividend / 16);
        i++;
    }
    for (i = rests_.length - 1; i >= 0; i--) {
        result += hexRegister(rests_[i]);
    }
    // console.log(rests_);
    // console.log(result);
    return (result);
}

function getEventValue(something) {
    // console.log(event.target.tagName);
    if (something == "x" || something == "y") {
        return (number == "x" ? event.offsetX : event.offsetY);
    }
    if (something == "tagName") {
        return event.target.tagName;
    }
}
function getEventMouseCoord(something) {
    return (something == 0 ? event.offsetX : event.offsetY);
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}



function getWidth(elem) {
    return Number((getComputedStyle(elem).width).slice(0, -2));
}
function getHeight(elem) {
    return Number((getComputedStyle(elem).height).slice(0, -2));
}
function getClientHeight(elem) {
    return elem.clientHeight;//Number((getComputedStyle(elem).clientHeight).slice(0, -2));
}


function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}


function addScrolling(elem, onWheel) {
    if (elem.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+, Ch31+
            elem.addEventListener("wheel", onWheel);
        } else if ('onmousewheel' in document) {
            // устаревший вариант события
            elem.addEventListener("mousewheel", onWheel);
        } else {
            // Firefox < 17
            elem.addEventListener("MozMousePixelScroll", onWheel);
        }
    } else { // IE8-
        elem.attachEvent("onmousewheel", onWheel);
    }
}
//alert("here");
function dce(tagName, className = "") {
    let elem = document.createElement(tagName);
    elem.removeAttribute("class");
    elem.setAttribute("class", className);
    return elem;
}
function dgebi(id) {
    return document.getElementById(id);
}
function resetClass(elem, className) {
    elem.removeAttribute("class");
    elem.setAttribute("class", className);
}
function addClass(elem, className) {
    let tmp = elem.getAttribute("class");
    elem.removeAttribute("class");
    elem.setAttribute("class", tmp + " " + className);
}
/*function onWheel(e) {
    e = e || window.event;

    // wheelDelta не даёт возможность узнать количество пикселей
    var delta = e.deltaY || e.detail || e.wheelDelta;

    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}*/



var $ajax = (function () {
    var that = {};
    that.send = function (url, options) {
        var on_success = options.onSuccess || function () { },
            on_error = options.onError || function () { },
            on_timeout = options.onTimeout || function () { },
            timeout = options.timeout || 10000; // ms

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //console.log('responseText:' + xmlhttp.responseText);
                try {
                    var data = JSON.parse(xmlhttp.responseText);
                } catch (err) {
                    console.log(err.message + " in " + xmlhttp.responseText);
                    return;
                }
                on_success(data);
            } else {
                if (xmlhttp.readyState == 4) {
                    on_error();
                }
            }
        };
        xmlhttp.timeout = timeout;
        xmlhttp.ontimeout = function () {
            on_timeout();
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
    return that;
})();







function WaitSync(callback) {


    var completeCount = 0;
    var flags = {};

    // task return values will be stored here
    // and will be passed to callback as argument
    var buffer = {
        'order': [],
        'groupOrder': [],
        'data': {}
    };

    /**
     * Wrap task with callback
     * @param Function task 
     * @param Object ctx Context. Object which will be referenced "this"
     *        inside the task. For those who know the indepths of JS OOP
     * @return Function
     */
    var wrapOne = function (task, ctx) {
        // remember in which order did we come in
        var whoAmI = completeCount;

        // add count
        completeCount++;
        var iAmDone = false;

        return function () {

            // proxy, buffer
            var tmp = task.apply(ctx, arguments);

            // log the result
            buffer.order.push(whoAmI);

            // just returns result if the same task called twice
            // actually it means your design needs some refactoring
            if (iAmDone)
                return tmp;

            // is it time to call back? :)
            completeCount--;

            iAmDone = true;

            if (completeCount === 0)
                callback(buffer);

            return tmp;
        }

    };

    /**
     * Wrap task with potential callback and assign it a certain group.
     * Several tasks may be grouped.
     * When task is finished, it's whole group is considered to be done.
     * It's like... wait for one of the group to be complete.
     * @param Number/String groupName a name of the group
     * @param Function task 
     * @param Object ctx Context. An object which will be referenced "this"
     *        inside the task
     * @return Function
     */
    var wrapGroup = function (groupName, task, ctx) {

        // if not created earlier
        if (flags[groupName] !== false) {
            // set task group uncomplete 
            flags[groupName] = false;
            completeCount++;
        }

        // to prevent doubletriggerring (actually not necessary here)
        var iAmDone = false;

        return function () {
            var tmp = task.apply(ctx, arguments);


            // same as in wrap... just return result if called twice 
            if (iAmDone)
                return tmp;

            // only if group is not done
            if (!flags[groupName]) {
                completeCount--;
                flags[groupName] = true;

                // log result:
                buffer.order.push(groupName);
                buffer.groupOrder.push(groupName);
                buffer.data[groupName] = tmp;

                // is it time?
                if (completeCount === 0)
                    callback(buffer);
            }

            return tmp;
        }
    };


    /**
     * Wrap "task" with callback. Returns a wrapped function to be used 
     * instead.
     * 
     * @param [optional] String/Number Optional id of the task. 
     *         A "named" task so to say... 
     *         Several tasks may have the same id. In this case whenever
     *         one of them finishes, the whole group is considered to 
     *         be finished. E.g. ajax success and error callbacks may be
     *         groupped together so whatever happens, the callback will 
     *         be fired.
     * @param Function task Function to be wrapped
     * @param Object ctx Context. An object which will be referenced "this"
     *        inside the task
     * @return Function a wrapped function.
     */
    this.wrap = function () {
        var call = wrapOne;

        if (!(arguments[0] instanceof Function) && (arguments[1] instanceof Function))
            call = wrapGroup;

        return call.apply(this, arguments);
    }
}



function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

/*class ParticleDestOut
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.speed = +Math.random()*2;
        this.active = true;
    }
    update()
    {
        if (this.active) {
            this.speed = -1+Math.random() * 2;

            this.y += this.speed;

            if (this.y > 1500) {
                this.active = false;
            }
        }
        //console.log(this.y);
    }
    draw(ctx)
    {
        ctx.beginPath();
        //ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.rect(this.x, this.y, 12,12);
        //ctx.globalAlpha = 1;

        ctx.fillStyle = "#000";
        ctx.fill();
        ctx.closePath();
    }
}

class Particle
{
    constructor(x,y,color)
    {
        this.x = x;
        this.y = y;
        this.speed = 100;
        this.speed = 1 + Math.random() * 10;

        this.active = true;

        this.color = "#fff";
        this.color = "rgba(" +
            color[0] + "," +
            color[1] + "," +
            color[2] + "," + "1)";
        //alert(this.color);
    }
    update() {
        if (this.active) {
            this.y += this.speed;

            if (this.y > 1500) {
                this.active = false;
            }
        }
        //console.log(this.y);
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 12, 0, Math.PI);
        //ctx.rect(this.x, this.y, 1, 12);

        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.closePath();
    }
}

class LinePixelsCuter
{
    constructor(x,y,wh,count,ctx)
    {
        this.x = x;
        this.y = y;
        this.wh = wh;
        this.limit = count;
        this.counter = 0;
        this.ctx = ctx;
    }
    start()
    {
        //console.log(this.x);
        this.ctx.globalCompositeOperation = "destination-out";
        this.ctx.beginPath();
        //ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        this.ctx.rect(this.x, this.y, this.wh, this.wh);
        //ctx.globalAlpha = 1;
        this.ctx.fillStyle = "#000";
        this.ctx.fill();
        this.ctx.closePath();

        this.counter++;
        this.x += this.wh;
        if (this.counter >= this.limit) {
            return;
        }
        setTimeout(this.start.bind(this),100);
    }
}

class ParticlesAnimator
{
    constructor(canvas, context, imgData,x,y)
    {
        this.cvs = canvas;
        this.ctx = context;
        this.imgData = imgData;
        console.log(imgData);
        this.x = x;
        this.y = y;
        this.particles_ = [];
        this.particles1_ = [];

        this.cur_pix_anim_i = 0;
        this.cur_pix_anim_j = 0;
        this.cur_pix_anim_x = 0;
        this.cur_pix_anim_y = 0;

        this.lpcs_ = [];

        this.init();

    }
    init()
    {
        for (var i = 0; i < this.imgData.width; i++) {

            let start_i = i*4
            let color = [
                this.imgData.data[start_i],
                this.imgData.data[start_i + 1],
                this.imgData.data[start_i + 2]
            ];
            this.particles1_.push(new Particle(this.x + i, this.y, color));
        }

        for (var i = 0; i < this.imgData.width; i++) {
            this.particles_.push(new ParticleDestOut(this.x + i, this.y));
        }
        
    }
    animate()
    {
        //console.log("here");
        //this.animate0();
        //setTimeout(this.animate1.bind(this), 3000);
        setTimeout(this.animate2.bind(this), 300);

        //this.animate1();
    }
    animate0()
    {
        let arr_to_delete = [];
        let arr_to_delete1 = [];


        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.globalAlpha = 1;

        for (var i = 0; i < this.particles1_.length; i++) {
            this.particles1_[i].update();
            this.particles1_[i].draw(this.ctx);
            if (!this.particles1_[i].active) {
                arr_to_delete1.push(i);
            }
        }

        for (var i = 0; i < arr_to_delete1.length; i++) {
            this.particles1_.splice(arr_to_delete1[i] + i, 1);
        }



        this.ctx.globalAlpha = 1;
        fillRDestInByContext(this.ctx, this.x, this.y, 750, 750);

        this.ctx.globalCompositeOperation = "destination-out";
        for (var i = 0; i < this.particles_.length; i++) {
            //this.particles_[i].update();
            //this.particles_[i].draw(this.ctx);
            if (!this.particles_[i].active) {
                arr_to_delete.push(i);
            }
        }

        for (var i = 0; i < arr_to_delete.length; i++) {
            this.particles_.splice(arr_to_delete[i] + i, 1);
        }

        if (this.particles1_.length == 0) {
            alert();
            //this.animate1();
            return;
        }
        if (this.particles_.length == 0) {
            alert();
            return;
        }
        window.requestAnimationFrame(this.animate0.bind(this));
    }
    animate1()
    {
        this.ctx.globalCompositeOperation = "destination-out";

        this.cur_pix_anim_x = this.x + this.cur_pix_anim_i*20;
        this.cur_pix_anim_y = this.y + this.cur_pix_anim_j*20;

        this.cur_pix_anim_i++;
        if (this.cur_pix_anim_i > 25) {
            this.cur_pix_anim_j++
            this.cur_pix_anim_i = 0;
            if (this.cur_pix_anim_j > 25) {
                return;
            }
        }

        this.ctx.beginPath();
        //ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        this.ctx.rect(this.cur_pix_anim_x, this.cur_pix_anim_y, 20, 20);
        //ctx.globalAlpha = 1;
        this.ctx.fillStyle = "#000";
        this.ctx.fill();
        this.ctx.closePath();

        //window.requestAnimationFrame(this.animate1.bind(this));
        setTimeout(this.animate1.bind(this), 10);
    }
    animate2()
    {
        

        let wh = 20;
        for (var i = 0; i < 40; i++) {
            let lpc = new LinePixelsCuter(this.x, this.y + i * wh, wh, 45, this.ctx);
            //this.lpcs_.push(lpc);
            setTimeout(lpc.start.bind(lpc), 20 * i);
        }
    }
}
*/


/*class Particle {
    constructor(canvas, context,detail) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;//canvas.height;
        //this.prevX = this.x;
        this.speed = 0;
        this.velocity = Math.random() * 0.4;
        this.size = Math.random() * 2 + 0.5;

        this.detail = detail
        this.position1 = Math.floor(this.y / detail);
        this.position2 = Math.floor(this.x / detail);
        this.angle = 0;

        this.canvas = canvas;
        this.ctx = context;
    }
    update(grid) {
        this.position1 = Math.floor(this.y / this.detail);
        this.position2 = Math.floor(this.x / this.detail);
        if (grid[this.position1]) {
            if (grid[this.position1][this.position2]) {
                this.speed = grid[this.position1][this.position2][1];
            }
        }
        this.angle += this.speed / 20;
        let movement = (2.5 - this.speed) + this.velocity;
        this.y -= movement + Math.cos(this.angle) * 2;
        this.x += Math.cos(this.angle) * 2;
        if (this.y <= 0) {
            this.y = this.canvas.height;
            this.x = Math.random() * this.canvas.width;
        }
        console.log(this.x += movement)
    }
    draw(grid) {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        if (this.y > this.canvas.height - this.size * 6) this.ctx.globalAlpha = 0;
        if (grid[this.position1]) {
            if (grid[this.position1][this.position2]) {
                this.ctx.fillStyle = grid[this.position1][this.position2][0];
            }

        } else {
            this.ctx.fillStyle = 'white';
        }
        this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        this.ctx.fill();

    }
}

class ParticlesAnimator
{
    constructor(canvas, ctx, imgData)
    {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particlesArray = [];
        this.numberOfParticles = 5000;
        this.detail = 1;
        this.grid = [];
        this.pixels = imgData;
        this.init();
    }
    init()
    {
        for (let y = 0; y < this.canvas.height; y += this.detail) {
            this.row = [];
            for (let x = 0; x < this.canvas.width; x += this.detail) {
                this.red = this.pixels.data[(y * 4 * this.pixels.width) + (x * 4)]
                this.green = this.pixels.data[(y * 4 * this.pixels.width) + (x * 4 + 1)]
                this.blue = this.pixels.data[(y * 4 * this.pixels.width) + (x * 4 + 2)]
                this.color = 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
                this.brightness = this.calculateBrightness(this.red, this.green, this.blue) / 100;
                this.cell = [
                    //cellColor = this.color,
                    this.color,

                    //cellBrightness = this.brightness,
                    this.brightness

                ];
                this.row.push(this.cell);
            }
            this.grid.push(this.row);
        }

        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particlesArray.push(new Particle(this.canvas, this.ctx, this.detail));
        }
    }
    animate() {
        this.ctx.globalAlpha = 0.05;
        this.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = 0.2;
        for (let i = 0; i < this.particlesArray.length; i++) {
            this.particlesArray[i].update(this.grid);
            //this.ctx.globalAlpha = this.particlesArray[i].speed * 0.3;
            this.particlesArray[i].draw(this.grid);
        }
        requestAnimationFrame(this.animate.bind(this));
    }
    calculateBrightness(red, green, blue) {
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        );
    }
}
*/
/*image.addEventListener('load', function () {
    
*//*
    let particlesArray = [];
    const numberOfParticles = 5000;
    const detail = 1;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let grid = [];
    for (let y = 0; y < canvas.height; y += detail) {
        let row = [];
        for (let x = 0; x < canvas.width; x += detail) {
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)]
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)]
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)]
            const color = 'rgb(' + red + ',' + green + ',' + blue + ')';
            const brightness = calculateBrightness(red, green, blue) / 100;
            const cell = [
                cellColor = color,
                cellBrightness = brightness,
            ];
            row.push(cell);
        }
        grid.push(row);
    }
    console.log(grid);*//*
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            //this.prevX = this.x;
            this.speed = 0;
            this.velocity = Math.random() * 0.4;
            this.size = Math.random() * 2 + 0.5;
            this.position1 = Math.floor(this.y / detail);
            this.position2 = Math.floor(this.x / detail);
            this.angle = 0;
        }
        update() {
            this.position1 = Math.floor(this.y / detail);
            this.position2 = Math.floor(this.x / detail);
            if (grid[this.position1]) {
                if (grid[this.position1][this.position2]) {
                    this.speed = grid[this.position1][this.position2][1];
                }
            }
            this.angle += this.speed / 20;
            let movement = (2.5 - this.speed) + this.velocity;
            this.y -= movement + Math.cos(this.angle) * 2;
            this.x += Math.cos(this.angle) * 2;
            if (this.y <= 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
            //console.log(this.x += movement)
        }
        draw() {
            ctx.beginPath();
            ctx.fillStyle = 'black';
            if (this.y > canvas.height - this.size * 6) ctx.globalAlpha = 0;
            if (grid[this.position1]) {
                if (grid[this.position1][this.position2]) {
                    ctx.fillStyle = grid[this.position1][this.position2][0];
                }

            } else {
                ctx.fillStyle = 'white';
            }
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();

        }
    }

    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    init();

    function animate() {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.3;
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }
    animate();

    

});



*/
