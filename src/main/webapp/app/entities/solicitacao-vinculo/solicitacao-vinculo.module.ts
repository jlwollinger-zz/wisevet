import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WisevetSharedModule } from 'app/shared';
import {
    SolicitacaoVinculoComponent,
    SolicitacaoVinculoDetailComponent,
    SolicitacaoVinculoUpdateComponent,
    SolicitacaoVinculoDeletePopupComponent,
    SolicitacaoVinculoDeleteDialogComponent,
    solicitacaoVinculoRoute,
    solicitacaoVinculoPopupRoute
} from './';

const ENTITY_STATES = [...solicitacaoVinculoRoute, ...solicitacaoVinculoPopupRoute];

@NgModule({
    imports: [WisevetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SolicitacaoVinculoComponent,
        SolicitacaoVinculoDetailComponent,
        SolicitacaoVinculoUpdateComponent,
        SolicitacaoVinculoDeleteDialogComponent,
        SolicitacaoVinculoDeletePopupComponent
    ],
    entryComponents: [
        SolicitacaoVinculoComponent,
        SolicitacaoVinculoUpdateComponent,
        SolicitacaoVinculoDeleteDialogComponent,
        SolicitacaoVinculoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WisevetSolicitacaoVinculoModule {}
