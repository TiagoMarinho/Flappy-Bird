class PhysicsWorld {
	constructor () {
		this.gravity = new Vector(0, 1)
		this.staticBodies = []
		this.dynamicBodies = []
		this.points = 0
	}
	get bodies () {
		return [...this.staticBodies, ...this.dynamicBodies]
	}
	addChild (body) {
		if (body.static)
			this.staticBodies.push(body)
		else
			this.dynamicBodies.push(body)
	}
	eulerIntegrator () { // maybe verlet integrator would fit better?
		for (const body of this.bodies) {
			body.pastPosition.x = body.position.x
			body.pastPosition.y = body.position.y

			body.position.x += body.velocity.dx
			body.position.y += body.velocity.dy
		}
	}
	applyGravity () {
		for (const body of this.dynamicBodies) {
			body.velocity.dx += this.gravity.dx
			body.velocity.dy += this.gravity.dy
		}
	}
	preventFromFallingThroughGround () {
		for (const body of this.dynamicBodies) {
			if (body.position.y + body.shape.size.height > innerHeight) {
				body.velocity.dy = 0
				body.position.y = innerHeight - body.shape.size.height
			}
			if (body.position.y < 0) {
				body.velocity.dy = 0
				body.position.y = 0
			}
		}
	}
	collisionDetection () {
		for (const staticBody of this.staticBodies) {
			const staticAABB = new AABB(staticBody.position, staticBody.shape.size)
			for (const dynamicBody of this.dynamicBodies) {
				const dynamicAABB = new AABB(dynamicBody.position, dynamicBody.shape.size)

				if (dynamicAABB.bottom > staticAABB.top &&
					dynamicAABB.right > staticAABB.left &&
					dynamicAABB.left < staticAABB.right &&
					dynamicAABB.top < staticAABB.bottom) {
					alert("GAME OVER")
					throw new Error()
				}
			}
		}
	}
	trackScore () {
		this.points = 0
		for (const staticBody of this.staticBodies) {
			const staticAABB = new AABB(staticBody.position, staticBody.shape.size)
			for (const dynamicBody of this.dynamicBodies) {
				const dynamicAABB = new AABB(dynamicBody.position, dynamicBody.shape.size)

				if (dynamicAABB.left > staticAABB.right) {
					this.points += .5
				}
			}
		}
	}
	step () {
		this.eulerIntegrator()

		this.applyGravity()
		this.preventFromFallingThroughGround()
		this.collisionDetection()
		this.trackScore()
	}
}