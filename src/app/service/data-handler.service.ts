import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {Task} from "../model/Task";
import {TestData} from "../data/TestData";
import {BehaviorSubject, Observable} from "rxjs";
import {TaskDAOImpl} from "../data/dao/impl/TaskDAOImpl";
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

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoImpl.search(category, searchText, status, priority);
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoImpl.update(task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskDaoImpl.delete(id);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDaoImpl.delete(id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoImpl.update(category);
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDaoImpl.add(task);
  }

  addCategory(title: string): Observable<Category> {
    return this.categoryDaoImpl.add(new Category(null, title));
  }

  searchCategories(title: string): Observable<Category[]> {
    return this.categoryDaoImpl.search(title);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return this.taskDaoImpl.getTotalCountInCategory(category);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoImpl.getCompletedCountInCategory(category)
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoImpl.getUncompletedCountInCategory(category)
  }

  getUncompletedTotalCount(): Observable<number> {
    return this.taskDaoImpl.getUncompletedCountInCategory(null);
  }


  addPriority(priority: Priority): Observable<Priority> {
    return this.priorityDaoImpl.add(priority);
  }

  deletePriority(id: number): Observable<Priority> {
    return this.priorityDaoImpl.delete(id);
  }

  updatePriority(priority: Priority): Observable<Priority> {
    return this.priorityDaoImpl.update(priority);
  }
}
