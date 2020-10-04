import { Component, Input, OnInit } from '@angular/core';
import { ListadoDeAdmin } from './models/admin';
import { ListadoDeAdminInactivos } from './models/adminsInactivos';
import { AdminService } from './services/admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  admins: ListadoDeAdmin[] = [];
  adminsInactivos: ListadoDeAdminInactivos[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }



}
