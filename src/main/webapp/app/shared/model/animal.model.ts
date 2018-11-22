import { Moment } from 'moment';
import { IEspecie } from 'app/shared/model//especie.model';
import { IVacinaAplicada } from 'app/shared/model//vacina-aplicada.model';
import { ICirurgia } from 'app/shared/model//cirurgia.model';
import { IConsulta } from 'app/shared/model//consulta.model';

export const enum Tamanho {
    PEQUENO = 'PEQUENO',
    MEDIO = 'MEDIO',
    GRANDE = 'GRANDE'
}

export interface IAnimal {
    id?: number;
    corPele?: string;
    dataNascimento?: Moment;
    nome?: string;
    observacoes?: string;
    tamanho?: Tamanho;
    especie?: IEspecie;
    vacinasAplicadas?: IVacinaAplicada[];
    cirurgias?: ICirurgia[];
    consultas?: IConsulta[];
}

export class Animal implements IAnimal {
    constructor(
        public id?: number,
        public corPele?: string,
        public dataNascimento?: Moment,
        public nome?: string,
        public observacoes?: string,
        public tamanho?: Tamanho,
        public especie?: IEspecie,
        public vacinasAplicadas?: IVacinaAplicada[],
        public cirurgias?: ICirurgia[],
        public consultas?: IConsulta[]
    ) {}
}
