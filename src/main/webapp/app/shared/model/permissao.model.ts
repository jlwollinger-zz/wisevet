export interface IPermissao {
    id?: number;
    editar?: boolean;
    excluir?: boolean;
    nome?: string;
    recurso?: string;
    visualisar?: boolean;
}

export class Permissao implements IPermissao {
    constructor(
        public id?: number,
        public editar?: boolean,
        public excluir?: boolean,
        public nome?: string,
        public recurso?: string,
        public visualisar?: boolean
    ) {
        this.editar = this.editar || false;
        this.excluir = this.excluir || false;
        this.visualisar = this.visualisar || false;
    }
}
