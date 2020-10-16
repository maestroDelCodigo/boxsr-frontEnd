export class PedidoDetalle {
    // tslint:disable-next-line: variable-name
     nombre: string;
    // tslint:disable-next-line: variable-name
    apellidos: string;
    // tslint:disable-next-line: variable-name
    email: string;
    // tslint:disable-next-line: variable-name
    fecha_creacion: number;
    // tslint:disable-next-line: variable-name
    registrado: string;
    // tslint:disable-next-line: variable-name
    pedido_id: number;
    // tslint:disable-next-line: variable-name
    estado_pago: string;
    // tslint:disable-next-line: variable-name
    estado_pedido: string;
    notas: string;
    // tslint:disable-next-line: variable-name
    fecha_pedido: number;
    iva: number;
    // tslint:disable-next-line: variable-name
    total_pedido: number;
    nombre_producto: string;


    constructor(item?: any) {
        this.nombre = item?.nombre || '';
        this.apellidos = item?.apellidos || '';
        this.email = item?.email || '';
        this.fecha_creacion = item?.fecha_creacion || '';
        this.registrado = item?.registrado || '';
        this.pedido_id = item?.pedido_id || '';
        this.estado_pago = item?.estado_pago || '';
        this.estado_pedido= item?.estado_pedido || '';
        this.apellidos=  item?.apellidos || '';
        this.notas= item?.notas || '';
        this.fecha_pedido = item?.fecha_pedido || '';
        this.iva=item?.iva || '';
        this.total_pedido=item?.total_pedido || '';
        this.nombre_producto=item?.nombre_producto || '';
    }
}
