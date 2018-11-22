import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WisevetSharedModule } from 'app/shared';
import {
    VacinaAplicadaComponent,
    VacinaAplicadaDetailComponent,
    VacinaAplicadaUpdateComponent,
    VacinaAplicadaDeletePopupComponent,
    VacinaAplicadaDeleteDialogComponent,
    vacinaAplicadaRoute,
    vacinaAplicadaPopupRoute
} from './';

const ENTITY_STATES = [...vacinaAplicadaRoute, ...vacinaAplicadaPopupRoute];

@NgModule({
    imports: [WisevetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VacinaAplicadaComponent,
        VacinaAplicadaDetailComponent,
        VacinaAplicadaUpdateComponent,
        VacinaAplicadaDeleteDialogComponent,
        VacinaAplicadaDeletePopupComponent
    ],
    entryComponents: [
        VacinaAplicadaComponent,
        VacinaAplicadaUpdateComponent,
        VacinaAplicadaDeleteDialogComponent,
        VacinaAplicadaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WisevetVacinaAplicadaModule {}
