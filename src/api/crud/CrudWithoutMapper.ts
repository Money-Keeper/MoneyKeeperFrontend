import { Crud } from './Crud';
import { DefaultMapperImpl } from './Mapper';

class CrudWithoutMapper<Entity, NewEntity> extends Crud<Entity, NewEntity> {
  constructor(prefix: string) {
    super(prefix, new DefaultMapperImpl<Entity>());
  }
}

export { CrudWithoutMapper };
