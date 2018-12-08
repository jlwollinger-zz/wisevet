

export class Consulta {
    constructor(
        public estabelecimento?: string,
        public descricao?: string,
        public observacoes?: string,
        public veterinario?: string,
        public dataHora?: Date
    ){}

}