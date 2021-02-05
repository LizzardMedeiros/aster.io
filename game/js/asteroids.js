const updateAsteroids = (group) => (queue) => {

  if (!group.children || !queue) return;
  for (let i = group.children.size; i < queue.length; i += 1) {
    group.create(queue.x, queue.y, 'spr_asteroid');
  }
  
  for (let i = 0; i < group.children.size; i++) {
    if ( 
      typeof group.children.entries[i] === 'undefined' ||
      typeof queue[i] === 'undefined'
    ) {
      group.children.delete(group.children.entries[i]);
    } else {
      const { x, y, direction } = queue[i];
      group.children.entries[i].setPosition(x, y);
      group.children.entries[i].setAngle(direction);
    }
  }
};