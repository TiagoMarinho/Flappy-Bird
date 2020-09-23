class Flappy extends Entity {
	constructor (position) {
		const shape = new Rect(new Size(30, 30)),
			physicsBody = new PhysicsBody(position, new Vector(0, 0), shape),
			graphics = new Graphics("#ca0", position, shape)

		super(graphics, physicsBody)
	}

}