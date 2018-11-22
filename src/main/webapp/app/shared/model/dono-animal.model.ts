import { IAnimal } from 'app/shared/model//animal.model';
import { IEndereco } from 'app/shared/model//endereco.model';

export interface IDonoAnimal {
    id?: number;
    email?: string;
    login?: string;
    nome?: string;
    senha?: string;
    animal?: IAnimal;
    endereco?: IEndereco;
}

export class DonoAnimal implements IDonoAnimal {
    constructor(
        public id?: number,
        public email?: string,
        public login?: string,
        public nome?: string,
        public senha?: string,
        public animal?: IAnimal,
        public endereco?: IEndereco
    ) {}
}
