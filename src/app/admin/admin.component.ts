import { Component, Input, OnInit } from '@angular/core';
import { ListadoDeAdmin } from './models/admin';
import { AdminService } from './services/admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  admins: ListadoDeAdmin[] = [];
  listadoDeAdmin: string;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.listarAdmin();
  }

  listarAdmin(): void {
    this.adminService.listaAdmin().subscribe(x => {
      this.listadoDeAdmin = x;
      console.log(this.listadoDeAdmin);
  });

}


}
