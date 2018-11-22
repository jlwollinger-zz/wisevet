export interface IEspecie {
    id?: number;
    nome?: string;
    nomeCientifico?: string;
}

export class Especie implements IEspecie {
    constructor(public id?: number, public nome?: string, public nomeCientifico?: string) {}
}
