export class Contacto {
    sugerencias_id: number;
    fecha: string;
    mensaje: string;
    usuario_id:number;

    constructor(item?: any) {
        this.sugerencias_id = item?.sugerencias_id || '';
        this.fecha = item?.fecha || '';
        this.mensaje = item?.apellidos || '';
        this.usuario_id = item?.usuario_id || '';
    }
}
