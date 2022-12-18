import Game from '@game';
import { PositionComponent, SpeedComponent } from '@game/models/component';
import { Entity } from '@game/models/entity';

export default class TrackSystem {
  private _targetEntity: Entity;
  private _positionComponents: PositionComponent[];
  private _speedComponents: SpeedComponent[];

  constructor(
    targetEntity: Entity,
    positionComponents: PositionComponent[],
    speedComponents: SpeedComponent[]
  ) {
    this._targetEntity = targetEntity;
    this._positionComponents = positionComponents;
    this._speedComponents = speedComponents;
  }

  update() {
    const targetPosition = this._positionComponents[this._targetEntity];

    for (let entity = 0 as Entity; entity < Game.MAX_ENTITY_COUNT; entity++) {
      if (!this._checkInUse(entity)) continue;

      const speed = this._speedComponents[entity].speed;
      const position = this._positionComponents[entity];

      const vectorX = targetPosition.x - position.x;
      const vectorY = targetPosition.y - position.y;
      const totalScala = Math.abs(vectorX) + Math.abs(vectorY);
      const isZeroTotalScala = totalScala < 0.1;

      this._positionComponents[entity].x += isZeroTotalScala
        ? 0
        : (speed * vectorX) / totalScala;
      this._positionComponents[entity].y += isZeroTotalScala
        ? 0
        : (speed * vectorY) / totalScala;
    }
  }

  /** TODO: tracker만을 가려낼 수 있는 best practice? */
  private _checkInUse(entity: Entity) {
    return (
      this._positionComponents[entity].inUse &&
      this._speedComponents[entity].inUse
    );
  }
}

