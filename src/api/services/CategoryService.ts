import type {
  Category,
  NewCategory,
} from '../../domain/Category/Category.entity';
import { CrudWithoutMapper } from '../crud/CrudWithoutMapper';

class CategoryService extends CrudWithoutMapper<Category, NewCategory> {
  constructor() {
    super('categories/');
  }
}

export default CategoryService;
