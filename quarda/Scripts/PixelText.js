
var pixel_alphabet_5_per_5 = {
    "O": [
        [0, 0.5, 1, 0.5, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, .5, 1, .5, 0]
    ],
    "O": [
        [0.5, 1,1, 1, .5],
        [1, 0,0, 0, 1],
        [1, 0,0, 0, 1],
        [1, 0,0, 0, 1],
        [.5, 1,1, 1, .5]
    ],
    "Q": [
        [0.5, 1, 1, 1, .5],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 1, 1],
        [.5, 1, 1, 1, .5]
    ],
    "U": [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [.5, 1, 1, 1, .5]
    ],
    "A": [
        [.5, 1, 1, 1, .5],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1]
    ],
    "D": [
        [1, 1, 1, 1, .5],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, .5]
    ],
    "R": [
        [1, 1, 1, 1, .5],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, .5],
        [1, 0, 0, 0, 1],
    ],
    "B": [
        [1, 1, 1, 1, .5],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 1, .5],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, .5]
    ],
    "H": [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1]
    ],
    "M": [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 0, 1, 1],
        [1, 0.5, 1, 0.5, 1],
        [1, 0, 0, 0, 1]
    ],
    "E": [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
    ],
    "#": [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
    ],
};

class Pixel
{
    constructor()
    {
        this.dom = dce("div", "pixel");
        this.base_opacity = 0;
    }
    setColor(color)
    {
        this.dom.style.background = color;
    }
    setOpacity(value)
    {
        this.dom.style.opacity = value;
        this.base_opacity = value;
    }
    setFullOpacity(value) {
        if (value>0) {
            value = 1;
        }
        this.dom.style.opacity = value;
        this.base_opacity = value;
    }
    changeOpacity(value)
    {
        this.dom.style.opacity = value;
    }
    changeOpacityWithBack(value, callbacktime)
    {
        this.dom.style.opacity = value;
        setTimeout(function () { this.dom.style.opacity = this.base_opacity }.bind(this), callbacktime);
    }
    setBaseOpacity()
    {
        this.dom.style.opacity = this.base_opacity;
    }
    sethalfOpacityIfNull()
    {
        if (this.base_opacity == 0) {
            this.changeOpacityWithBack(0.5, 100);
        }
    }
    changeTransition(value)
    {
        this.dom.style.transition = value;
    }
}

