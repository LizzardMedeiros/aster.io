Math.degrees = function(radians) {
  return radians / Math.PI * 180;
};

const mixColor = (c1, c2, delta) => {
	c2 = c2.split(";");
	delta = Math.min(Math.abs(delta), 1);
	c1.split(";").forEach((rgb, i) => {
		c2[i] = Math.round(Math.min(((1-delta) * c2[i]) + (rgb * delta)), 255);
	});
	return c2[0]+";"+c2[1]+";"+c2[2];
};

const getWidth = () => (
  Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  )
);

const getHeight = () => (
  Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  )
);
