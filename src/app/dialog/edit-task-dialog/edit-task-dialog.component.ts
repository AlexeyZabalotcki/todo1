import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from "../../model/Task";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditTaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: [Task, string],
              private dataHandler: DataHandlerService
  ) {
  }

  categories!: Category[];
  priorities!: Priority[];

  dialogTitle!: string;
  task!: Task;
  tmpTitle!: string;
  tmpCategory!: Category;
  tmpPriority!: Priority;

  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];

    this.tmpTitle = this.task.title;
    this.tmpCategory = <Category>this.task.category;
    this.tmpPriority = <Priority>this.task.priority;

    this.dataHandler.getAllCategories().subscribe(items => this.categories = items);
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);

  }

  onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;

    this.dialogRef.close(this.task);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
