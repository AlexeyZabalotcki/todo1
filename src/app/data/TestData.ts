import {Category} from "../model/Category";
import {Priority} from "../model/Priority";
import {Task} from "../model/Task";

export class TestData {

  static categories: Category[] = [
    {id: 1, title: 'Work'},
    {id: 2, title: 'Family'},
    {id: 3, title: 'Study'},
    {id: 4, title: 'Relax'},
    {id: 5, title: 'Sport'},
    {id: 6, title: 'Food'},
    {id: 7, title: 'Finance'},
    {id: 8, title: 'Devices'},
    {id: 9, title: 'Health'},
    {id: 10, title: 'Cars'},
  ];

  static priorities: Priority[] = [
    {id: 1, title: 'Low', color: '#e5e5e5'},
    {id: 2, title: 'Medium', color: '#85D1B2'},
    {id: 3, title: 'High', color: '#F1828d'},
    {id: 4, title: 'Super high', color: '#F1128D'},
  ];

  static tasks: Task[] = [
    {
      id: 1,
      title: 'do something',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[9],
      date: new Date('2022-09-28')
    }, {
      id: 2,
      title: 'do something 2',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[7],
      date: new Date('2022-09-28')
    }, {
      id: 3,
      title: 'do something 3',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[6],
      date: new Date('2022-09-29')
    }, {
      id: 4,
      title: 'do something 4',
      priority: TestData.priorities[2],
      completed: true,
      category: TestData.categories[5],
    }, {
      id: 5,
      title: 'do something 5',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[4],
      date: new Date('2022-09-28')
    }, {
      id: 6,
      title: 'do something 6',
      priority: TestData.priorities[1],
      completed: false,
      category: TestData.categories[3],
      date: new Date('2022-09-28')
    }, {
      id: 7,
      title: 'do something 7',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[5],
      date: new Date('2022-09-28')
    }, {
      id: 8,
      title: 'do something 8',
      completed: true,
      category: TestData.categories[8],
      date: new Date('2022-09-28')
    }, {
      id: 9,
      title: 'do something 9',
      priority: TestData.priorities[1],
      completed: false,
      date: new Date('2022-09-28')
    }, {
      id: 10,
      title: 'do something 10',
      priority: TestData.priorities[1],
      completed: false,
      category: TestData.categories[7],
      date: new Date('2022-09-28')
    }, {
      id: 11,
      title: 'do something 11',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[2],
      date: new Date('2022-09-28')
    }, {
      id: 12,
      title: 'do something 12',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[1],
      date: new Date('2022-09-28')
    }, {
      id: 13,
      title: 'do something 13',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[4],
      date: new Date('2022-09-28')
    }, {
      id: 14,
      title: 'do something 14',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[6],
      date: new Date('2022-09-28')
    }, {
      id: 15,
      title: 'do something 15',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[2],
      date: new Date('2022-09-28')
    }, {
      id: 16,
      title: 'do something 16',
      priority: TestData.priorities[1],
      completed: false,
      category: TestData.categories[1],
      date: new Date('2022-09-28')
    },
  ]

}
