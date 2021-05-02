import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SalaryService} from '../../services/salary/salary.service';
import {Salary} from '../../models';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-salary',
  templateUrl: './add-salary.component.html',
  styleUrls: ['./add-salary.component.scss']
})
export class AddSalaryComponent implements OnInit {
  salaryForm = new FormGroup({
    employeeName: new FormControl(''),
    type: new FormControl(''),
    amount: new FormControl(0),
    bonus: new FormControl(0),
  });
  mode = 'add';
  salary = new Salary();

  constructor(private salaryService: SalaryService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.checkParams();
  }

  checkParams(): void {
    this.activatedRoute.paramMap.subscribe(
      next => {
        const id = next.get('id');
        if (id) {
          this.mode = 'edit';
          this.fetchSalaryById(+id);
        }
      }
    );
  }

  fetchSalaryById(id: number): void {
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
    this.salaryService.loadSalaryById(id, JSON.stringify(filters)).subscribe(next => {
      this.salary = next;
      this.salaryForm.controls.employeeName.setValue(next.employeeName ?? '');
      this.salaryForm.controls.type.setValue(next.type ?? '');
      this.salaryForm.controls.amount.setValue(next.amount ?? 0);
      this.salaryForm.controls.bonus.setValue(next.bonus ?? 0);
    });
  }

  saveSalary(value: any): void {
    const sal = value as Salary;
    this.salaryService.saveSalary(sal).subscribe(next => {
      console.log(next);
      this.router.navigate(['/salary']).finally();
    });
  }

  updateSalary(value: any): void {
    const sal = value as Salary;
    if (this.salary.id) {
      this.salaryService.editSalary(this.salary.id, sal).subscribe(() => {
        this.router.navigate(['/salary']).finally();
      });
    }
  }

}
