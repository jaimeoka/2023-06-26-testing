import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddressLookuper {
  #httpClient = inject(HttpClient);

  #counter = 0;

  get counter() {
    return this.#counter;
  }

  lookup(query: string): Observable<boolean> {
    this.#counter++;
    return this.#httpClient
      .get<undefined[]>('https://nominatim.openstreetmap.org/search.php', {
        params: new HttpParams().set('q', query).set('format', 'jsonv2'),
      })
      .pipe(map((addresses) => addresses.length > 0));
  }
}
