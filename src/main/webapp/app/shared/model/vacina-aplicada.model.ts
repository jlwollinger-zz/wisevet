import { Moment } from 'moment';
import { IVacina } from 'app/shared/model//vacina.model';
import { IAnimal } from 'app/shared/model//animal.model';
import { IVeterinario } from 'app/shared/model//veterinario.model';

export interface IVacinaAplicada {
    id?: number;
    dataAplicacao?: Moment;
    doses?: number;
    observacao?: string;
    vacina?: IVacina;
    animal?: IAnimal;
    veterinario?: IVeterinario;
}

export class VacinaAplicada implements IVacinaAplicada {
    constructor(
        public id?: number,
        public dataAplicacao?: Moment,
        public doses?: number,
        public observacao?: string,
        public vacina?: IVacina,
        public animal?: IAnimal,
        public veterinario?: IVeterinario
    ) {}
}
