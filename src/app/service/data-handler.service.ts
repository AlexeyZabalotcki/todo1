import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {Task} from "../model/Task";
import {TestData} from "../data/TestData";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categorySubject = new BehaviorSubject<Category[]>(TestData.categories)

  constructor() {
    this.fillTasks()
  }

  /*getCategories(): Category[] {
    return TestData.categories;
  }
*/
  fillTasks() {
    this.taskSubject.next(TestData.tasks);
  }

  fillTasksByCategories(category: Category) {
    const tasks = TestData.tasks.filter(task => task.category === category);
    this.taskSubject.next(tasks);
  }
}
