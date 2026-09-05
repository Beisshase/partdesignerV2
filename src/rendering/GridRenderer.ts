class GridRenderer implements Renderer {
	private shader: Shader;
	private positions: WebGLBuffer;
	private lineCount: number;

	private extent: number;
	private spacing: number;

	public transform: Matrix4 = Matrix4.getIdentity();
	public enabled: boolean = true;
	public color: Vector3 = new Vector3(0.6, 0.6, 0.6);
	public alpha: number = 0.35;

	constructor(extent: number = 20, spacing: number = 1) {
		this.extent = extent;
		this.spacing = spacing;

		this.shader = new Shader(SIMPLE_VERTEX_SHADER, COLOR_FRAGMENT_SHADER);

		this.shader.setAttribute("vertexPosition");
		this.shader.setUniform("projectionMatrix");
		this.shader.setUniform("modelViewMatrix");
		this.shader.setUniform("color");
		this.shader.setUniform("scale");

		this.positions = gl.createBuffer();
		this.setPlane(Orientation.Y);
	}

	/* The grid lies in the plane perpendicular to the given orientation axis - e.g.
	Orientation.Y draws the grid across the X/Z plane. */
	public setPlane(orientation: Orientation) {
		var axis1: Vector3, axis2: Vector3;
		switch (orientation) {
			case Orientation.X:
				axis1 = new Vector3(0, 1, 0);
				axis2 = new Vector3(0, 0, 1);
				break;
			case Orientation.Y:
				axis1 = new Vector3(1, 0, 0);
				axis2 = new Vector3(0, 0, 1);
				break;
			case Orientation.Z:
				axis1 = new Vector3(1, 0, 0);
				axis2 = new Vector3(0, 1, 0);
				break;
		}

		var lines: number[] = [];
		var steps = Math.round(this.extent / this.spacing);
		for (var i = -steps; i <= steps; i++) {
			var p = i * this.spacing;
			var a = axis1.times(-this.extent).plus(axis2.times(p));
			var b = axis1.times(this.extent).plus(axis2.times(p));
			lines.push(a.x, a.y, a.z, b.x, b.y, b.z);

			var c = axis1.times(p).plus(axis2.times(-this.extent));
			var d = axis1.times(p).plus(axis2.times(this.extent));
			lines.push(c.x, c.y, c.z, d.x, d.y, d.z);
		}

		this.lineCount = lines.length / 3;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positions);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lines), gl.STATIC_DRAW);
	}

	public render(camera: Camera) {
		if (!this.enabled) {
			return;
		}

		gl.bindBuffer(gl.ARRAY_BUFFER, this.positions);
		gl.vertexAttribPointer(this.shader.attributes["vertexPosition"], 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(this.shader.attributes["vertexPosition"]);

		gl.useProgram(this.shader.program);

		gl.uniformMatrix4fv(this.shader.attributes["projectionMatrix"], false, camera.getProjectionMatrix().elements);
		gl.uniformMatrix4fv(this.shader.attributes["modelViewMatrix"], false, this.transform.times(camera.transform).elements);
		gl.uniform3f(this.shader.attributes["scale"], 1, 1, 1);
		gl.uniform4f(this.shader.attributes["color"], this.color.x, this.color.y, this.color.z, this.alpha);

		gl.drawArrays(gl.LINES, 0, this.lineCount);
	}
}
