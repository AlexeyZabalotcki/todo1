import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  @Input()
  completedTasksInCategory: number;

  @Input()
  totalTasksInCategory: number;

  @Input()
  uncompletedTasksInCategory: number;

  @Input()
  showStat: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
