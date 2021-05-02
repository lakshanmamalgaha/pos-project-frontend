import {Component, OnInit} from '@angular/core';
import {Salary} from '../../models';
import {SalaryService} from '../../services/salary/salary.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {
  salaryList: Salary[] = [];

  constructor(private salaryService: SalaryService) {
  }

  ngOnInit(): void {
    this.loadSalaries();
  }

  loadSalaries(): void {
    const filters = {
      offset: 0,
      limit: 100,
      skip: 0,
      order: 'id',
      fields: {
        employeeName: true,
        id: true,
        type: true,
        amount: true,
        bonus: true
      }
    };
    this.salaryService.loadSalaries(JSON.stringify(filters)).subscribe(next => {
      this.salaryList = next;
    });
  }

  delete(id: number | undefined): void {
    if (id) {
      this.salaryService.deleteSalary(id).subscribe(() => {
        this.salaryList = this.salaryList.filter(s => s.id !== id);
      });
    }
  }

}
