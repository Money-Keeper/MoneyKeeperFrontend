import type { Request } from '../request/Request.types';

import { Crud } from './Crud';
import { DefaultMapperImpl } from './Mapper';

class CrudWithoutMapper<Entity, NewEntity> extends Crud<Entity, NewEntity> {
  constructor(request: Request) {
    super(request, new DefaultMapperImpl<Entity>());
  }
}

export { CrudWithoutMapper };
