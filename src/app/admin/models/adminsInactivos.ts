export class ListadoDeAdminInactivos {
    nombre: string;
    apellidos: string;
    email: string;
    rol: string;
    deleted: boolean;

    constructor(item?: any) {
        this.nombre = item?.nombre || '';
        this.apellidos = item?.apellidos || '';
        this.rol = item?.rol || '';
        this.email = item?.email || '';
        this.deleted = item?.deleted || '';
    }
}
