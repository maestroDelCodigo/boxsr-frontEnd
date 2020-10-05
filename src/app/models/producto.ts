export class Producto {
    // tslint:disable-next-line:variable-name
    producto_id: number;
    nombre: string;
    // tslint:disable-next-line:variable-name
    tipo_producto: string;
    // tslint:disable-next-line:variable-name
    codigo_producto: string;
    peso: number;
    stock: number;
    deleted: boolean;
    fecha: boolean;
    precio: number;

    constructor(item?: any) {
        this.producto_id = item?.producto_id || '';
        this.nombre = item?.nombre || '';
        this.tipo_producto = item?.tipo_producto || '';
        this.codigo_producto = item?.codigo_producto || '';
        this.peso = item?.peso || '';
        this.stock = item?.stock || '';
        this.deleted = item?.deleted || false;
        this.fecha = item?.peso || '';
        this.precio = item?.precio || '';
    }
}
