import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WisevetEnderecoModule } from './endereco/endereco.module';
import { WisevetEspecieModule } from './especie/especie.module';
import { WisevetAnimalModule } from './animal/animal.module';
import { WisevetVacinaModule } from './vacina/vacina.module';
import { WisevetConsultaModule } from './consulta/consulta.module';
import { WisevetCirurgiaModule } from './cirurgia/cirurgia.module';
import { WisevetVacinaAplicadaModule } from './vacina-aplicada/vacina-aplicada.module';
import { WisevetVeterinarioModule } from './veterinario/veterinario.module';
import { WisevetDonoAnimalModule } from './dono-animal/dono-animal.module';
import { WisevetSolicitacaoVinculoModule } from './solicitacao-vinculo/solicitacao-vinculo.module';
import { WisevetPapelModule } from './papel/papel.module';
import { WisevetPermissaoModule } from './permissao/permissao.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        WisevetEnderecoModule,
        WisevetEspecieModule,
        WisevetAnimalModule,
        WisevetVacinaModule,
        WisevetConsultaModule,
        WisevetCirurgiaModule,
        WisevetVacinaAplicadaModule,
        WisevetVeterinarioModule,
        WisevetDonoAnimalModule,
        WisevetSolicitacaoVinculoModule,
        WisevetPapelModule,
        WisevetPermissaoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WisevetEntityModule {}
