export class Usuario {
    nombre: string;
    apellidos: string;
    token: string;
    rol: string;

    constructor(item?: any) {
        this.nombre = item?.nombre || '';
        this.apellidos = item?.apellidos || '';
        this.rol = item?.rol || '';
        this.token = item?.token || null;
    }
}
