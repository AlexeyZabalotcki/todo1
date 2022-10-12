import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AboutDialogComponent} from "../../dialog/about-dialog/about-dialog.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year: Date;
  site = 'https://www.linkedin.com/in/alexey-zabalotcki/';
  blog = 'https://www.linkedin.com/in/alexey-zabalotcki/';
  siteName = 'MyContact';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openAboutDialog() {
    this.dialog.open(AboutDialogComponent,
      {
        autoFocus: false,
        data: {
          dialogTitle: 'About',
          message: 'This application has been creating by Alexey Zabalotcki via Angilar'
        },
        width: '400px'
      });
  }
}
