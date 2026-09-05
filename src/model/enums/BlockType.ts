enum BlockType {
	Solid,
	PinHole,
	AxleHole,
	Pin,
	Axle,
	BallJoint,
	BallSocket,
	Hole,
	Wedge
}

const BLOCK_TYPE = {
	"solid": BlockType.Solid,
	"pinhole": BlockType.PinHole,
	"axlehole": BlockType.AxleHole,
	"pin": BlockType.Pin,
	"axle": BlockType.Axle,
	"balljoint": BlockType.BallJoint,
	"ballsocket": BlockType.BallSocket,
	"hole": BlockType.Hole,
	"wedge": BlockType.Wedge
}