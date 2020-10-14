

export class Producto {
  // tslint:disable-next-line:variable-name
  producto_id: number;
  nombre: string;
  // tslint:disable-next-line:variable-name
  tipo_producto: number;
  // tslint:disable-next-line:variable-name
  codigo_producto: number;
  peso: number;
  stock: number;
  deleted: number;
  // tslint:disable-next-line:variable-name
  fecha_creacion: string;
  precio: number;
  // tslint:disable-next-line:variable-name
  nombre_imagen: string;
  // tslint:disable-next-line:variable-name
  imagen_url: string;

  descripcion: string;
// tslint:disable-next-line:variable-name
  descripcion_resumen: string;
  // tslint:disable-next-line:variable-name
  descripcion_sirve: string;
  // tslint:disable-next-line:variable-name
  descripcion_usa: string;
  // tslint:disable-next-line:variable-name
  descripcion_ingredientes: string;

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
      this.descripcion = item?.descripcion || '';
      this.descripcion_resumen = item?.descripcion_resumen || '';
      this.descripcion_sirve = item?.descripcion_sirve || '';
      this.descripcion_usa = item?.descripcion_usa || '';
      this.descripcion_ingredientes = item?.descripcion_ingredientes || '';
  }
}
