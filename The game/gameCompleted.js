/*plans:
1   get the fireworks to fire from Ilias
2   firework sounds when the firework "pop"
*/



gameComplete = function () {


    //stroke(255, 0, 0);
    // strokeWeight(5);
    if (frameCount % 130 === 0) {
        background(0);
    } else {
        background(0, 50);
    }
    if (random(0, 1) < 0.03) {
        fireworks.push(new Firework());
    }

    for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();
        if (fireworks[i].done()) {
            fireworks.splice(i, 1);
        }

    }
    textAlign(CENTER);
    textSize(120);
    fill(255, 0, 0);
    text("Well Done!", width / 2, height / 2);



    //ellipse(egg.x,egg.y,egg.r)
    d = dist(mouseX, mouseY, egg.x, egg.y)
}


function mousePressed() {
    if (d < egg.r) {
        for (var i = 0; i < 5; i++) {
            fireworks.push(new Firework());
        }
    }
}



function Particle(x, y, firework) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;

    if (this.firework) {
        this.vel = createVector(0, random(-11, -7));
    } else {
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(2.5, 8));

    }
    this.acc = createVector(0, 0);

    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.update = function () {
        if (!this.firework) {
            this.vel.mult(0.94);
            this.lifespan -= 3.5;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    this.done = function () {
        if (this.lifespan <= 0)
            return true;
    }



    this.show = function () {

        if (!this.firework) {
            stroke(random(255), random(255), random(255), this.lifespan)
            strokeWeight(3)
        } else {
            push();
            stroke(255, 0, 0)
            strokeWeight(4)
        }
        point(this.pos.x, this.pos.y);
        pop();
    }
}

function Firework() {

    this.firework = new Particle(random(width), height, true);
    this.exploded = false
    this.particles = [];

    this.done = function () {
        if (this.exploded && this.particles.length === 0) {
            return true;
        } else {
            return false;
        }
    }



    this.update = function () {
        if (!this.exploded) {
            this.firework.applyForce(gravity);
            this.firework.update();
            if (this.firework.vel.y >= 0) {
                this.exploded = true
                this.explode();
                effects[4].play();

            }
        }

        for (var i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].applyForce(gravity)
            this.particles[i].update();
            if (this.particles[i].done()) {
                this.particles.splice(i, 1);

            }
        }
    }
    this.explode = function () {
        for (var i = 0; i < 100; i++) {
            var p = new Particle(this.firework.pos.x, this.firework.pos.y, false);
            this.particles.push(p);
        }
    }


    this.show = function () {
        if (!this.exploded) {
            this.firework.show();
        }

        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].show();
        }
    }
}