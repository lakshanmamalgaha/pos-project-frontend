import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Item, Salary} from '../../models';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private httpClient: HttpClient) {
  }

  saveSalary(item: Item): Observable<Salary> {
    return this.httpClient.post<Salary>(
      `${environment.apiURL}salary`, item
    );
  }

  loadSalaries(filters: any): Observable<Salary[]> {
    return this.httpClient.get<Salary[]>(
      `${environment.apiURL}salary?filter=${filters}`
    );
  }

  loadSalaryById(id: number, filters: any): Observable<Salary> {
    return this.httpClient.get<Salary>(
      `${environment.apiURL}salary/${id}?filter=${filters}`
    );
  }

  deleteSalary(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiURL}salary/${id}`
    );
  }

  editSalary(id: number, salary: Salary): Observable<Salary> {
    return this.httpClient.patch<Salary>(
      `${environment.apiURL}salary/${id}`, salary
    );
  }
}
