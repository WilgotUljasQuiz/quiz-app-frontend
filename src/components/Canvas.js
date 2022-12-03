import React, { useEffect, useLayoutEffect, useRef } from "react";

const Canvas = props => {
    const canvasRef = useRef(null);

    
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        
        let particles = [];

        class Particle{
            constructor(x, y, color){
                this.x = x;
                this.y = y;
                this.radius = Math.random() * 10 + 6;
                this.xVelocity = Math.random() * 3 - 1.5;
                this.yVelocity = Math.random() * 3 - 1.5;
                this.color = color;
                this.shrinkRate = 0.1;
            }
            draw(){
                context.canvas.fillStyle = this.color;
                context.canvas.beginPath();
                context.canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.canvas.fill();
            }
            update(){
                this.x += this.xVelocity;
                this.y += this.yVelocity;
                if(this.radius > 0.2){
                    this.radius -= this.shrinkRate;
                }
            }
        }


        function update(){
            canvas.width = window.innerWidth-50;
            canvas.height = window.innerHeight;
            console.log("hehe")
            refrech();
            particles.forEach(particle => {
                console.log("hehe")
                particle.draw();
                particle.update();
            });
            
            particles.push(new Particle(500, 500, "rgb(142,170,255)"))

            requestAnimationFrame(update);
        }
        update();

        function refrech(){
            context.fillStyle = '#EDF4FF'
            context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        }
    }, [])
    

    return <canvas ref={canvasRef} {...props} />

}
export default Canvas