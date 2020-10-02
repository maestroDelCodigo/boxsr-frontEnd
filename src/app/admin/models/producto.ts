export class Producto {
    nombre: string;
    tipo_producto: string;
    codigo_producto: number;
    peso: number;
    stock: number;
    deleted: number;
    fecha_creacion: string;
    precio: number;

    constructor(item?: any) {
        this.nombre = item?.nombre || '';
        this.tipo_producto = item?.tipo_producto || '';
        this.codigo_producto = item?.codigo_producto || 0;
        this.peso = item?.peso || 0;
        this.stock = item?.stock || 0;
        this.deleted = item?.deleted || 0;
        this.fecha_creacion = item?.fecha_creacion || null;
        this.precio = item?.precio || 0;
    }
}
