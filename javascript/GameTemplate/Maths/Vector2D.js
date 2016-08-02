class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    AddVector(vector2) {
        return new Vector2D(this.x+vector2.x, this.y+vector2.y);
    }

    Multiply(scalar) {
        return new Vector2D(this.x*scalar, this.y*scalar);
    }

    SubtractVector(vector2) {
        return new Vector2D(this.x-vector2.x, this.y-vector2.y);
    }

    Length() {
        return Math.hypot(this.x, this.y);
    }

    Normalize() {
    	var length = this.Length();
        return new Vector2D(this.x/length, this.y/length);
    }

    DotProduct(vector2) {
    	return this.x*vector2.x + this.y*vector2.y;
    }

}
