class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft = { x: this.left, y: this.top };
        const topRight = { x: this.right, y: this.top };
        const bottomLeft = { x: this.left, y: this.bottom };
        const bottomRight = { x: this.right, y: this.bottom };
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }

    getLaneCenter(laneIndex) {
        const laneWidth = this.width / this.laneCount;
        return this.left + laneWidth / 2 +
            Math.min(laneIndex, this.laneCount - 1) * laneWidth;
    }

    draw(ctx) {
        // Draw road background with gradient
        const gradient = ctx.createLinearGradient(0, this.top, 0, this.bottom);
        gradient.addColorStop(0, "#4b4b4b"); // dark gray asphalt
        gradient.addColorStop(0.5, "#5c5c5c");
        gradient.addColorStop(1, "#4b4b4b");
        ctx.fillStyle = gradient;
        ctx.fillRect(this.left, this.top, this.width, this.bottom - this.top);

        // Draw lane lines
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        ctx.setLineDash([20, 20]);
        for (let i = 1; i <= this.laneCount - 1; i++) {
            const x = this.left + i * (this.width / this.laneCount);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
        ctx.setLineDash([]);

        // Draw road borders
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#ffffff";
        this.borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
    }
}