class Letter
{
    constructor(char, color = "#f00",option = "normal")
    {
        this.option = 0;
        switch (option) {
            case "fullOpacity":
                this.option = 1;
                break;
            case "normal":
                this.option = 0;
                break;
            default:
                this.option = 0;
                break;
        }

        this.char;
        this.dom = dce("div","pixel-letter");
        this.pixels_ = [];
        this.setPixels(char,color);
    }
    setPixels(char,color)
    {
        if (Object.keys(pixel_alphabet_5_per_5).includes(char)) {

            this.char = char;
            //console.log(char);
            for (var i = 0; i < 5; i++) {
                //this.pixels_[i] = [];
                let line = dce("div", "pixel-line");
                for (var j = 0; j < 5; j++) {
                    let pixel = new Pixel();
                    pixel.setColor(color);
                    if (this.option == 0) {
                        pixel.setOpacity(pixel_alphabet_5_per_5[char][i][j]);
                    }
                    if (this.option == 1) {
                        pixel.setFullOpacity(pixel_alphabet_5_per_5[char][i][j]);
                    }
                    if (this.option == 0) {
                    }
                    this.pixels_.push(pixel);
                    line.appendChild(pixel.dom);
                }
                this.dom.appendChild(line);
            }
        } else {
            for (var i = 0; i < 5; i++) {
                this.pixels_[i] = [];
                let line = dce("div", "pixel-line");
                for (var j = 0; j < 5; j++) {
                    let pixel = new Pixel();
                    this.pixels_.push(pixel);
                    line.appendChild(pixel.dom);
                }
                this.dom.appendChild(line);
            }
        }

        this.cur_pixel = this.pixels_.length - 1;

    }
    changePixelsByCallBack(char, callback)
    {
        this.char = char;
        setTimeout(this.changePixels.bind(this), callback);
    }
    changePixels(char)
    {
        if (Object.keys(pixel_alphabet_5_per_5).includes(this.char)) {

            for (var i = 0; i < 5; i++) {

                for (var j = 0; j < 5; j++) {
                    let pixel_id = i * 5 + j
                    //this.pixels_[pixel_id].setColor(color);
                    this.pixels_[pixel_id].setOpacity(pixel_alphabet_5_per_5[this.char][i][j]);

                }
            }
        } else {
            for (var i = 0; i < 5; i++) {

                for (var j = 0; j < 5; j++) {
                    let pixel_id = i * 5 + j
                    this.pixels_[pixel_id].setOpacity(1);
                }
            }
        }
    }
    appear()
    {
        this.pixels_[this.cur_pixel].setBaseOpacity();
        this.pixels_[this.cur_pixel].sethalfOpacityIfNull();
        this.cur_pixel--;

        if (this.cur_pixel == -1) {
            return;
            /*this.cur_pixel = this.pixels_.length - 1;
            //console.log(this.cur_letter, this.letters_.length);
            if (this.cur_letter == this.letters_.length) {
            //    this.cur_letter = 0;
                //console.log(this.cur_letter, this.letters_.length);


                this.apper_anim_fullfilled = true;
                this.animation1();
                if (handler) {
                    //handler.main();
                }
                return;
            }*/
        }
        setTimeout(this.appear.bind(this), 10);
    }
}
//
//  WARNING! PixelText IS WORKING ONLY IF URL CONTAINS WORDS: Index, Login, Regystry
//  Search in code f.e. "document.location.href.includes("Index")"
//
class PixelText
{
    constructor(parrent_element, text, pre_parrent_element, color = "#59f",option = "normal")
    {
        this.color = color;

        this.letters_ = [];
        this.dom = parrent_element;
        //console.log(this.dom);
        for (var i = 0; i < text.length; i++) {
            let letter = new Letter(text[i], this.color,option);
            //console.log(letter);
            this.letters_.push(letter);
            this.dom.appendChild(letter.dom);
        }

        this.apper_anim_fullfilled = false;

        this.animation_times = 1;
        this.animation_cur_time = 0;

        this.cur_letter = 0;
        this.cur_pixel_line = 0;
        this.cur_pixel = 0;

        pre_parrent_element.onmouseenter = function () { this.changeText("#HOME#"); }.bind(this);
        pre_parrent_element.onmouseleave = function () { this.changeText(text); }.bind(this);
    }
    changeText(str)
    {
        if (this.apper_anim_fullfilled) {
            for (var i = 0; i < this.letters_.length; i++) {
                //setTimeout(function (id, char) { this.letters_[id].changePixels(char); }.bind(this)(i, str[i]), 11+getRandomInt(100));
                this.letters_[i].changePixelsByCallBack(str[i], 11 + getRandomInt(350));
            }
        }

    }
    flare(times)
    {
        this.animation_times = times;
        this.flareAnimation();
    }
    flareAnimation()
    {
        //console.log(this.letters_);
        //console.log(this.letters_[this.cur_letter].pixels_);
        //console.log(this.letters_[this.cur_letter].pixels_[this.cur_pixel_line]);
        this.letters_[this.cur_letter].pixels_[this.cur_pixel].changeOpacityWithBack(0, 100);
        this.cur_pixel++;
        if (this.cur_pixel == this.letters_[this.cur_letter].pixels_.length) {
            this.cur_pixel = 0;
            this.cur_letter++;
        }
        if (this.cur_letter == this.letters_.length) {
            this.cur_letter = 0;
            this.animation_cur_time++;
        }
        if (this.animation_cur_time == this.animation_times) {
            this.animation_cur_time = 0;
            return;
        }
        setTimeout(function () { this.flareAnimation(); }.bind(this), 1);
    }
    desappear()
    {
        for (var i = 0; i < this.letters_.length; i++) {
            for (var j = 0; j < this.letters_[i].pixels_.length; j++) {
                this.letters_[i].pixels_[j].changeOpacity(0);
            }
        }
    }
    appear()
    {
        this.cur_letter = 0;
        this.cur_pixel = this.letters_[this.cur_letter].pixels_.length - 1;
        this.appearAnimation();
    }
    appearAnimation()
    {


        this.letters_[this.cur_letter].appear();
        //console.log(this.cur_pixel);

        this.cur_letter++;

        /*this.letters_[this.cur_letter].pixels_[this.cur_pixel].setBaseOpacity();
        this.letters_[this.cur_letter].pixels_[this.cur_pixel].sethalfOpacityIfNull();
        this.cur_pixel--;
        if (this.cur_pixel == -1) {
            this.cur_pixel = this.letters_[this.cur_letter].pixels_.length - 1;
            this.cur_letter++;

            //console.log(this.cur_letter, this.letters_.length);
            if (this.cur_letter == this.letters_.length) {
            //    this.cur_letter = 0;
                //console.log(this.cur_letter, this.letters_.length);


                this.apper_anim_fullfilled = true;
                this.animation1();
                if (handler) {
                    //handler.main();
                }
                return;
            }
        }*/
        if (this.cur_letter == this.letters_.length) {
            //    this.cur_letter = 0;
            //console.log(this.cur_letter, this.letters_.length);


            this.apper_anim_fullfilled = true;
            //this.animation1();
            setTimeout(this.animation1.bind(this), 1101);

            if (handler) {
                //handler.main();
            }
            return;
        }
        setTimeout(function () { this.appearAnimation(); }.bind(this), 110);

        //setTimeout(function () { this.appearAnimation(); }.bind(this), 11);
        //console.log(this.cur_letter);
    }
    animation1()
    {
        //console.log("3");
        //this.letters_[random_letter_id].pixels_[getRandomInt(random_pixel_id)].dom.style.transition = "all 2s";
        //this.letters_[random_letter_id].pixels_[random_pixel_id].changeTransition("all 2s linear 0s");
        //this.letters_[random_letter_id].pixels_[random_pixel_id].changeTransition("all 0.2s");

        for (var i = 0; i < this.letters_.length; i++) {
            for (var j = 0; j < this.letters_[i].pixels_.length; j++) {
                //this.letters_[i].pixels_[j].changeTransition("all 0.9s");
                this.letters_[i].pixels_[j].changeTransition("all 0.4s");

            }
        }

        this.animation1Started();
    }
    animation1Started()
    {

        let random_letter_id = getRandomInt(this.letters_.length);
        let random_pixel_id = getRandomInt(this.letters_[random_letter_id].pixels_.length);
        this.letters_[random_letter_id].pixels_[random_pixel_id].changeOpacityWithBack(0, getRandomInt(1000));
        setTimeout(function () { this.animation1Started(); }.bind(this), 111+getRandomInt(200));
    }
}
//var pixelText = new PixelText(dgebi("PixelText"), "QUADRA");
//var pixelText = new PixelText(dgebi("PixelText"), "ARDUAQ");
var pixelText = new PixelText(dgebi("PixelText"), "QUARDA", dgebi("c_header_app_name_box"));

