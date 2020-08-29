const checkCollision = (obj1, obj2, radius) => {
  if(!obj1 || !obj2) return;
  const {x: x1, y: y1, w: w1, h: h1} = obj1;
  const {x: x2, y: y2, w: w2, h: h2} = obj2;

	const xx = obj1.hasOwnProperty('w') ? x1 + (w1 / 2) : x1;
	const yy = obj1.hasOwnProperty('h') ? y1 + (h1 / 2) : y1;
	const xx2 = obj2.hasOwnProperty('w') ? x2 + (w2/ 2) : x2;
  const yy2 = obj2.hasOwnProperty('h') ? y2 + (h2 / 2) : y2;

	return Math.sqrt(Math.pow(xx - xx2, 2) + Math.pow(yy - yy2, 2)) <= radius;
}

module.exports = {
  checkCollision
}