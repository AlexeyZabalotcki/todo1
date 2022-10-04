import {Observable, of} from "rxjs";
import {Category} from "src/app/model/Category";
import {CategoryDAO} from "../interface/CategoryDAO";
import {TestData} from "../../TestData";

export class CategoryDAOImpl implements CategoryDAO {

  search(title: string): Observable<Category[]> {
    throw new Error("Method not implemented.");
  }

  add(t: Category): Observable<Category> {
    throw new Error("Method not implemented.");
  }

  get(id: number): Observable<Category> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Observable<Category> {
    throw new Error("Method not implemented.");
  }

  update(t: Category): Observable<Category> {
    throw new Error("Method not implemented.");
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

}
