export class Producto {
    producto_id: number;
    nombre: string;
    tipo_producto: string;
    codigo_producto: number;
    peso: number;
    stock: number;
    deleted: number;
    fecha_creacion: string;
    precio: number;
    nombre_imagen: string;
    imagen_url: string;

    constructor(item?: any) {
        this.producto_id = item?.producto_id || 0;
        this.nombre = item?.nombre || '';
        this.tipo_producto = item?.tipo_producto || '';
        this.codigo_producto = item?.codigo_producto || 0;
        this.peso = item?.peso || 0;
        this.stock = item?.stock || 0;
        this.deleted = item?.deleted || 0;
        this.fecha_creacion = item?.fecha_creacion || null;
        this.precio = item?.precio || 0;
        this.nombre_imagen = item?.nombre_imagen || '';
        this.imagen_url = item?.imagen_url || '';
    }
}
