class Pipe extends Entity {
	constructor (position) {
		const shape = new Rect(new Size(50, 1000)),
			physicsBody = new PhysicsBody(position, new Vector(0, 0), shape),
			graphics = new Graphics("#080", position, shape)

		super(graphics, physicsBody)
	}
}