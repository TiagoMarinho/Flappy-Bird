class DoublePipe {
	constructor (center, gap) {
		const x = center.x,
			upperY = center.y - gap / 2 - 1000, // 1000 is the pipe height, this needs polishing
			bottomY = center.y + gap / 2
		this.upperPipe = new Pipe(new Point(x, upperY))
		this.upperPipe.physicsBody.static = true
		this.bottomPipe = new Pipe(new Point(x, bottomY))
		this.bottomPipe.physicsBody.static = true
	}
}