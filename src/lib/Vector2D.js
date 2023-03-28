class Vector2D {
    constructor(x, y) {
      this.x = x || 0;
      this.y = y || 0;
    }
  
    add(other) {
      return new Vector2D(this.x + other.x, this.y + other.y);
    }
  
    subtract(other) {
      return new Vector2D(this.x - other.x, this.y - other.y);
    }
  
    multiply(scalar) {
      return new Vector2D(this.x * scalar, this.y * scalar);
    }
  
    divide(scalar) {
      return new Vector2D(this.x / scalar, this.y / scalar);
    }
  
    magnitude() {
      return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
  
    normalize() {
      const mag = this.magnitude();
      return new Vector2D(this.x / mag, this.y / mag);
    }
  
    dot(other) {
      return this.x * other.x + this.y * other.y;
    }
  
    cross(other) {
      return this.x * other.y - this.y * other.x;
    }
  
    toString() {
      return `(${this.x}, ${this.y})`;
    }
  }

  export default Vector2D;