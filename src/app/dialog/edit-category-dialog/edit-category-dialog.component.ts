import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {OperType} from "src/app/dialog/OperType";

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {
  dialogTitle!: string;
  categoryTitle!: string;
  //canDelete = true;
  operType: OperType;

  constructor(private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType],
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];

    /*if (!this.categoryTitle) {
      this.canDelete = false;
    }*/
  }

  onConfirm() {
    this.dialogRef.close(this.categoryTitle);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm action',
        message: 'Are you sure you want to delete this category?'
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete')
      }
    });
  }

  canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }
}
