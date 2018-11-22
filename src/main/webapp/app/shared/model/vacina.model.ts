import { IVacinaAplicada } from 'app/shared/model//vacina-aplicada.model';

export interface IVacina {
    id?: number;
    nome?: string;
    contraIndicacoes?: string;
    descricao?: string;
    frequenciaMesAplicacao?: number;
    vacinasAplicadas?: IVacinaAplicada[];
}

export class Vacina implements IVacina {
    constructor(
        public id?: number,
        public nome?: string,
        public contraIndicacoes?: string,
        public descricao?: string,
        public frequenciaMesAplicacao?: number,
        public vacinasAplicadas?: IVacinaAplicada[]
    ) {}
}
