class Particle {
    constructor(x, y, vx, vy) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
    }
  
    update() {
      // Update the particle's position based on its velocity
      this.x += this.vx;
      this.y += this.vy;
    }
  
    draw(ctx) {
      // Draw the particle on the given canvas context
      ctx.beginPath();
      ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
      ctx.fill();
    }
}

class MyComponent extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        particles: [
          new Particle(100, 100, 1, 1),
          new Particle(200, 200, -1, -1),
        ],
      };
    }
  
    componentDidMount() {
      this.intervalId = setInterval(this.update, 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this.intervalId);
    }
  
    update = () => {
      const { particles } = this.state;
  
      // Update the position of each particle
      particles.forEach(particle => particle.update());
  
      // Re-render the canvas with the updated particle positions
      this.draw();
    }
  
    draw = () => {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext("2d");
  
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw each particle
      this.state.particles.forEach(particle => particle.draw(ctx));
    }
  
    render() {
      return <canvas ref={this.canvasRef} />;
    }
  }