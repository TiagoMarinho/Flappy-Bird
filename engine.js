class Engine {
	constructor (canvas) {
		this.scene = new Scene(canvas)
		this.hero = null
		this.gameplayVariables = {
			heroJumpForce: -15,
			pipeGap: 300
		}
	}
	run () {
		this.hero = new Flappy(new Point(100, 100))
		this.scene.addChild(this.hero)

		this.listenToPlayerInput()
		this.update()
		setInterval(_ => {
			this.addPipe()
		}, 1000)
	}
	addPipe () {
		const y = Utils.getRandomInt(0, innerHeight)
		const doublePipe = new DoublePipe(new Point(innerWidth, y), this.gameplayVariables.pipeGap)
		doublePipe.upperPipe.physicsBody.velocity.dx = -5
		doublePipe.bottomPipe.physicsBody.velocity.dx = -5
		this.scene.addChild(doublePipe.upperPipe)
		this.scene.addChild(doublePipe.bottomPipe)
		this.gameplayVariables.pipeGap -= 10
		this.gameplayVariables.pipeGap = Math.max(this.gameplayVariables.pipeGap, 150)
	}
	listenToPlayerInput () {
		window.addEventListener("keydown", _ => {
			this.hero.physicsBody.velocity.dy = this.gameplayVariables.heroJumpForce
		})
	}
	update () {
		this.scene.update()
		document.getElementById("score").innerHTML = this.scene.physicsWorld.points

		requestAnimationFrame(_ => {
			this.update()
		})
	}
}