//pixelText.animate();
//pixelText.appearAnimation();


//setInterval(pixelText.animate.bind(pixelText), 1);


//var sign_up_box_dom = dgebi("sign_up_box");

class DropFromRightBtn
{
    constructor(name,func)
    {
        this.dom = dce("div", "drop-from-left-btn");
        this.dom.onclick = func;
        this.dom.innerHTML = "<div class='drop-from-left-btn-inside'>"+name+"</div>";
    }
    setLeftMargin(value)
    {
        this.dom.style.marginLeft = value;
        //console.log(value);
    }
}
class DropFromRight
{
    constructor()
    {
        this.dom = dce("div","drop-from-left");
        this.items_ = [];

        this.open = false;
        this.delay = 200;
    }
    handle()
    {
        if (!this.open) {
            for (var i = 0; i < this.items_.length; i++) {
                //this.items_[i].setLeftMargin("0%");
                this.showItem(i);
            }
            this.open = true;
        } else {
            for (var i = 0; i < this.items_.length; i++) {
                //this.items_[i].setLeftMargin("100%");
                this.hideItem(i);
            }
            this.open = false;
        }

    }
    showItem(id)
    {
        setTimeout(function () { this.items_[id].setLeftMargin("0%"); }.bind(this), this.delay*id);
    }
    hideItem(id)
    {
        this.items_[id].setLeftMargin("100%");
    }
    addBtn(name,func)
    {
        let btn = new DropFromRightBtn(name, func);

        btn.setLeftMargin("100%");

        this.items_.push(btn);
        this.dom.appendChild(btn.dom);
    }
}

var sign_up_box = {
    dom: dgebi("sign_up_box"),
    dropDown: new DropFromRight(),
    setSigned()
    {
        this.dom.innerHTML = "";
        this.dropDown = new DropFromRight();
        //console.log(this.dropDown);


        let login_menu = dce("div", "login-btn");

        let div, sub_div, img;


        div = dce("div", "login-btn-uname-container");
        sub_div = dce("div", "login-btn-uname");
        sub_div.innerHTML = getCookie("shg_u_name");
        div.appendChild(sub_div);
        login_menu.appendChild(div);

        div = dce("div", "login-btn-uname-container");
        sub_div = dce("div", "login-btn-img");
        img = dce("object","svg-obj");
        img.type = "image/svg+xml";
        img.data = "../Content/Media/no_avatar11.svg";
        img.innerHTML = "<img src = '../Content/Media/no_avatar11.svg'>";


        sub_div.appendChild(img);
        div.appendChild(sub_div);
        login_menu.appendChild(div);

        this.dom.appendChild(login_menu);

        this.dropDown.addBtn("Edit profile", function () { document.location.href = "EditProfile" });
        this.dropDown.addBtn("Sign out", function () { document.location.href = "SignOut" });

        this.dom.onclick = function () {
            this.dropDown.handle();
        }.bind(this);
        this.dom.appendChild(this.dropDown.dom);

    }
}

if (getCookie("shg_u_name")) {
    if (getCookie("shg_u_name").length > 0) {
        sign_up_box.setSigned();
        //console.log(getCookie("shg_u_name"));

        pixelText.animation1();
    }
} else {
    if (document.location.href.includes("Index")) {
        pixelText.desappear();
        pixelText.appear();

    }
    if (document.location.href.includes("Login") || document.location.href.includes("Registry")) {
        pixelText.flare(1);
    }
}
pixelText.desappear();
pixelText.appear();


var c_header_app_name_box = dgebi("c_header_app_name_box");

c_header_app_name_box.onclick = function () {
    //document.location.href = "Index";
    console.log(document.location.href)
    if (document.location.href.includes("Home")) {
        document.location.href = "Index";
    } else {
        document.location.href = "Home/Index";
    }
}
