export class Producto {
    // tslint:disable-next-line:variable-name
    producto_id: number;
    nombre: string;
    // tslint:disable-next-line:variable-name
    tipo_producto: string;
    // tslint:disable-next-line:variable-name
    codigo_barras: number;
    peso: number;
    stock: number;
    deleted: number;
    // tslint:disable-next-line:variable-name
    fecha_creacion: string;
    precio: number;
    constructor(item?: any) {
        this.nombre = item?.nombre || '';
        this.tipo_producto = item?.tipo_producto || '';
        this.codigo_barras = item?.codigo_barras || 0;
        this.peso = item?.peso || 0;
        this.stock = item?.stock || 0;
        this.deleted = item?.deleted || 0;
        this.fecha_creacion = item?.fecha_creacion || null;
        this.precio = item?.precio || 0;
    }
}
