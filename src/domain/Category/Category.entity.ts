export interface NewCategory {
  name: string;
  parentCategory: string;
}

export interface Category extends NewCategory {
  id: string;
}
