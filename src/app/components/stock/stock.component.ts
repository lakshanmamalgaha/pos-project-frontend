import {Component, OnInit} from '@angular/core';
import {Stock} from '../../models';
import {StockService} from '../../services/stock/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  stockList: Stock[] = [];

  constructor(private stockService: StockService) {
  }

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks(): void {
    const filters = {
      offset: 0,
      limit: 100,
      skip: 0,
      order: 'name',
      fields: {
        id: true,
        name: true,
        description: true
      }
    };
    this.stockService.loadStocks(JSON.stringify(filters)).subscribe(next => {
      this.stockList = next;
    });
  }

}
