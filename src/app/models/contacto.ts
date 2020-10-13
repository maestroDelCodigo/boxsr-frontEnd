export class Contacto {
    nombre: string;
    fecha: string;
    mensaje: string;
    email: string;
    fecha_creacion: string;
    apellidos: any;

    constructor(item?: any) {
        this.nombre= item?.nombre || '';
        this.apellidos = item?.apellidos || '';
        this.fecha = item?.fecha || '';
        this.mensaje = item?.mensaje || '';
        this.email = item?.email || '';
        this.fecha_creacion = item?.fecha_creacion || '';
       
    }
}
