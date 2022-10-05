import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {Task} from "../model/Task";
import {TestData} from "../data/TestData";
import {BehaviorSubject} from "rxjs";
import {TaskDAOImpl} from "../data/dao/impl/TaskDAOImpl";
import {Observable} from "rxjs";
import {CategoryDAOImpl} from "../data/dao/impl/CategoryDAOImpl";
import {Priority} from "../model/Priority";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categorySubject = new BehaviorSubject<Category[]>(TestData.categories)

  private taskDAOImpl = new TaskDAOImpl();
  private categoryDAOImpl = new CategoryDAOImpl();

  constructor() {
    this.fillTasks()
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDAOImpl.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDAOImpl.getAll();
  }

  fillTasks() {
    this.taskSubject.next(TestData.tasks);
  }

  fillTasksByCategories(category: Category) {
    const tasks = TestData.tasks.filter(task => task.category === category);
    this.taskSubject.next(tasks);
  }

  searchTasks(category: Category, searchText?: string, status?: boolean, priority?: Priority): Observable<Task[]> {
    return this.taskDAOImpl.search(category, searchText, status, priority);
  }

  updateTask(task: Task) {
    return this.taskDAOImpl.update(task);
  }
}
