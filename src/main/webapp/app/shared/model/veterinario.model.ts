import { IEndereco } from 'app/shared/model//endereco.model';
import { IVacinaAplicada } from 'app/shared/model//vacina-aplicada.model';
import { ICirurgia } from 'app/shared/model//cirurgia.model';
import { IConsulta } from 'app/shared/model//consulta.model';

export interface IVeterinario {
    id?: number;
    email?: string;
    login?: string;
    nome?: string;
    senha?: string;
    numeroRegistroCfmv?: number;
    numeroRegistroCrmv?: number;
    endereco?: IEndereco;
    vacinasAplicadas?: IVacinaAplicada[];
    cirurgias?: ICirurgia[];
    consultas?: IConsulta[];
}

export class Veterinario implements IVeterinario {
    constructor(
        public id?: number,
        public email?: string,
        public login?: string,
        public nome?: string,
        public senha?: string,
        public numeroRegistroCfmv?: number,
        public numeroRegistroCrmv?: number,
        public endereco?: IEndereco,
        public vacinasAplicadas?: IVacinaAplicada[],
        public cirurgias?: ICirurgia[],
        public consultas?: IConsulta[]
    ) {}
}
