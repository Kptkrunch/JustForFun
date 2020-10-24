const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = "transparent";

const mouse = {
    x: undefined,
    y: undefined,
}

window.addEventListener('mousemove', (event) => {

    mouse.x = event.clientX;
    mouse.y = event.clientY;
    // console.log(mouse.x, mouse.y);
})

class ContainerL {

    constructor(x, y, width, height, baseX) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.baseX = x;
        this.flowingLeft = false;
    }

    update() {
        // used to act as a tick function
    }

    draw() {
        ctx.fillStyle = 'grey';
        // ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.closePath();
    }
}

// Make the containers and populate the arrays
const containersL = [];
const createContainersL = () => {
    
    for (let i = 0; i < 3; i++) {

        let sideMargin = 158;
        let containerMargin = canvas.width * .20;
        let y = 150;
        let x = sideMargin + ((100 + containerMargin) * i);
        let height = 300;
        let width = canvas.width * .20;
        containersL.push(new ContainerL(x, y, width, height));

    }
}

createContainersL();

const drawContainersL = () => {

    for (let i = 0; i < containersL.length; i++) {

        containersL[i].update();
        containersL[i].draw();
    }
}

// handle waterfall particles
class ParticleL {

    constructor(x, y, size, weight, dir) {

        this.x = x;
        this.y = y;
        this.size = size;
        this.weight = weight; 
        this.flowingLeft = dir;
        this.colors = ['rgb(153, 204, 255, 1)', 'rgb(0, 51, 204, 1)', 'rgb(0, 255, 255, 1)']
        this.color = 'rgba(128, 197, 222, 1)';
    }

    waterLeft() {
        for (let i = 0; i < containersL.length; i++) {

            if (this.x < containersL[i].x + containersL[i].width &&
                this.x > containersL[i].x &&
                this.y < containersL[i].y + containersL[i].height &&
                this.y > containersL[i].y) {

                this.weight = 0;
                
                if (!this.flowingLeft) {
                    this.x -= 4;
                } else {
                    this.x += 4;
                }
                
            } else {
                this.weight += 0.03;
            }
        }

    }

    update() {

        // check for collisionwith mouse
        if (this.x > mouse.x - 50 &&
            this.x < mouse.x + 50 &&
            this.y > mouse.y - 5 &&
            this.y < mouse.y + 5) {

                this.x -= this.weight;
                this.y += this.weight;
                this.flowingLeft = true;
                this.color = this.colors[Math.round(Math.random() * this.colors.length)];
                setTimeout(() =>{
                    this.color = 'rgba(128, 197, 222, 1)';
                }, 2000)
        }

        this.waterLeft();

        if (this.y > canvas.height) {

            this.y = 0 - this.size;
            this.x = (Math.random() * canvas.width);
            this.weight = (Math.random() * 0.5) + 1.15;
            this.flowingLeft = !this.flowingLeft;
        }
        this.y += this.weight;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
}

const particleArrayL = [];
const numberOfParticles = 300;

const flowDirection = () => {
    let direction = [true, false];
    let index = Math.round(Math.random());
    return direction[index];
}

const createParticlesL = () => {

    for (let i = 0; i < numberOfParticles; i++) {
        const direction = flowDirection();
        const x = (Math.random() * canvas.width);
        const y = (Math.random() * canvas.height);
        const size = (Math.random() * 20) + 5;
        const weight = (Math.random() * 0.3) + 1.15;
        particleArrayL.push(new ParticleL(x, y, size, weight, direction));
    }
}

createParticlesL();

// animate canvas
const animate = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArrayL.length; i++) {

        particleArrayL[i].update();
        particleArrayL[i].draw();
    }

    drawContainersL();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', (event) => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})