import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SettingsDialogComponent} from "../../dialog/settings-dialog/settings-dialog.component";
import {Priority} from "../../model/Priority";
import {DialogAction} from "../../object/DialogResult";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  categoryName: string;

  @Input()
  showStat: boolean;

  @Output()
  toggleStat = new EventEmitter<boolean>();

  @Output()
  settingsChanged = new EventEmitter<Priority[]>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  showSettings() {

    const dialogRef = this.dialog.open(SettingsDialogComponent,
      {
        autoFocus: false,
        width: '500px'
      });

    dialogRef.afterClosed().subscribe(result => {

      if (result && result.action === DialogAction.SETTINGS_CHANGE) {
        this.settingsChanged.emit(result.obj);
        return;
      }
    });
  }


  onToggleStats() {
    this.toggleStat.emit(!this.showStat);
  }
}
