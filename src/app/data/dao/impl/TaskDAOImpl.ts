import {Observable, of} from "rxjs";
import {Category} from "src/app/model/Category";
import {Priority} from "src/app/model/Priority";
import {Task} from "src/app/model/Task";
import {TaskDAO} from "../interface/TaskDAO";
import {TestData} from "../../TestData";


export class TaskDAOImpl implements TaskDAO {

  getAll(): Observable<Task[]> {
    return of(TestData.tasks)
  }

  get(id: number): Observable<Task> {
    // @ts-ignore
    return of(TestData.tasks.find(todo => todo.id === id));
  }

  search(category: Category, searchText?: string, status?: boolean, priority?: Priority): Observable<Task[]> {
    return of(this.searchTodos(category, searchText, status, priority));
  }

  private searchTodos(category: Category, searchText?: string, status?: boolean, priority?: Priority) {
    let allTasks = TestData.tasks;

    if (category != null) {
      allTasks = allTasks.filter(todo => todo.category === category);
    }

    return allTasks;
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    throw new Error("Method not implemented.");
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    throw new Error("Method not implemented.");
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    throw new Error("Method not implemented.");
  }

  getTotalCount(): Observable<number> {
    throw new Error("Method not implemented.");
  }

  add(t: Task): Observable<Task> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Observable<Task> {
    throw new Error("Method not implemented.");
  }

  update(t: Task): Observable<Task> {
    throw new Error("Method not implemented.");
  }
}
