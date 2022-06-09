import { createCanvas, loadImage } from 'canvas';

export default class CanvasManager {

    constructor(x, y, createTumbnails = true, scale = 2) {
        this.c1 = new CanvasObject(x, y);
        if (createTumbnails)
            this.c2 = new CanvasObject(Math.floor(x / scale), Math.floor(y / scale))
    }

    async saveImage(path, tumbnailsPath) {
        await fs.writeFile(path, canvas.toBuffer('image/png'));
        console.log(`Created image ${path}`);
        if (this.c2) {
            await fs.writeFile(tumbnailsPath, canvas.toBuffer('image/png'));
            console.log(`Created tumbnail ${tumbnailsPath}`);
        }
    }

    async drawImageFromLayers(layers) {
        this.clearCanvas();
        layers.forEach(l => {
            await this.drawLayer(l);
        });
    }
    
    async drawLayer(path) {
        var img = await loadImage(path);
        this.c1.ctx.drawImage(img, 0, 0, this.c1.size.x, this.c1.size.y);
        if (this.c2) {
            this.c2.ctx.drawImage(img, 0, 0, this.c2.size.x, this.c2.size.y);
        }
    }

    clearCanvas() {
        this.c1.ctx.clearRect(0, 0, this.c1.size.x, this.c1.size.y);
        if (this.c2) this.c2.ctx.clearRect(0, 0, this.c2.size.x, this.c2.size.y);
    }

};


class CanvasObject {
    constructor(x, y, space = '2d') {
        this.size = { x, y };
        this.canvas = createCanvas(x, y);
        this.ctx = this.canvas.getContext(space);
    }
}