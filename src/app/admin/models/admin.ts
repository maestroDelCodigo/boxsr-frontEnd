export class Admin {
    usuario_id: number;
    nombre: string;
    apellidos: string;
    email: string;
    rol: string;
    deleted: boolean;

    constructor(item?: any) {
        this.usuario_id = item?.usuario_id || '';
        this.nombre = item?.nombre || '';
        this.apellidos = item?.apellidos || '';
        this.rol = item?.rol || '';
        this.email = item?.email || '';
        this.deleted = item?.deleted || '';
    }
}
