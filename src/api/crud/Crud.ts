import { getUnknownError } from '../request/error';
import type { Request } from '../request/Request.types';
import type { ResponseData } from '../types';

import type { Mapper } from './Mapper';

class Crud<Entity, NewEntity, ServerEntity = Entity> {
  constructor(
    private readonly request: Request,
    private readonly mapper: Mapper<Entity, ServerEntity>
  ) {}

  async get(): Promise<ResponseData<Entity[]>> {
    const [data, error] = await this.request.get<ServerEntity[]>();

    if (error) {
      return { data: null, error };
    }

    if (!data) {
      return { data: [], error: null };
    }

    return { data: data.map(this.mapper.serverToEntity), error: null };
  }

  async post(category: NewEntity): Promise<ResponseData> {
    const [data, error] = await this.request.post<null, NewEntity>({
      body: category,
    });

    return { error, data };
  }

  async put(id: string, category: Entity): Promise<ResponseData> {
    const [data, error] = await this.request.put<null, Entity>({
      url: id,
      body: category,
    });

    return { error, data };
  }

  async getOne(id: string): Promise<ResponseData<Entity>> {
    const [data, error] = await this.request.get<ServerEntity>({ url: id });

    if (error || !data) {
      return { data: null, error: error || getUnknownError() };
    }

    return { data: this.mapper.serverToEntity(data), error: null };
  }

  async remove(id: string): Promise<ResponseData> {
    const [data, error] = await this.request.remove<null>({
      url: id,
    });

    return { error, data };
  }
}

export { Crud };
