import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guards/auth/auth.guard';
import {NoAuthGuard} from './guards/no-auth/no-auth.guard';
import {HomeLayoutComponent} from './home-layout/home-layout.component';
import {ItemsComponent} from './components/items/items.component';
import {AddItemComponent} from './components/add-item/add-item.component';
import {SalesComponent} from './components/sales/sales.component';
import {StockComponent} from './components/stock/stock.component';
import {ReportsComponent} from './components/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'items'
      },
      {
        path: 'items',
        component: ItemsComponent
      },
      {
        path: 'items/add',
        component: AddItemComponent
      },
      {
        path: 'sales',
        component: SalesComponent
      },
      {
        path: 'stocks',
        component: StockComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
