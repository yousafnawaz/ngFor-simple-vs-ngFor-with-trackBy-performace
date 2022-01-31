import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s ease-in', style({ opacity: 1, color: 'green' })),
      ]),
      transition(':leave', [
        animate(
          '2s 1s ease-out',
          style({
            opacity: 0,
            color: 'red',
            'text-decoration': 'line-through',
          })
        ),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  timerId: number;
  items: Item[] = [];

  ngOnInit(): void {
    //this.initialize();
    this.run();
  }
  initialize() {
    // initialize items
    this.items = [
      {
        id: 1,
        name: 'Item 1',
      },
      {
        id: 2,
        name: 'Item 2',
      },
      {
        id: 3,
        name: 'Item 3',
      },
      {
        id: 4,
        name: 'Item 4',
      },
      {
        id: 5,
        name: 'Item 5',
      },
    ];
    //using timeout to simulate fake API call  API scenario
    this.timerId = setTimeout(() => {
      // new data arriives from server
      this.items = [
        {
          id: 1,
          name: 'Item 1',
        },
        {
          id: 2,
          name: 'Item 2',
        },
        {
          id: 3,
          name: 'Item 3 Updated',
        },
        {
          id: 6,
          name: 'Item 6 Added',
        },
      ];
    }, 3000);
  }
  trackByItemId(index: number, item: Item): number {
    return item.id;
  }
  ngOnDestroy(): void {
    this.clearTimerRefernce();
  }
  clearTimerRefernce() {
    clearTimeout(this.timerId);
  }
  run() {
    setTimeout(() => {
      this.initialize();
    }, 3000);
  }
}
