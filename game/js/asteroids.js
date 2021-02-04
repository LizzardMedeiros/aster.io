const updateAsteroids = ({ asteroids }) => {
  console.log(asteroids);
  for (let i = asteroids.children.size; i < asteroids.queue.length; i += 1) {
    asteroids.create(asteroids.queue.x, asteroids.queue.y, 'spr_asteroid');
  }
};