import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="img"></ng-content>
      <section>
        <app-list-item
          *ngFor="let item of list"
          [name]="item.firstName"
          [id]="item.id"
          (delete)="delete.emit($event)"></app-list-item>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';

  @Output() readonly add = new EventEmitter<void>();
  @Output() readonly delete = new EventEmitter<number>();
}
