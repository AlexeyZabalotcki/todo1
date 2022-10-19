import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";
import {CategorySearchValues, TaskSearchValues} from "./data/dao/search/SearchObjects";
import {CategoryService} from "./data/dao/impl/CategoryService";
import {TaskService} from "./data/dao/impl/TaskService";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {PriorityService} from "./data/dao/impl/PriorityService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'todo1';

  categories: Category[];
  tasks: Task[];
  priorities: Priority[];

  uncompletedCountForCategoryAll: number;

  showStat = true;

  selectedCategory: Category = null;

  totalTasksFounded: number;

  categorySearchValues = new CategorySearchValues();
  taskSearchValues = new TaskSearchValues();

  showSearch: boolean;

  constructor(
    private categoryService: CategoryService,
    private taskService: TaskService,
    private priorityService: PriorityService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    // this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities)
    // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)

    this.fillAllCategories().subscribe(res => {
      this.categories = res;
      this.selectCategory(this.selectedCategory);
    });
  }

  private fillAllCategories(): Observable<Category[]> {
    return this.categoryService.findAll();
  }

  searchCategory(categorySearchValues: CategorySearchValues) {

    this.categoryService.findCategories(categorySearchValues).subscribe(result => {
      this.categories = result;
    });

    this.fillAllPriorities();
  }


  selectCategory(category: Category) {

    this.taskSearchValues.pageNumber = 0;

    this.selectedCategory = category;

    this.taskSearchValues.categoryId = category ? category.id : null;

    this.searchTasks(this.taskSearchValues);


  }

  searchTasks(searchTaskValues: TaskSearchValues) {

    this.taskSearchValues = searchTaskValues;

    this.taskService.findTasks(this.taskSearchValues).subscribe(result => {

      if (result.totalPages > 0 && this.taskSearchValues.pageNumber >= result.totalPages) {
        this.taskSearchValues.pageNumber = 0;
        this.searchTasks(this.taskSearchValues);
      }

      this.totalTasksFounded = result.totalElements;
      this.tasks = result.content;
    });
  }

  addCategory(category: Category) {
    this.categoryService.add(category).subscribe(result => {
      this.searchCategory(this.categorySearchValues);
    });
  }

  deleteCategory(category: Category) {
    this.categoryService.delete(category.id).subscribe(cat => {
      this.searchCategory(this.categorySearchValues);
      this.selectCategory(this.selectedCategory);
    });
  }

  updateCategory(category: Category): void {
    this.categoryService.update(category).subscribe(() => {
      this.searchCategory(this.categorySearchValues);
      this.searchTasks(this.taskSearchValues);
    });
  }

  updateTask(task: Task) {
    // this.dataHandler.updateTask(task).subscribe(() => {
    //   this.fillAllCategories();
    //
    //   this.updateTasksAndStat();
    // })
  }

  deleteTask(task: Task) {
    // this.dataHandler.deleteTask(task.id).pipe(
    //   concatMap(task => {
    //       return this.dataHandler.getUncompletedCountInCategory(task.category).pipe(map(count => {
    //         return ({t: task, count});
    //       }));
    //     }
    //   )).subscribe(result => {
    //   const t = result.t as Task;
    //   this.categoryMap.set(t.category, result.count);
    //
    //   if (t.category) {
    //     this.categoryMap.set(t.category, result.count)
    //   }
    //
    //   this.updateTasksAndStat();
    // });
  }

  onFilterTaskByStatus(status: boolean) {
    //this.statusFilter = status;
    this.updateTasks();
  }

  onFilterByTitle(searchString: string) {
    //this.searchTaskText = searchString;
    this.updateTasks();
  }

  onFilterTaskByPriority(priority: Priority) {
    //this.priorityFilter = priority;
    this.updateTasks();
  }

  private updateTasks() {
    // this.dataHandler.searchTasks(
    //   this.selectedCategory,
    //   this.searchTaskText,
    //   this.statusFilter,
    //   this.priorityFilter
    // ).subscribe((tasks: Task[]) => {
    //   this.tasks = tasks;
    // });
  }

  addTask(task: Task) {
    // this.dataHandler.addTask(task).pipe(
    //   concatMap(task => {
    //       return this.dataHandler.getUncompletedCountInCategory(task.category).pipe(map(count => {
    //         return ({t: task, count});
    //       }));
    //     }
    //   )).subscribe(result => {
    //   const t = result.t as Task;
    //
    //   if (t.category) {
    //     this.categoryMap.set(t.category, result.count);
    //   }
    //
    //   this.updateTasksAndStat();
    // });
  }

  private updateTasksAndStat() {
    this.updateTasks();

    this.updateStat();
  }

  private updateStat() {
    // zip(
    //   this.dataHandler.getTotalCountInCategory(this.selectedCategory),
    //   this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
    //   this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
    //   this.dataHandler.getUncompletedTotalCount())
    //
    //   .subscribe(array => {
    //     this.totalTaskCountInCategory = array[0];
    //     this.completedCountInCategory = array[1];
    //     this.uncompletedCountInCategory = array[2];
    //     this.uncompletedTotalTaskCount = array[3];
    //   });
  }

  toggleStat(showStat: boolean) {
    this.showStat = showStat;
  }

  paging(pageEvent: PageEvent) {

    if (this.taskSearchValues.pageSize !== pageEvent.pageSize) {
      this.taskSearchValues.pageNumber = 0;
    } else {
      this.taskSearchValues.pageNumber = pageEvent.pageIndex;
    }

    this.taskSearchValues.pageSize = pageEvent.pageSize;
    this.taskSearchValues.pageNumber = pageEvent.pageIndex;

    this.searchTasks(this.taskSearchValues);

  }

  fillAllPriorities() {
    this.priorityService.findAll().subscribe(result => {
      this.priorities = result;
    });
  }

  toggleSearch(showSearch: boolean) {
    this.showSearch = showSearch;
  }
}
