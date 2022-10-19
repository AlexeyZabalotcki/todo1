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

  @Input()
  showSearch: boolean;

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

  @Output()
  toggleSearch = new EventEmitter<boolean>();

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

  changed = false;

  sortIconName: string;

  readonly iconNameDown = 'arrow_downward';
  readonly iconNameUp = 'arrow_upward';

  readonly colorCompletedTask = '#F8F9FA';
  readonly colorWhite = '#fff';

  readonly defaultSortColumn = 'title';
  readonly defaultSortDirection = 'asc';

  filterTitle: string;
  filterCompleted: number;
  filterPriorityId: number;
  filterSortColumn: string;
  filterSortDirection: string;

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

  onToggleSearch() {
    this.toggleSearch.emit(!this.showSearch);
  }

  checkFilterChanged() {
    this.changed = false;

    if (this.taskSearchValues.title !== this.filterTitle) {
      this.changed = true;
    }

    if (this.taskSearchValues.completed !== this.filterCompleted) {
      this.changed = true;
    }

    if (this.taskSearchValues.priorityId !== this.filterPriorityId) {
      this.changed = true;
    }

    if (this.taskSearchValues.sortColumn !== this.filterSortColumn) {
      this.changed = true;
    }

    if (this.taskSearchValues.sortDirection !== this.filterSortDirection) {
      this.changed = true;
    }

    return this.changed;
  }

  changedSortDirection() {
    if (this.filterSortDirection === 'asc') {
      this.filterSortDirection = 'desc';
    } else {
      this.filterSortDirection = 'asc';
    }

    this.initSortDirectionIcon();
  }

  private initSortDirectionIcon() {
    if (this.filterSortDirection === 'desc') {
      this.sortIconName = this.iconNameDown;
    } else {
      this.sortIconName = this.iconNameUp;
    }
  }

  initSearch() {
    this.taskSearchValues.title = this.filterTitle;
    this.taskSearchValues.completed = this.filterCompleted;
    this.taskSearchValues.priorityId = this.filterPriorityId;
    this.taskSearchValues.sortColumn = this.filterSortColumn;
    this.taskSearchValues.sortDirection = this.filterSortDirection;

    this.searchAction.emit(this.taskSearchValues);

    this.changed = false;
  }

  clearSearchValues() {
    this.filterTitle = '';
    this.filterCompleted = null;
    this.filterPriorityId = null;
    this.filterSortColumn = this.defaultSortColumn;
    this.filterSortDirection = this.defaultSortDirection;
  }
}
