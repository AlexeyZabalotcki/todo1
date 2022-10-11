import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";

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
  protected statusFilter: boolean;
  private priorityFilter: Priority;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities)
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)

    this.onSelectCategory(null);
  }

  onSelectCategory(category: Category) {

    this.selectedCategory = category;

    this.updateTasks();
  }

  onUpdateTask(task: Task) {
    this.updateTasks();
  }


  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.onSelectCategory(this.selectedCategory)
    });
  }

  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null;
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
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
}
