

var classic_games_data = [
    { name: "chess", img_src: "Content/Media/Icons/Chess.png", bgc: [85, 153, 255]},
    { name: "shogi", img_src: "Content/Media/Icons/Shogi.png", bgc: [185,153,255] },
    { name: "checkers", img_src: "Content/Media/Icons/Checkers.png", bgc: [185, 200, 153] },
    { name: "hnefatafl", img_src: "Content/Media/Icons/hnefatafl.png", bgc: [200, 153, 153] },
    { name: "dominoes", img_src: "Content/Media/Icons/Dominoes.png", bgc: [85, 153, 255]}

];


/*let cvs1 = document.getElementById("inputbox");
let ctx1 = cvs1.getContext("2d");
let img = new Image();
img.src = "../Content/Media/Icons/Chess.png";*/
//fillRByContext(ctx1, 0, 0, 31, 31);



/*setTimeout(function () {
    let myImageData = ctx1.createImageData(cvs1.width, cvs1.height);
    ctx1.drawImage(img, 0, 0, 31, 31);
    myImageData = ctx1.getImageData(0, 0, 31, 31);
    console.log(myImageData);

    let putbox = document.getElementById("putbox");




    let pixel_board = new PixelBoard(31, 31);

    for (var i = 0; i < myImageData.data.length; i += 4) {
        let pixel = new Pixel(
            myImageData.data[i],
            myImageData.data[i + 1],
            myImageData.data[i + 2],
            myImageData.data[i + 3]
        );
        pixel_board.appendPixel(pixel);
    }
    //console.log(pixel_board);
    //pixel_board.putDataInNodeById("putbox");


}, 100);
//console.log(img);
*/


class PixelRGBA {
    constructor(r, g, b, a) {
        //this.color_ = [r, g, b, a];
        this.dom = dce("div", "pixel");

        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a/255;


        if (r == 85) {
            if (g == 153) {
                if (b == 255) {
                    this.r = 255;
                    this.g = 255;
                    this.b = 255;

                }
            }
        }
        if (r == 64) {
            if (g == 113) {
                if (b == 188) {
                    this.r = 55;
                    this.g = 55;
                    this.b = 55;
                    //this.a = 0.2;
                }
            }
        }
        /*if (a < 50) {
            this.a = 0.2
            this.r = 85;
            this.g = 153;
            this.b = 255;
        }*/


        this.base_opacity = this.a;
        this.setDomRGBA();
    }
    setDomRGBA() {
        this.dom.style.background = "rgba(" +
            this.r + "," +
            this.g + "," +
            this.b + "," +
            this.a +
            ")";
    }
    setDomWH(w, h) {
        this.dom.style.width = w + "px";
        this.dom.style.height = h + "px";
    }


    setColor(color) {
        this.dom.style.background = color;
    }
    setOpacity(value) {
        this.dom.style.opacity = value;
        this.base_opacity = value;
    }
    changeOpacity(value) {
        this.dom.style.opacity = value;
    }
    changeOpacityWithBack(value, callbacktime) {
        this.dom.style.opacity = value;
        setTimeout(function () { this.dom.style.opacity = this.base_opacity }.bind(this), callbacktime);
    }
    changeColorWithBack(r,g,b,a, callbacktime) {
        this.dom.style.background =
            "rgba(" +
            r + "," +
            g + "," +
            b + "," +
            a +")";
        setTimeout(function () {
            this.dom.style.background =
            "rgba(" +
            this.r + "," +
            this.g + "," +
            this.b + "," +
            this.a + ")"; }.bind(this), callbacktime);
    }
    setBaseOpacity() {
        this.dom.style.opacity = this.base_opacity;
    }
    sethalfOpacityIfNull() {
        if (this.base_opacity == 0) {
            this.changeOpacityWithBack(0.5, 100);
        }
    }
    changeTransition(value) {
        this.dom.style.transition = value;
    }
}
class PixelBoard {
    constructor(wl, hl) {

        this.dom = dce("div");

        this.pixel_data = [];
        this.cur_apnd_pixel = [0, 0];
        this.wl = wl;
        this.hl = hl;


        this.round_animation_started = false;
        this.stack_for_round_animation = [];
        this.cur_in_round_animation = 0;


        for (var i = 0; i < hl; i++) {
            this.pixel_data[i] = [];
        }
    }
    appendPixel(pixel) {
        this.pixel_data[this.cur_apnd_pixel[0]][this.cur_apnd_pixel[1]] = pixel;
        this.cur_apnd_pixel[1]++;
        if (this.cur_apnd_pixel[1] == this.hl) {
            this.cur_apnd_pixel[1] = 0;
            this.cur_apnd_pixel[0]++;
        }
    }
    createStackForRoundAnimation()
    {
        for (var i = 0; i < this.wl; i++) {
            let arr_ = [i, 0];
            this.stack_for_round_animation.push(arr_);
        }
        for (var i = 1; i < this.hl; i++) {
            let arr_ = [this.wl-1, i];
            this.stack_for_round_animation.push(arr_);
        }

        for (var i = this.wl-2; i > -1; i--) {
            let arr_ = [i, this.hl - 1];
            this.stack_for_round_animation.push(arr_);
        }
        for (var i = this.wl - 2; i > 0; i--) {
            let arr_ = [0, i];
            this.stack_for_round_animation.push(arr_);
        }
    }
    createStacks() {
        this.createStackForRoundAnimation();
    }
    startRoundAnimation()
    {
        if (!this.round_animation_started) {
            this.round_animation_started = true;
            setTimeout(this.roundAnimation.bind(this), 100);
        }
    }
    stopRoundAnimation() {
        this.cur_in_round_animation = 0;
        this.round_animation_started = false;
    }
    roundAnimation()
    {
        if (!this.round_animation_started) {
            return;
        }
        //let i = this.stack_for_round_animation[this.cur_in_round_animation][0];
        //let j = this.stack_for_round_animation[this.cur_in_round_animation][1];

        //this.pixel_data[i][j].changeTransition("0.1s");

        //this.pixel_data[i][j].changeColorWithBack(255, 255, 255, 1, 500);


        //this.pixel_data[i][j].changeOpacityWithBack(0, 500);
        this.pixel_data
        [this.stack_for_round_animation[this.cur_in_round_animation][0]]
        [this.stack_for_round_animation[this.cur_in_round_animation][1]]
            .changeOpacityWithBack(0, 500);



        //this.pixel_data[i][j].changeColorWithBack(105, 155, 255, 0, 500);



        this.cur_in_round_animation++;
        if (this.cur_in_round_animation >= this.stack_for_round_animation.length) {
            this.cur_in_round_animation = 0;
        }
        //setTimeout(this.roundAnimation.bind(this), 20);
        window.requestAnimationFrame(this.roundAnimation.bind(this));

    }
    putDataInDom() {
        //let node = document.getElementById(id);

        this.createStacks();

        for (var i = 0; i < this.pixel_data.length; i++) {

            let line = dce("div", "pixel-line");
            //console.log(this.pixel_data);
            for (var j = 0; j < this.pixel_data[i].length; j++) {
                //let pix = dce("div", "pixel");
                /*let pix = new PixelRGBA(
                    this.pixel_data[i][j].r,
                    this.pixel_data[i][j].g,
                    this.pixel_data[i][j].b,
                    this.pixel_data[i][j].a
                );*/
                //pix.setDomWH(7,7);
                /*pix.style.background = "rgba(" +
                    this.pixel_data[i][j].r + "," +
                    this.pixel_data[i][j].g + "," +
                    this.pixel_data[i][j].b + "," +
                    this.pixel_data[i][j].a +
                    ")";
                pix.style.width = "7px";
                pix.style.height = "7px";*/

                line.appendChild(this.pixel_data[i][j].dom);
                //console.log(pix);
            }
            //node.appendChild(line);
            this.dom.appendChild(line);
        }
        //console.log(node);
    }
}

