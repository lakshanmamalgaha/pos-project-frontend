import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item} from '../../models';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) {
  }

  saveItem(item: Item): Observable<Item> {
    return this.httpClient.post<Item>(
      `${environment.apiURL}items`, item
    );
  }

  loadItems(filters: any): Observable<Item[]> {
    return this.httpClient.get<Item[]>(
      `${environment.apiURL}items?filter=${filters}`
    );
  }

  loadItemsById(id: number, filters: any): Observable<Item> {
    return this.httpClient.get<Item>(
      `${environment.apiURL}items/${id}?filter=${filters}`
    );
  }

  deleteItem(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiURL}items/${id}`
    );
  }

  editItem(id: number, item: Item): Observable<Item> {
    return this.httpClient.patch<Item>(
      `${environment.apiURL}items/${id}`, item
    );
  }
}
