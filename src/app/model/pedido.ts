export class Pedido{
    constructor(
        public IdPedido: number,
        public CodPedido: string,
        public TokenUsuario: string,
        public NomeCliente: string,
        public IdUsuario: number,
        public Contato: string,
        public Endereco: string,
        public Email: string,
        public IdLoja: number,
        public IdProduto: number,
        public ValorUnit: number,
        public QtdPedidoP: number,
        public QtdPedidoM: number,
        public QtdPedidoG: number,
        public QtdPedidoGG: number,
        public QtdPedidoXG: number,
        public QtdPedidoXGG: number,
        public ValorTotal: number,
        public DataRegistro: Date,
        public FormaPgto: string,
        public Status: string
    ){}
}