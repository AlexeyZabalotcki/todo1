import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";
import {zip} from "rxjs";
import {concatMap, map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo1';

  categoryMap = new Map<Category, number>();

  tasks: Task[];
  categories: Category[];
  priorities: Priority[];

  totalTaskCountInCategory: number;
  completedCountInCategory: number;
  uncompletedCountInCategory: number;
  uncompletedTotalTaskCount: number;

  showStat = true;

  protected selectedCategory: Category = null;

  protected searchTaskText = '';
  private searchCategoryText = '';

  protected statusFilter: boolean;
  protected priorityFilter: Priority;

  constructor() {
  }

  ngOnInit(): void {
    // this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities)
    // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)

    this.fillCategories();
    this.onSelectCategory(null);
  }

  onSelectCategory(category: Category) {

    this.selectedCategory = category;

    this.updateTasksAndStat();
  }

  onSearchCategory(title: string): void {

    this.searchCategoryText = title;

    // this.dataHandler.searchCategories(title).subscribe(categories => {
    //   this.categories = categories;
    //   this.fillCategories();
    // });
  }


  onUpdateTask(task: Task) {
    // this.dataHandler.updateTask(task).subscribe(() => {
    //   this.fillCategories();
    //
    //   this.updateTasksAndStat();
    // })
  }

  onDeleteTask(task: Task) {
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
    this.statusFilter = status;
    this.updateTasks();
  }

  onDeleteCategory(category: Category) {
    // this.dataHandler.deleteCategory(category.id).subscribe(cat => {
    //   this.selectedCategory = null;
    //   this.categoryMap.delete(cat)
    //   this.onSearchCategory(this.searchCategoryText);
    //   this.updateTasks();
    // });
  }

  onUpdateCategory(category: Category): void {
    // this.dataHandler.updateCategory(category).subscribe(() => {
    //   this.onSearchCategory(this.searchCategoryText);
    // });
  }

  onFilterByTitle(searchString: string) {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  onFilterTaskByPriority(priority: Priority) {
    this.priorityFilter = priority;
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

  onAddTask(task: Task) {
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

  onAddCategory(title: string) {
    // this.dataHandler.addCategory(title).subscribe(() => {
    //   this.fillCategories();
    // });
  }

  private fillCategories() {
    if (this.categoryMap) {
      this.categoryMap.clear();
    }

    this.categories = this.categories.sort((a, b) => a.title.localeCompare(b.title));

    // this.categories.forEach(cat => {
    //   this.dataHandler.getUncompletedCountInCategory(cat).subscribe(count => this.categoryMap.set(cat, count));
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
}
