import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ItemService} from '../../services/item/item.service';
import {Item} from '../../models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  itemForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private itemService: ItemService, private router: Router) {
  }

  ngOnInit(): void {
  }

  saveItem(value: any): void {
    const item = value as Item;
    this.itemService.saveItem(item).subscribe(next => {
      console.log(next);
      this.router.navigate(['/items']).finally();
    });
  }

}
