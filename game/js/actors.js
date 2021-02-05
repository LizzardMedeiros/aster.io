const updateActor = (gameBuffer) => (sprite) => {
  const actorName = `${sprite.split('_')[1]}`;

  const group = gameBuffer[`${actorName}Group`];
  const actor = gameBuffer.actors[`${actorName}s`];

  if (!group.children || !actor) return;

  for (let i = group.children.size; i < actor.length; i += 1) {
    const g = group.create(actor.x, actor.y, sprite);
    g.collideGroup = actor[i].collideGroup;
    g.groupName = actor[i].groupName;
    g.id = Math.round(Math.random() * 1E12);
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

  // Global Collision
  Object
    .keys(gameBuffer)
    .filter(key => key.includes('Group'))
    .forEach(key => {
      const groupA = gameBuffer[key];
      groupA.children.each(child => {
        const childBounds = child.getBounds();
        group.children.each(self => {
          const selfBounds = self.getBounds();
          if (
            Phaser.Geom.Rectangle.Overlaps(selfBounds, childBounds) &&
            child.id !== self.id &&
            ((child.groupName !== self.groupName) || (child.collideGroup && self.collideGroup))
          ) {
            socket.emit('check_missile_collision');
          }
        });
      });
    });
};