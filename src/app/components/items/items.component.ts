import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../services/item/item.service';
import {Item} from '../../models';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  itemList: Item[] = [];

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
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
    this.itemService.loadItems(JSON.stringify(filters)).subscribe(next => {
      console.log(next);
      this.itemList = next;
    });
  }

}
