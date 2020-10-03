export class ListadoDeAdmin {
    nombre: string;
    apellidos: string;
    email: string;
    rol: string;

    constructor(item?: any) {
        this.nombre = item?.nombre || '';
        this.apellidos = item?.apellidos || '';
        this.rol = item?.rol || '';
        this.email = item?.email || '';
    }
}
