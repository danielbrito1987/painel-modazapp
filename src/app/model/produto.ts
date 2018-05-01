export class Produto{
    constructor(
        public IdProduto: number,
        public Descricao: string,
        public DescricaoCompleta: string,
        public IdLoja: number,
        public Tamanhos: string,
        public Valor: number,
        public EstoqueP: number,
        public EstoqueM: number,
        public EstoqueG: number,
        public EstoqueGG: number,
        public EstoqueXG: number,
        public EstoqueXGG: number,
        public Cores: string,
        public DataRegistro: Date,
        public Imagem: string,
        public ValorAtacado: number,
        public Slide1: string,
        public Slide2: string,
        public Slide3: string
    ) {}
}