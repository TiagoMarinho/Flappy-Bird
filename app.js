class App {
	constructor (canvas) {
		this.canvas = canvas
		this.engine = new Engine(canvas)
	}
	run () {
		this.canvasScaleHooker(this.canvas)
		this.engine.run()
	}
	canvasScaleHooker (canvas) {
		const hook = _ => {
			canvas.width = innerWidth
			canvas.height = innerHeight
		}
		window.addEventListener("resize", hook)
		hook()
	}
}