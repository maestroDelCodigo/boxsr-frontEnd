export class Coleccion {
  coleccion_id: number;
  nombre: string;
  deleted: number;
  video_url: string;
  precio_rebajado: number;
  precio_original:number;
  productos_asociados?: number[];

  constructor(item?: any) {
      this.nombre = item?.nombre || '';
      this.deleted = item?.deleted || '';
      this.video_url = item?.video_url || '';
      this.precio_rebajado = item?.precio_rebajado || null;
      this.precio_original = item?.precio_original || null;
      this.productos_asociados = item?.productos_asociados || [];
  }
}
