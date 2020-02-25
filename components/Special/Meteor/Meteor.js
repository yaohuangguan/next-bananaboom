import React, { useEffect } from "react";
import { randomColor, randomIntFromRange, distance } from '../../../utils/Utils'

const Canvas = () => {
  let step = null;

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    canvas.style.zIndex = 0;
    const c = canvas.getContext("2d");
    const w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    const h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    canvas.width = w;
    canvas.height = h;

    // Implementation
    const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
    backgroundGradient.addColorStop(0, "#171e26");
    backgroundGradient.addColorStop(1, "#3f586b");
    let starList = [];
    let miniStarList = [];
    let backgroundStarList = [];
    let meteorList = [];
    let timer = 0;
    let respawnRate = 75;
    let groundHeight = 100;
    window.addEventListener("resize", () => {
      const w = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      const h = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
      canvas.width = w;
      canvas.height = h;

      init();
    });

    // Objects

    function createMountain(mountainAmount, height, color) {
      for (let i = 0; i < mountainAmount; i++) {
        const mountainWidth = canvas.width / mountainAmount;
        c.beginPath();
        c.moveTo(i * mountainWidth, canvas.height);
        c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);
        c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
        c.lineTo(i * mountainWidth - 325, canvas.height);
        c.fillStyle = color;
        c.fill();
        c.closePath();
      }
    }

    function init() {
      backgroundStarList = [];
      starList = [];
      miniStarList = [];
      meteorList = [];
      for (let i = 0; i < 250; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 3;
        backgroundStarList.push(new Star(x, y, radius, "white"));
      }
    }

    function animate() {
      step = requestAnimationFrame(animate);
      c.fillStyle = backgroundGradient;
      c.fillRect(0, 0, canvas.width, canvas.height);
      meteorList.forEach(meteor => {
        meteor.update();
      });

      backgroundStarList.forEach(backgroundStar => {
        backgroundStar.draw();
      });

      createMountain(1, canvas.height - 300, "#384551");
      createMountain(2, canvas.height - 400, "#2b3843");
      createMountain(3, canvas.height - 490, "#26333e");
      c.fillStyle = "#182028";
      c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
      starList.forEach((star, index) => {
        star.update();
        if (star.radius <= 0) {
          starList.splice(index, 1);
        }
      });
      miniStarList.forEach((mini, index) => {
        mini.update();
        if (mini.ttl === 0) {
          miniStarList.splice(index, 1);
        }
      });

      timer++;
      if (timer % respawnRate === 0) {
        const radius = 12;
        const x = Math.max(radius, Math.random() * canvas.width - radius);
        starList.push(new Star(x, -100, radius, "#e3eaef"));
        respawnRate = randomIntFromRange(75, 200);
        meteorList.push(
          new Meteor(Math.random() * canvas.width, 0, 5, "white")
        );
      }
    }
    class Star {
      constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
          x: (Math.random() - 0.5) * 8,
          y: 3
        };
        this.friction = 0.7;
        this.gravity = 1;
        this.miniStarRadius = 5;
      }
      shatter() {
        this.radius -= 3;
        this.miniStarRadius -= 1;
        for (let i = 0; i < 8; i++) {
          miniStarList.push(new Ministar(this.x, this.y, this.miniStarRadius));
        }
      }

      draw() {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.shadowColor = "#e3eaef";
        c.shadowBlur = 20;
        c.fill();
        c.closePath();
        c.restore();
      }

      update() {
        this.draw();
        if (
          this.y + this.radius + this.velocity.y >
          canvas.height - groundHeight
        ) {
          this.velocity.y = -this.velocity.y * this.friction;
          this.shatter();
        } else {
          this.velocity.y += this.gravity;
        }
        if (
          this.x + this.raduis + this.velocity.x > canvas.width ||
          this.x - this.radius - this.velocity.x < 0
        ) {
          this.velocity.x = -this.velocity.x * this.friction;
          this.shatter();
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
      }
    }

    //MINI STAR
    class Ministar extends Star {
      constructor(x, y, radius, color) {
        super(x, y, color);
        this.velocity = {
          x: randomIntFromRange(-5, 5),
          y: randomIntFromRange(-15, 15)
        };
        this.radius = radius;
        this.friction = 0.5;
        this.gravity = 0.5;
        this.ttl = 100;
        this.opacity = 1;
      }
      draw() {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = `rgba(227,234,239,${this.opacity})`;
        c.shadowColor = "#e3eaef";
        c.shadowBlur = 20;
        c.fill();
        c.closePath();
        c.restore();
      }

      update() {
        this.draw();
        if (
          this.y + this.radius + this.velocity.y >
          canvas.height - groundHeight
        ) {
          this.velocity.y = -this.velocity.y * this.friction;
        } else {
          this.velocity.y += this.gravity;
        }
        //movement
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.ttl -= 1;
        this.opacity -= 1 / this.ttl;
        this.radius -= 0.0;
      }
    }

    class Meteor {
      constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
          x: randomIntFromRange(-30, 30),
          y: 3
        };
        this.step = null;
      }
      draw() {
        c.save();
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(this.x, this.y);
        c.lineTo(this.x + 5, this.y);
        c.shadowColor = "yellow";
        c.shadowBlur = 30;
        c.stroke();
        c.closePath();
        c.restore();
      }
      update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
      }
    }
    init();
    animate();

    return () => {
      window.removeEventListener("resize", () => console.log("removed"));
      cancelAnimationFrame(step);
    };
  }, []);

  // Animation Loop

  return (
    <div>
      <canvas></canvas>
    </div>
  );
};

export default Canvas;
