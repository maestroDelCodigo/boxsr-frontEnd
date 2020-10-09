export class Usuario {
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    fecha_nacimiento: string;
    direccion: string;
    poblacion: string;
    codigoPostal: number;
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
        this.codigoPostal = item?.codigoPostal || '';
        this.rol = item?.rol || '';
        this.token = item?.token || null;
    }
}
