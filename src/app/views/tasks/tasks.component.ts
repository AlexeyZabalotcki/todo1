import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from "../../model/Task";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {TaskSearchValues} from "../../data/dao/search/SearchObjects";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Input()
  totalTasksFounded: number;

  @Input('tasks')
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.assignTableSource();
  }

  @Input('taskSearchValues')
  set setTaskSearchValues(taskSearchValues: TaskSearchValues) {
    this.taskSearchValues = taskSearchValues;
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Input()
  selectedCategory: Category;

  @Output()
  addTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  paging = new EventEmitter<PageEvent>();

  @Output()
  searchAction = new EventEmitter<TaskSearchValues>();

  @Output()
  filterByTitle = new EventEmitter<string>();

  @Output()
  filterByStatus = new EventEmitter<boolean>();

  @Output()
  filterByPriority = new EventEmitter<Priority>();

  tasks: Task[] = [];

  priorities: Priority[];

  searchTaskText: string;

  selectedStatusFilter: boolean = null;

  selectedPriorityFilter: Priority = null;

  taskSearchValues: TaskSearchValues;

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();

  @ViewChild(MatPaginator, {static: false}) private paginator!: MatPaginator;

  @ViewChild(MatSort, {static: false}) private sort!: MatSort;

  readonly colorCompletedTask = '#F8F9FA';
  readonly colorWhite = '#fff';

  constructor(
    private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  assignTableSource() {

    if (!this.dataSource) {
      return;
    }
    this.dataSource.data = this.tasks;

  }


  openAddDialog() {


  }

  openEditDialog(task: Task): void {


  }


  openDeleteDialog(task: Task) {

  }


  onToggleCompleted(task: Task) {


  }


  getPriorityColor(task: Task) {

    if (task.completed) {
      return this.colorCompletedTask;
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return this.colorWhite;

  }

  getPriorityBgColor(task: Task) {

    if (task.priority != null && !task.completed) {
      return task.priority.color;
    }

    return 'none';
  }

  pageChanged(pageEvent: PageEvent) {
    this.paging.emit(pageEvent);
  }

  openAddTaskDialog() {

  }

}
