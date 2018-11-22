import { Moment } from 'moment';
import { IAnimal } from 'app/shared/model//animal.model';
import { IVeterinario } from 'app/shared/model//veterinario.model';

export interface ICirurgia {
    id?: number;
    dataHora?: Moment;
    nomeProcedimento?: string;
    observacoes?: string;
    animal?: IAnimal;
    veterinario?: IVeterinario;
}

export class Cirurgia implements ICirurgia {
    constructor(
        public id?: number,
        public dataHora?: Moment,
        public nomeProcedimento?: string,
        public observacoes?: string,
        public animal?: IAnimal,
        public veterinario?: IVeterinario
    ) {}
}
