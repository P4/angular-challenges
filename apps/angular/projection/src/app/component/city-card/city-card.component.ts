import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent, CardItemDirective } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card #card [list]="cities()" (add)="addCity()">
      <img src="assets/img/city.png" alt="" width="200" />
      <app-list-item
        *appCardItem="let item of card"
        [id]="item.id"
        [name]="item.name"
        (delete)="deleteCity($event)"></app-list-item>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, CardItemDirective, AsyncPipe, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  protected readonly cities = this.store.cities;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
