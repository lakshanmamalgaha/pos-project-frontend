import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sales} from '../../models';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private httpClient: HttpClient) {
  }

  loadSales(filters: any): Observable<Sales[]> {
    return this.httpClient.get<Sales[]>(
      `${environment.apiURL}sales?filter=${filters}`
    );
  }
}
