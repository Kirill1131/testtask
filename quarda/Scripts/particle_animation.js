class ParticleDestOut {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = +Math.random() * 2;
        this.active = true;
    }
    update() {
        if (this.active) {
            this.speed = -1 + Math.random() * 2;

            this.y += this.speed;

            if (this.y > 1500) {
                this.active = false;
            }
        }
        //console.log(this.y);
    }
    draw(ctx) {
        ctx.beginPath();
        //ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.rect(this.x, this.y, 12, 12);
        //ctx.globalAlpha = 1;

        ctx.fillStyle = "#000";
        ctx.fill();
        ctx.closePath();
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.speed = 100;
        this.speed = 1 + Math.random() * 2;

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
            this.x += -0.5 + Math.random();
            this.speed -= 0.01;

            if (this.speed<0) {

                this.active = false;
            }
            /*if (this.y > 1500) {
                this.active = false;
            }*/
        }
        //console.log(this.y);
    }
    draw(ctx) {
        let speed;
        if (speed = this.speed * 10 > 0) {
            ctx.beginPath();

            ctx.globalAlpha = this.speed;

            ctx.arc(this.x, this.y, this.speed * 10, 0, Math.PI * 2);
            //ctx.rect(this.x, this.y, 1, 12);

            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.closePath();
        }
    }
}

class LinePixelsCuter {
    constructor(x, y, wh, count, ctx) {
        this.x = x;
        this.y = y;
        this.wh = wh;
        this.limit = count;
        this.counter = 0;
        this.ctx = ctx;
    }
    start() {
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
        setTimeout(this.start.bind(this), 100);
    }
}

class ParticlesAnimator {
    constructor(canvas, context, imgData, x, y) {
        this.cvs = canvas;
        this.ctx = context;
        this.imgData = imgData;
        //console.log(imgData);
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
    init() {
        for (var i = 0; i < this.imgData.width; i++) {

            let start_i = i * 4
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
    animate() {
        this.animate0();
        //setTimeout(this.animate1.bind(this), 3000);
        //setTimeout(this.animate2.bind(this), 3000);

        //this.animate1();
    }
    animate0() {
        //console.log("here");
        //let arr_to_delete = [];
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

        /*this.ctx.globalCompositeOperation = "destination-out";
        for (var i = 0; i < this.particles_.length; i++) {
            //this.particles_[i].update();
            //this.particles_[i].draw(this.ctx);
            if (!this.particles_[i].active) {
                arr_to_delete.push(i);
            }
        }

        for (var i = 0; i < arr_to_delete.length; i++) {
            this.particles_.splice(arr_to_delete[i] + i, 1);
        }*/

        if (this.particles1_.length == 0) {
            //alert();
            //this.animate1();
            this.animate2();
            return;
        }
        /*if (this.particles_.length == 0) {
            alert();
            return;
        }*/
        window.requestAnimationFrame(this.animate0.bind(this));
    }
    animate1() {
        this.ctx.globalCompositeOperation = "destination-out";

        this.cur_pix_anim_x = this.x + this.cur_pix_anim_i * 20;
        this.cur_pix_anim_y = this.y + this.cur_pix_anim_j * 20;

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
    animate2() {

        //console.log("here2");

        let wh = 20;
        for (var i = 0; i < 40; i++) {
            let lpc = new LinePixelsCuter(this.x, this.y + i * wh, wh, 45, this.ctx);
            //this.lpcs_.push(lpc);
            setTimeout(lpc.start.bind(lpc), 20 * i);
        }
    }
}
