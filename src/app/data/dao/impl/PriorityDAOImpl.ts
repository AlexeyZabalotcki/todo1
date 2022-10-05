import {Observable, of} from "rxjs";
import {Priority} from "src/app/model/Priority";
import {PriorityDAO} from "../interface/PriorityDAO";
import {TestData} from "../../TestData";

export class PriorityDAOImpl implements PriorityDAO {
  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  add(t: Priority): Observable<Priority> {
    throw new Error("Method not implemented.");
  }

  get(id: number): Observable<Priority> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Observable<Priority> {
    throw new Error("Method not implemented.");
  }

  update(t: Priority): Observable<Priority> {
    throw new Error("Method not implemented.");
  }

}
