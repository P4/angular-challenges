import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

interface Ctx<T> {
  $implicit: T;
}

@Directive({ selector: '[appCardItem]', standalone: true })
export class CardItemDirective<T> {
  constructor(readonly ref: TemplateRef<Ctx<T>>) {}
  /**
   * Improve type checking by passing a reference to the list of items or the surrounding cards.
   */
  @Input() appCardItemOf?: T[] | CardComponent<T>;
  // type the context
  static ngTemplateContextGuard<T>(
    dir: CardItemDirective<T>,
    context: unknown,
  ): context is Ctx<T> {
    return true;
  }
}

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>
    <section>
      <ng-container *ngFor="let item of list">
        <ng-container
          *ngTemplateOutlet="tpl; context: { $implicit: item }"></ng-container>
      </ng-container>
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="add.emit()">
      Add
    </button>
  `,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  standalone: true,
  imports: [NgFor, NgTemplateOutlet, ListItemComponent],
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;

  @ContentChild(CardItemDirective, { read: TemplateRef })
  tpl!: TemplateRef<Ctx<T>>;

  @Output() readonly add = new EventEmitter<void>();
}
