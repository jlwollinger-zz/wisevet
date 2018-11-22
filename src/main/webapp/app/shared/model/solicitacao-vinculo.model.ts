import { Moment } from 'moment';

export const enum STATUSSOLICITACAOVINCULO {
    ENVIADO = 'ENVIADO',
    ACEITO = 'ACEITO',
    NEGADO = 'NEGADO'
}

export interface ISolicitacaoVinculo {
    id?: number;
    dataEnvio?: Moment;
    status?: STATUSSOLICITACAOVINCULO;
}

export class SolicitacaoVinculo implements ISolicitacaoVinculo {
    constructor(public id?: number, public dataEnvio?: Moment, public status?: STATUSSOLICITACAOVINCULO) {}
}
