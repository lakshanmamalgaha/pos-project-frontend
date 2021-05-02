import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ItemService} from '../../services/item/item.service';
import {Item} from '../../models';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  itemForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0)
  });
  mode = 'add';
  item = new Item();

  constructor(private itemService: ItemService, private router: Router, private activatedRoute: ActivatedRoute) {
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
          this.fetchItemsById(+id);
        }
      }
    );
  }

  saveItem(value: any): void {
    const item = value as Item;
    this.itemService.saveItem(item).subscribe(next => {
      console.log(next);
      this.router.navigate(['/items']).finally();
    });
  }

  updateItem(value: any): void {
    const sal = value as Item;
    if (this.item.id) {
      this.itemService.editItem(this.item.id, sal).subscribe(() => {
        this.router.navigate(['/items']).finally();
      });
    }
  }

  fetchItemsById(id: number): void {
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
    this.itemService.loadItemsById(id, JSON.stringify(filters)).subscribe(next => {
      this.item = next;
      this.itemForm.controls.name.setValue(next.name ?? '');
      this.itemForm.controls.description.setValue(next.description ?? '');
      this.itemForm.controls.price.setValue(next.price ?? 0);
    });
  }

}
