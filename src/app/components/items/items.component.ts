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
      order: 'id',
      fields: {
        id: true,
        name: true,
        description: true,
        price: true
      }
    };
    this.itemService.loadItems(JSON.stringify(filters)).subscribe(next => {
      this.itemList = next;
    });
  }

  delete(id: number | undefined): void {
    if (id) {
      this.itemService.deleteItem(id).subscribe(() => {
        this.itemList = this.itemList.filter(s => s.id !== id);
      });
    }
  }

}
