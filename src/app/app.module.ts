import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeLayoutComponent} from './home-layout/home-layout.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ToolbarComponent} from './navigation/toolbar/toolbar.component';
import {SidebarComponent} from './navigation/sidebar/sidebar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ItemsComponent } from './components/items/items.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { StockComponent } from './components/stock/stock.component';
import { SalesComponent } from './components/sales/sales.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SalaryComponent } from './components/salary/salary.component';
import { AddSalaryComponent } from './components/add-salary/add-salary.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeLayoutComponent,
    ToolbarComponent,
    SidebarComponent,
    ItemsComponent,
    AddItemComponent,
    StockComponent,
    SalesComponent,
    ReportsComponent,
    SalaryComponent,
    AddSalaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
