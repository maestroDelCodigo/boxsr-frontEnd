export class Usuario {
  // tslint:disable-next-line:variable-name
  usuario_id: string;
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  // tslint:disable-next-line:variable-name
  fecha_nacimiento: string;
  direccion: string;
  poblacion: string;
  provincia: string;
  // tslint:disable-next-line:variable-name
  codigo_postal: number;
  token: string;
  rol: string;

  constructor(item?: any) {
    this.nombre = item?.nombre || '';
    this.apellidos = item?.apellidos || '';
    this.email = item?.email || '';
    this.password = item?.password || '';
    this.direccion = item?.direccion || '';
    this.fecha_nacimiento = item?.fecha_nacimiento || '';
    this.poblacion = item?.poblacion || '';
    this.provincia = item?.provincia || '';
    this.codigo_postal = item?.codigo_postal || '';
    this.rol = item?.rol || '';
    this.token = item?.token || null;
  }
}
