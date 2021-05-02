import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stock} from '../../models';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: HttpClient) {
  }

  loadStocks(filters: any): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(
      `${environment.apiURL}stocks?filter=${filters}`
    );
  }
}
