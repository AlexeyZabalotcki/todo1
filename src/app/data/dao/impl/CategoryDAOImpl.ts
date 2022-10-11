import {Observable, of} from "rxjs";
import {Category} from "src/app/model/Category";
import {CategoryDAO} from "../interface/CategoryDAO";
import {TestData} from "../../TestData";

export class CategoryDAOImpl implements CategoryDAO {

  search(title: string): Observable<Category[]> {
    throw new Error("Method not implemented.");
  }

  add(category: Category): Observable<Category> {
    if (category.id === null || category.id === 0) {
      category.id = this.getLastIdCategory();
    }

    TestData.categories.push(category);

    return of(category);
  }

  get(id: number): Observable<Category> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Observable<Category> {
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        // @ts-ignore
        task.category = null;
      }
    });

    const tmpCategory = TestData.categories.find(t => t.id === id);
    TestData.categories.splice(TestData.categories.indexOf(<Category>tmpCategory), 1);

    // @ts-ignore
    return of(tmpCategory);
  }

  update(category: Category): Observable<Category> {
    const tmpCategory = TestData.categories.find(t => t.id === category.id);
    TestData.categories.splice(TestData.categories.indexOf(<Category>tmpCategory), 1, category);

    return of(category)
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  private getLastIdCategory() {
    return Math.max.apply(Math, TestData.categories.map(c => c.id)) + 1;
  }
}
