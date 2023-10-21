const cvs = document.getElementById('container');
const ctx = cvs.getContext('2d');

function init() {
    cvs.width = window.innerWidth * devicePixelRatio;
    cvs.height = window.innerHeight * devicePixelRatio;
}

init();

const fontSize = 20 * devicePixelRatio;

ctx.textBaseline = 'top';
ctx.fillStyle = '#333';
ctx.font = '${fontSize}px sans-serif';
const columnCount = Math.floor(cvs.width / fontSize);
const charIndex = new Array(columnCount).fill(0);
ctx.fillText('hello world!', 300, 300);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = '#6BE445';
    for (let i = 0; i < columnCount; i++) {
        const y = charIndex[i] * fontSize;
        ctx.fillText(getRandomChar(), i * fontSize, y);
        if (y > cvs.height && Math.random() > 0.9) {
            charIndex[i] = 0;
        } else {
            charIndex[i]++;
        }
    }
}

function getRandomChar() {
    const str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return str[Math.floor(Math.random() * str.length)];
}

window.setInterval(draw, 50)