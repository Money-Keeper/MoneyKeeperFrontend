import type { ServerError } from '../request/error';
import { getUnknownError } from '../request/error';
import type { Request } from '../request/Request.types';

import type { Mapper } from './Mapper';

class Crud<Entity, NewEntity, ServerEntity = Entity> {
  constructor(
    private readonly request: Request,
    private readonly mapper: Mapper<Entity, ServerEntity>
  ) {}

  async get(): Promise<[Entity[] | null, ServerError | null]> {
    const [data, error] = await this.request.get<ServerEntity[]>();

    if (error) {
      return [null, error];
    }

    if (!data) {
      return [[], null];
    }

    return [data.map(this.mapper.serverToEntity), null];
  }

  async post(category: NewEntity): Promise<ServerError | null> {
    const [, error] = await this.request.post<null, NewEntity>({
      body: category,
    });

    return error;
  }

  async put(id: string, category: Entity): Promise<ServerError | null> {
    const [, error] = await this.request.put<null, Entity>({
      url: id,
      body: category,
    });

    return error;
  }

  async getOne(id: string): Promise<[Entity | null, ServerError | null]> {
    const [data, error] = await this.request.get<ServerEntity>({ url: id });

    if (error || !data) {
      return [null, error || getUnknownError()];
    }

    return [this.mapper.serverToEntity(data), null];
  }

  async remove(id: string): Promise<ServerError | null> {
    const [, error] = await this.request.remove<null>({
      url: id,
    });

    return error;
  }
}

export { Crud };
