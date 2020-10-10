export class Contacto {
    nombre: string;
    fecha: string;
    mensaje: string;
    email: string;
    fecha_creacion: string;
    apellidos: any;

    constructor(item?: any) {
        this.nombre= item?.nombre || '';
        this.fecha = item?.fecha || '';
        this.mensaje = item?.apellidos || '';
        this.email = item?.email || '';
        this.fecha_creacion = item?.fecha_creacion || '';
       
    }
}
