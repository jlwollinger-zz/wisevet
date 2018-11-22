import { Moment } from 'moment';
import { IAnimal } from 'app/shared/model//animal.model';
import { IVeterinario } from 'app/shared/model//veterinario.model';

export interface IConsulta {
    id?: number;
    dataHora?: Moment;
    descricao?: string;
    observacoes?: string;
    realizada?: boolean;
    animal?: IAnimal;
    veterinario?: IVeterinario;
}

export class Consulta implements IConsulta {
    constructor(
        public id?: number,
        public dataHora?: Moment,
        public descricao?: string,
        public observacoes?: string,
        public realizada?: boolean,
        public animal?: IAnimal,
        public veterinario?: IVeterinario
    ) {
        this.realizada = this.realizada || false;
    }
}