class GameBarElement {
    constructor(wl = 31, hl = 31) {
        this.pixel_board = new PixelBoard(wl, hl);
        this.dom = dce("div", "games-bar-item");
        this.dom.appendChild(this.pixel_board.dom);

        this.dom.addEventListener("mouseenter", this.hover.bind(this) , false);

        this.dom.addEventListener("mouseleave", this.unHover.bind(this), false);

        this.hover_bg_color_;
    }
    setImageByImageData(imageData) {
        //console.log(imageData.data);
        for (var i = 0; i < imageData.data.length; i += 4) {
            let pixel = new PixelRGBA(
                imageData.data[i],
                imageData.data[i + 1],
                imageData.data[i + 2],
                imageData.data[i + 3]
            );
            pixel.setDomWH(7, 7);
            this.pixel_board.appendPixel(pixel);
        }

        this.pixel_board.putDataInDom();
    }
    setTitle(text)
    {
        this.dom.setAttribute ("title", text);
    }
    setHoverBgColor(color_rgba_)
    {
        this.hover_bg_color_ = color_rgba_;
    }
    hover()
    {
        this.dom.style.background =
            "rgba(" +
            this.hover_bg_color_[0] + "," +
            this.hover_bg_color_[1] + "," +
            this.hover_bg_color_[2] + "," +
            1 + ")";
        this.dom.style.boxShadow =
            "0px 0px 10px 2px rgba(" +
            this.hover_bg_color_[0] + "," +
            this.hover_bg_color_[1] + "," +
            this.hover_bg_color_[2] + "," +
            1 + ")";
        this.startRoundAnimation();
    }
    unHover()
    {
        this.dom.style.background =
            "rgba(" +
            85  + "," +
            153 + "," +
            255 + "," +
            0.2 + ")";
        this.dom.style.boxShadow = "none";
        this.stopRoundAnimation();

    }
    startRoundAnimation() {
        this.pixel_board.startRoundAnimation();
    }
    stopRoundAnimation() {
        this.pixel_board.stopRoundAnimation();
    }
}

class GameBar {
    constructor(id) {
        this.dom = dgebi(id);

        this.cvs = document.createElement("canvas");
        this.ctx = this.cvs.getContext("2d");

        this.elw = 31;
        this.elh = 31;


        this.cvs.width = this.elw;
        this.cvs.height = this.elh;


        this.elements_ = [];
        //this.dom.appendChild(this.cvs);
    }
    setByData(data) {
        for (var i = 0; i < data.length; i++) {
            let img = new Image();
            img.src = data[i].img_src;
            img.onload = function (data,i) {
                //console.log(data);
                //event.target.crossOrigin = "Anonymous";
                this.ctx.clearRect(0, 0, this.elw, this.elh);
                this.ctx.drawImage(img, 0, 0, this.cvs.width, this.cvs.height);

                let locImageData = this.ctx.createImageData(this.cvs.width, this.cvs.height);
                locImageData = this.ctx.getImageData(0, 0, this.elw, this.elh);
                //console.log(locImageData);
                let gb_element = new GameBarElement(this.elw, this.elh);
                gb_element.setImageByImageData(locImageData);
                gb_element.setHoverBgColor(data[i].bgc);
                //console.log(locImageData);
                //gb_element.setTitle(data[i].name);

                this.dom.appendChild(gb_element.dom);
                //console.log(gb_element);
                this.elements_.push(gb_element);
            }.bind(this, data,i);

        }
    }
}

var classic_games_bar = new GameBar("classic_games_bar");
classic_games_bar.setByData(classic_games_data);
