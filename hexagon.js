function ShapeHexagon(shape_size, shard_amt){
	this.vertPath = '0 '+(2*shape_size)+' '+(shape_size)+' '+(2*shape_size)+' '+(1.666*shape_size)+' '+(shape_size)+' '+(shape_size)+' 0 0 0 '+(shape_size*-0.666)+' '+(shape_size)+' 0 '+(shape_size*2);
	this.body = Matter.Bodies.fromVertices(25, 25, Matter.Vertices.fromPath(this.vertPath), {
					isStatic: false,
					density: 0.04,
					friction: 0.1,
					frictionAir: 0.00001,
					restitution: 0.2,
					inertia: Infinity,
					shsz: shape_size,
					shrdamt: shard_amt,
					render: {
						visible: true,
						fillStyle: 'black',
						strokeStyle: 'white',
						lineWidth: 1
					}
				}, true);
}