import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Priority} from "../../model/Priority";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {EditPriorityDialogComponent} from "../../dialog/edit-priority-dialog/edit-priority-dialog.component";
import {DialogAction} from "../../object/DialogResult";

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {

  static defaultColor = '#fcfcfc';

  @Input()
  priorities: Priority[];

  @Output()
  deletePriority = new EventEmitter<Priority>();

  @Output()
  updatePriority = new EventEmitter<Priority>();

  @Output()
  addPriority = new EventEmitter<Priority>();

  constructor(private dialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  openAddDialog() {

    const dialogRef = this.dialog.open(EditPriorityDialogComponent,
      {
        data:
          [new Priority(null, '', PrioritiesComponent.defaultColor),
            'Add priority'], width: '400px'
      });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.SAVE) {
        const newPriority = result.obj as Priority;
        this.addPriority.emit(newPriority);
      }
    });
  }

  openEditDialog(priority: Priority) {

    const dialogRef = this.dialog.open(EditPriorityDialogComponent, {
      data: [new Priority(priority.id, priority.title, priority.color), 'Edit priority']
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.DELETE) {
        this.deletePriority.emit(priority);
        return;
      }

      if (result.action === DialogAction.SAVE) {
        priority = result.obj as Priority;
        this.updatePriority.emit(priority);
        return;
      }
    });
  }

  openDeleteDialog(priority: Priority) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm action',
        message: 'Are you sure you want to delete this priority? (Task will be without priority)'
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.OK) {
        this.deletePriority.emit(priority);
      }
    });
  }
}
