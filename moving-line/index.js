cvs = document.getElementById('canvas');
ctx = cvs.getContext('2d');

const fillStyleColor = 'rgba(1,255,255,0.5)';
const maxDistance = 300;

function init() {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
}

init();

function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

class Point {
    constructor() {
        this.r = 3;
        this.x = getRandom(0, cvs.width - this.r / 2);
        this.y = getRandom(0, cvs.height - this.r / 2);
        this.xSpeed = getRandom(-50, 50);
        this.ySpeed = getRandom(-50, 50);
        this.lastDrawTime = null;
    }

    draw() {
        console.log("drawing points");
        ctx.fillStyle = fillStyleColor;
        if (this.lastDrawTime) {
            const duration = (Date.now() - this.lastDrawTime) / 1000;
            const xDistance = this.xSpeed * duration;
            const yDistance = this.ySpeed * duration;
            this.x = this.x + xDistance;
            this.y = this.y + yDistance;
            if (this.x > cvs.width - this.r / 2) {
                this.x = cvs.width - this.r / 2;
                this.xSpeed = -this.xSpeed;
            }
            if (this.x < 0) {
                this.xSpeed = -this.xSpeed;
            }
            if (this.y > cvs.height - this.r / 2) {
                this.y = cvs.height - this.r / 2;
                this.ySpeed = -this.ySpeed;
            }
            if (this.y < 0) {
                this.ySpeed = -this.ySpeed;
            }
        }
        this.lastDrawTime = Date.now();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
}


class Graph {
    constructor() {
        let pointNumber = Math.floor(cvs.width * cvs.height / (maxDistance * 40));
        // let pointNumber = 100;
        console.log(cvs.width * cvs.height);
        console.log(pointNumber);
        this.points = new Array(pointNumber).fill(0).map(() => {
            return new Point();
        });
    }

    draw() {
        requestAnimationFrame(() => {
            this.draw();
        });
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i];
            p.draw();
            for (let j = i + 1; j < this.points.length; j++) {
                const p2 = this.points[j];
                const distance = Math.sqrt((p2.x - p.x) ** 2 + (p2.y - p.y) ** 2);
                const transparent = 1 - distance / maxDistance;
                ctx.strokeStyle = `rgba(1, 255, 255, ${transparent}`;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
}

new Graph().draw();