import type {
  Category,
  NewCategory,
} from '../../domain/Category/Category.entity';
import { CrudWithoutMapper } from '../crud/CrudWithoutMapper';
import type { Request } from '../request/Request.types';

class CategoryService extends CrudWithoutMapper<Category, NewCategory> {
  constructor(request: Request) {
    super('categories/', request);
  }
}

export default CategoryService;
