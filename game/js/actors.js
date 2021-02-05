const updateActor = (group, actor) => (sprite) => {
  if (!group.children || !actor) return;

  for (let i = group.children.size; i < actor.length; i += 1) {
    group.create(actor.x, actor.y, sprite);
  }

  for (let i = 0; i < group.children.size; i++) {
    if ( 
      typeof group.children.entries[i] === 'undefined' ||
      typeof actor[i] === 'undefined'
    ) {
      group.killAndHide(group.children.entries[i]);
      group.children.delete(group.children.entries[i]);
    } else {
      const { x, y, direction } = actor[i];
      group.children.entries[i].setPosition(x, y);
      group.children.entries[i].setAngle(direction);
    }
  }
};