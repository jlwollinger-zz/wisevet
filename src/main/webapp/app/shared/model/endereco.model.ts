export interface IEndereco {
    id?: number;
    bairro?: string;
    cep?: number;
    cidade?: string;
    complemento?: string;
    estado?: string;
    rua?: string;
}

export class Endereco implements IEndereco {
    constructor(
        public id?: number,
        public bairro?: string,
        public cep?: number,
        public cidade?: string,
        public complemento?: string,
        public estado?: string,
        public rua?: string
    ) {}
}
