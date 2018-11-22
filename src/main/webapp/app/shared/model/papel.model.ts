export interface IPapel {
    id?: number;
    descricao?: string;
    nome?: string;
}

export class Papel implements IPapel {
    constructor(public id?: number, public descricao?: string, public nome?: string) {}
}
