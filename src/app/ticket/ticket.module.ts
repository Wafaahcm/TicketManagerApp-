import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
import { TicketListComponent } from '../ticket-list/ticket-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';


@NgModule({
  declarations: [
    TicketFormComponent,
    TicketListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HomeModule
  ]
})
export class TicketModule { }
