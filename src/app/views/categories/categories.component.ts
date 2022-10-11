import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {OperType} from "../../dialog/OperType";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories: Category[] = [];

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Input()
  selectedCategory!: Category;
  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Output()
  addCategory = new EventEmitter<string>();

  indexMouseMove: number;

  constructor(private dataHandler: DataHandlerService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)
  }

  showTasksByCategory(category: Category | null): void {

    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = <Category>category;

    this.selectCategory.emit(this.selectedCategory);
  }

  showEditIcon(index: number | null) {
    this.indexMouseMove = <number>index;
  }


  openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Edit category', OperType.EDIT],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'delete') {
        this.deleteCategory.emit(category);

        return;
      }

      if (typeof (result) === 'string') {
        category.title = result as string;

        this.updateCategory.emit(category);
        return;
        ;
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: ['', 'Add category', OperType.ADD],
      width: '400'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory.emit(result as string)
      }
    });
  }
}
