class AABB {
	constructor (position, size) {
		this.position = position
		this.size = size
	}
	get top () {
		return this.position.y
	}
	get left () {
		return this.position.x
	}
	get right () {
		return this.position.x + this.size.width
	}
	get bottom () {
		return this.position.y + this.size.height
	}
}