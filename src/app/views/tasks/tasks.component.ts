import {EventEmitter, Component, Input, OnInit, ViewChild, Output} from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  protected displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  protected dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator, {static: false}) private paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort!: MatSort;

  protected tasks: Task[] = [];

  @Input('tasks')
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Output()
  updateTask = new EventEmitter<Task>();

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit() {
    //this.dataHandler.getAllTasks().subscribe((tasks: Task[]) => this.tasks = tasks)

    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }


  ngAfterViewInit(): void {
    this.addTableObjects()
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }


  getPriorityColor(task: Task) {

    if (task.completed) {
      return '#F8F9FA'
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff'
  }

  private fillTable() {

    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.tasks;

    this.addTableObjects();

    // @ts-ignore
    this.dataSource.sortingDataAccessor = (task, colName) => {

      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }
        case 'title': {
          return task.title;
        }
      }
    };
  }

  private addTableObjects() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onClickTask(task: Task) {
    this.updateTask.emit(task);
  }
}
