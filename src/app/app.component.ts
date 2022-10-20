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
import {StatService} from "./data/dao/impl/StatService";
import {Stat} from "./model/Stat";
import {DashboardData} from "./object/DashboardData";

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

  showStat = true;
  showSearch = true;

  selectedCategory: Category = null;

  uncompletedCountForCategoryAll: number;

  totalTasksFounded: number;

  categorySearchValues = new CategorySearchValues();
  taskSearchValues = new TaskSearchValues();

  stat: Stat;
  dash: DashboardData = new DashboardData();

  constructor(
    private categoryService: CategoryService,
    private taskService: TaskService,
    private priorityService: PriorityService,
    private statService: StatService,
    private dialog: MatDialog
  ) {
    this.statService.getOverallStat().subscribe((result => {     // сначала получаем данные статистики
      this.stat = result;
      this.uncompletedCountForCategoryAll = this.stat.uncompletedTotal;

      this.fillAllCategories().subscribe(res => {
        this.categories = res;

        this.selectCategory(this.selectedCategory);
      });
    }));
  }

  ngOnInit(): void {
    this.fillAllPriorities();


  }

  fillDashData(completedCount: number, uncompletedCount: number) {
    this.dash.completedTotal = completedCount;
    this.dash.uncompletedTotal = uncompletedCount;
  }

  fillAllCategories(): Observable<Category[]> {
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
      this.selectedCategory = null;

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

  addTask(task: Task) {
    this.taskService.add(task).subscribe(result => {

      if (task.category) {
        this.updateCategoryCounter(task.category);
      }
      this.updateOverallCounter();
      this.searchTasks(this.taskSearchValues);
    });

  }

  deleteTask(task: Task) {
    this.taskService.delete(task.id).subscribe(result => {

      if (task.category) {
        this.updateCategoryCounter(task.category);
      }

      this.updateOverallCounter();
      this.searchTasks(this.taskSearchValues);
    });
  }

  updateTask(task: Task) {
    this.taskService.update(task).subscribe(result => {

      if (task.oldCategory) {
        this.updateCategoryCounter(task.oldCategory);
      }

      if (task.category) {
        this.updateCategoryCounter(task.category);
      }

      this.updateOverallCounter();
      this.searchTasks(this.taskSearchValues);
    });
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

  private updateCategoryCounter(category: Category) {
    this.categoryService.findById(category.id).subscribe(cat => {

      this.categories[this.getCategoryIndex(category)] = cat;

      this.showCategoryDashboard(cat);

    });
  }

  private updateOverallCounter() {
    this.statService.getOverallStat().subscribe((res => {
      this.stat = res;
      this.uncompletedCountForCategoryAll = this.stat.uncompletedTotal;

      if (!this.selectedCategory) {
        this.fillDashData(this.stat.completedTotal, this.stat.uncompletedTotal);
      }

    }));
  }

  private getCategoryIndex(category: Category): number {
    const tmpCategory = this.categories.find(t => t.id === category.id);
    return this.categories.indexOf(tmpCategory);
  }


  private showCategoryDashboard(cat: Category) {
    if (this.selectedCategory && this.selectedCategory.id === cat.id) {
      this.fillDashData(cat.completedCount, cat.uncompletedCount);
    }
  }

  settingsChanged(priorities: Priority[]) {
    this.priorities = priorities;
    console.log(priorities);
    this.searchTasks(this.taskSearchValues);
  }

  toggleStat(showStat: boolean) {
    this.showStat = showStat;
  }
}
