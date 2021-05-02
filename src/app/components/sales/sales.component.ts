import {Component, OnInit} from '@angular/core';
import {SalesService} from '../../services/sales/sales.service';
import {Sales} from '../../models';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  salesList: Sales[] = [];

  constructor(private salesService: SalesService) {
  }

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    const filters = {
      offset: 0,
      limit: 100,
      skip: 0,
      order: 'id',
      where: {
        additionalProp1: {}
      },
      fields: {
        id: true,
        description: true,
        type: true,
        amount: true
      }
    };
    this.salesService.loadSales(JSON.stringify(filters)).subscribe(res => {
      this.salesList = res;
    });
  }

}
