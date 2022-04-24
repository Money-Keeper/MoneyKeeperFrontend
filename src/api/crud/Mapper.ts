export interface Mapper<Entity, ServerEntity> {
  serverToEntity(serverEntity: ServerEntity): Entity;
}

export class DefaultMapperImpl<Entity> implements Mapper<Entity, Entity> {
  serverToEntity(serverEntity: Entity): Entity {
    return serverEntity;
  }
}
