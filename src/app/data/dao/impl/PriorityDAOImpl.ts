import {Observable, of} from "rxjs";
import {Priority} from "src/app/model/Priority";
import {PriorityDAO} from "../interface/PriorityDAO";
import {TestData} from "../../TestData";

export class PriorityDAOImpl implements PriorityDAO {

  static priorities = TestData.priorities;

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  add(priority: Priority): Observable<Priority> {
    if (priority.id === null || priority.id === 0) {
      priority.id = this.getLastPriority();
    }

    PriorityDAOImpl.priorities.push(priority)

    return of(priority);
  }

  get(id: number): Observable<Priority> {
    return of(PriorityDAOImpl.priorities.find(priority => priority.id === id));
  }

  delete(id: number): Observable<Priority> {
    TestData.tasks.forEach(task => {
      if (task.priority && task.priority.id === id) {
        task.priority = null;
      }
    });

    const tmpPriority = PriorityDAOImpl.priorities.find(t => t.id === id);
    PriorityDAOImpl.priorities.splice(PriorityDAOImpl.priorities.indexOf(tmpPriority), 1);

    return of(tmpPriority);
  }

  update(priority: Priority): Observable<Priority> {
    const tmp = PriorityDAOImpl.priorities.find(t => t.id === priority.id);
    PriorityDAOImpl.priorities.splice(PriorityDAOImpl.priorities.indexOf(tmp), 1, priority);

    return of(priority);
  }

  private getLastPriority() {
    return Math.max.apply(Math, TestData.priorities.map(priority => priority.id)) + 1;
  }
}
