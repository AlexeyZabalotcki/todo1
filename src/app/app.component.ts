import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";
import {CategorySearchValues} from "./data/dao/search/SearchObjects";
import {CategoryService} from "./data/dao/impl/CategoryService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo1';

  categories: Category[];

  uncompletedCountForCategoryAll: number;

  showStat = true;

  selectedCategory: Category = null;

  categorySearchValues = new CategorySearchValues();

  constructor(
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    // this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities)
    // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)

    this.fillAllCategories();
    this.selectCategory(null);
  }

  private fillAllCategories() {

    this.categoryService.findAll().subscribe(result => {

      this.categories = result;

    });
  }

  searchCategory(categorySearchValues: CategorySearchValues) {

    this.categoryService.findCategories(categorySearchValues).subscribe(result => {
      this.categories = result;
    });
  }


  selectCategory(category: Category) {

  }

  addCategory(category: Category) {
    this.categoryService.add(category).subscribe(result => {
      this.searchCategory(this.categorySearchValues);
    });
  }

  deleteCategory(category: Category) {
    this.categoryService.delete(category.id).subscribe(cat => {
      this.searchCategory(this.categorySearchValues);
    });
  }

  updateCategory(category: Category): void {
    this.categoryService.update(category).subscribe(() => {
      this.searchCategory(this.categorySearchValues);
    });
  }

  onUpdateTask(task: Task) {
    // this.dataHandler.updateTask(task).subscribe(() => {
    //   this.fillAllCategories();
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
