import type { Request } from '../request/Request.types';

import { Crud } from './Crud';
import { DefaultMapperImpl } from './Mapper';

class CrudWithoutMapper<Entity, NewEntity> extends Crud<Entity, NewEntity> {
  constructor(prefix: string, request: Request) {
    super(prefix, new DefaultMapperImpl<Entity>(), request);
  }
}

export { CrudWithoutMapper };
