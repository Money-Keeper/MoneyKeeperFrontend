import type {
  Category,
  NewCategory,
} from '../../domain/Category/Category.entity';
import { CrudWithoutMapper } from '../crud/CrudWithoutMapper';
import { RequestImpl } from '../request/Request.impl';

class CategoryService extends CrudWithoutMapper<Category, NewCategory> {
  constructor() {
    const request = new RequestImpl('categories/');

    super(request);
  }
}

export default CategoryService;
