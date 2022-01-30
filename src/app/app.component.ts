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
        animate('2s ease-in', style({ opacity: 1, color: '#198754' })),
      ]),
      transition(':leave', [
        animate(
          '2s 3s ease-out',
          style({
            opacity: 0,
            color: '#dc3545',
            'text-decoration': 'line-through',
          })
        ),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  timerId: number;
  items: Item[] = [
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

  ngOnInit(): void {
    this.initialize();
  }
  initialize() {
    //fake API call to simulate scenario
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
    }, 5000);
  }

  trackByItemId(index: number, item: Item): number {
    return item.id;
  }
  replay() {
    this.clearTimerRefernce();
    this.initialize();
  }
  ngOnDestroy(): void {
    this.clearTimerRefernce();
  }
  clearTimerRefernce() {
    clearTimeout(this.timerId);
  }
}
