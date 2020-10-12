import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { RegistroUsuarioService } from 'src/app/services/registro-usuario.service';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  @ViewChild(PerfilUsuarioComponent) list: PerfilUsuarioComponent;
  usuarioModificar: Usuario = null;
  listaUsuarios: Usuario[] = [];
  constructor(private registroService: RegistroUsuarioService) { }

  ngOnInit() {
    this.listarUsuarios()
    
  }

  listarUsuarios(): void{
    this.registroService.listaUsuarios().subscribe(x=>{
      this.listaUsuarios = x;
      console.log(this.listaUsuarios)
    })
  }
  modificarUsuario(usuario: Usuario): void {
    this.usuarioModificar = usuario;
    console.log(usuario.usuario_id);
    console.log(this.usuarioModificar);

  }
}
