export class Usuario {
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    fecha_nacimiento: string;
    token: string;
    rol: string;
  static fecha_nacimiento: any;

    constructor(item?: any) {
        this.nombre = item?.nombre || '';
        this.apellidos = item?.apellidos || '';
        this.email = item?.email || '';
        this.password = item?.password || '';
        this.fecha_nacimiento = item?.fecha_nacimiento || '';
        this.rol = item?.rol || '';
        this.token = item?.token || null;
    }
}
