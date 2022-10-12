import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";
import {zip} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo1';
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];

  protected selectedCategory: Category = null;

  protected searchTaskText = '';
  private searchCategoryText: string;

  protected statusFilter: boolean;
  private priorityFilter: Priority;

  totalTaskCountInCategory: number;
  completedCountInCategory: number;
  uncompletedCountInCategory: number;
  uncompletedTotalTaskCount: number;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities)
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)

    this.onSelectCategory(null);
  }

  onSelectCategory(category: Category) {

    this.selectedCategory = category;

    this.updateTasksAndStat();
  }

  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(cat => {
      this.updateTasksAndStat();
    });
  }


  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(cat => {
      this.updateTasksAndStat()
    });
  }

  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null;
      this.onSelectCategory(null);
    });
  }

  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText);
    });
  }

  onFilterTaskByStatus(status: boolean) {
    this.statusFilter = status;
    this.updateTasks();

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
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  onAddTask(task: Task) {
    this.dataHandler.addTask(task).subscribe(result => {
      this.updateTasksAndStat();
    });
  }

  onAddCategory(title: string) {
    this.dataHandler.addCategory(title).subscribe(() => {
      this.updateCategories();
    });
  }

  private updateCategories() {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  onSearchCategory(title: string) {
    this.searchCategoryText = title;

    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    });
  }

  private updateTasksAndStat() {
    this.updateTasks();

    this.updateStat();
  }

  private updateStat() {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedTotalCount())

      .subscribe(array => {
        this.totalTaskCountInCategory = array[0];
        this.completedCountInCategory = array[1];
        this.uncompletedCountInCategory = array[2];
        this.uncompletedTotalTaskCount = array[3];
      });
  }
}
