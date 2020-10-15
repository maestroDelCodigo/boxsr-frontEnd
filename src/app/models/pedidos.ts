export class Pedidos {
    // tslint:disable-next-line: variable-name
    pedido_id: number;
    // tslint:disable-next-line: variable-name
    estado_pago: string;
    // tslint:disable-next-line: variable-name
    forma_entrega: string;
    iva: number;
    // tslint:disable-next-line: variable-name
    total_pedido: number;
    // tslint:disable-next-line: variable-name
    estado_preparacion: string;
    fechaPedido: string;
    nombre: string;
    apellidos: string;
    cantidad: number;
    precio: number;

    constructor(item?: any) {
        this.estado_pago = item?.estado_pago || '';
        this.forma_entrega = item?.forma_entrega || '';
        this.iva = item?.iva || '';
        this.total_pedido = item?.total_pedido || '';
        this.estado_preparacion = item?.estado_preparacion || '';
        this.fechaPedido = item?.fecha_pedido || '';
        this.nombre = item?.nombre || '';
        this.apellidos =  item?.apellidos || '';
        this.cantidad = item?.cantidad || '';
        this.precio = item?.precio || '';
    }
}