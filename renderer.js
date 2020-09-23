class Renderer {
	constructor (context) {
		this.context = context
		this.graphics = []
	}
	drawRect (color, position, size) {
		this.context.beginPath()
		this.context.fillStyle = color
		//this.context.lineWidth = 1
		this.context.fillRect(Math.floor(position.x) + .5, Math.floor(position.y) + .5, Math.floor(size.width), Math.floor(size.height))
		this.context.fill()
	}
	collectGarbage () {
		let index = 0
		for (const graphic of this.garbage) {
			this.graphics.splice(graphic.id - index, 1)
			++index
		}
		this.garbage.length = 0
	}
	render () {
		for (const graphic of this.graphics) {
			if (!graphic.active) break;
			if (graphic.shape instanceof Rect) {
				this.drawRect(graphic.color, graphic.position, graphic.shape.size)
			}
		}

		return this
	}
	clear (position, size) {
		this.context.clearRect(position.x, position.y, size.width, size.height)
		return this
	}
}