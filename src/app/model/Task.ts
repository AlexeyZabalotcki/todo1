import {Category} from "./Category";
import {Priority} from "./Priority";

export class Task {
  id: number;
  title: string;
  completed: number;
  priority?: Priority;
  category?: Category;
  date?: Date;

  oldCategory: Category;


  constructor(id: number, title: string, completed: number, priority: Priority, category: Category, date?: Date, oldCategory?: Category) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.priority = priority;
    this.category = category;
    this.date = date;
    this.oldCategory = oldCategory;
  }
}
