import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskDAO} from "../interface/TaskDAO";
import {TaskSearchValues} from "../search/SearchObjects";
import {Task} from "../../../model/Task";
import {CommonService} from "./CommonService";
import {Observable} from "rxjs";

export const TASK_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class TaskService extends CommonService<Task> implements TaskDAO {

  constructor(
    @Inject(TASK_URL_TOKEN) private baseUrl,
    private http: HttpClient) {
    super(baseUrl, http);
  }

  findTasks(taskSearchValues: TaskSearchValues): Observable<any> {
    return this.http.post<any>(this.url + '/search', taskSearchValues);
  }

}
