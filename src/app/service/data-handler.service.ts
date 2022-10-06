import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {Task} from "../model/Task";
import {TestData} from "../data/TestData";
import {BehaviorSubject} from "rxjs";
import {TaskDAOImpl} from "../data/dao/impl/TaskDAOImpl";
import {Observable} from "rxjs";
import {CategoryDAOImpl} from "../data/dao/impl/CategoryDAOImpl";
import {Priority} from "../model/Priority";
import {PriorityDAOImpl} from "../data/dao/impl/PriorityDAOImpl";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categorySubject = new BehaviorSubject<Category[]>(TestData.categories)

  private taskDaoImpl = new TaskDAOImpl();
  private categoryDaoImpl = new CategoryDAOImpl();
  private priorityDaoImpl = new PriorityDAOImpl()

  constructor() {
    this.fillTasks()
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoImpl.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoImpl.getAll();
  }

  getAllPriorities() {
    return this.priorityDaoImpl.getAll();
  }

  fillTasks() {
    this.taskSubject.next(TestData.tasks);
  }

  fillTasksByCategories(category: Category) {
    const tasks = TestData.tasks.filter(task => task.category === category);
    this.taskSubject.next(tasks);
  }

  searchTasks(category: Category, searchText?: string, status?: boolean, priority?: Priority): Observable<Task[]> {
    return this.taskDaoImpl.search(category, searchText, status, priority);
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoImpl.update(task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskDaoImpl.delete(id);
  }
}
