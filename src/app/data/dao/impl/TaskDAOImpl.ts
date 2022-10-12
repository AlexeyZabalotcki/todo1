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

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  private searchTasks(category: Category, searchText: string, status: boolean, priority: Priority) {
    let allTasks = TestData.tasks;

    if (status != null) {
      allTasks = allTasks.filter(task => task.completed === status);
    }

    if (category != null) {
      allTasks = allTasks.filter(task => task.category === category);
    }

    if (priority != null) {
      allTasks = allTasks.filter(task => task.priority === priority)
    }

    if (searchText != null) {
      allTasks = allTasks.filter(
        task =>
          task.title.toUpperCase().includes(searchText.toUpperCase())
      );
    }
    return allTasks;
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return of(this.searchTasks(category, null, true, null).length);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return of(this.searchTasks(category, null, false, null).length);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return of(this.searchTasks(category, null, null, null).length);
  }

  getTotalCount(): Observable<number> {
    return of(TestData.tasks.length);
  }

  add(task: Task): Observable<Task> {
    if (task.id === null || task.id === 0) {
      task.id = this.getLastIdTask();
    }
    TestData.tasks.push(task);

    return of(task);
  }

  delete(id: number): Observable<Task> {
    const taskTmp = TestData.tasks.find(t => t.id === id);
    TestData.tasks.splice(TestData.tasks.indexOf(<Task>taskTmp), 1);
    // @ts-ignore
    return of(taskTmp);
  }

  update(task: Task): Observable<Task> {
    const taskTmp = TestData.tasks.find(t => t.id === task.id);
    TestData.tasks.splice(TestData.tasks.indexOf(<Task>taskTmp), 1, task);

    return of(task);
  }

  private getLastIdTask(): number {
    return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1;
  }
}
