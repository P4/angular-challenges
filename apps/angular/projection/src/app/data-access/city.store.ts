import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private readonly state = signal<City[]>([]);
  readonly cities = this.state.asReadonly();

  addAll(cities: City[]) {
    this.state.set(cities);
  }

  addOne(student: City) {
    this.state.update((v) => [...v, student]);
  }

  deleteOne(id: number) {
    this.state.update((v) => v.filter((s) => s.id !== id));
  }
}
