import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WisevetSharedModule } from 'app/shared';
import {
    EspecieComponent,
    EspecieDetailComponent,
    EspecieUpdateComponent,
    EspecieDeletePopupComponent,
    EspecieDeleteDialogComponent,
    especieRoute,
    especiePopupRoute
} from './';

const ENTITY_STATES = [...especieRoute, ...especiePopupRoute];

@NgModule({
    imports: [WisevetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EspecieComponent,
        EspecieDetailComponent,
        EspecieUpdateComponent,
        EspecieDeleteDialogComponent,
        EspecieDeletePopupComponent
    ],
    entryComponents: [EspecieComponent, EspecieUpdateComponent, EspecieDeleteDialogComponent, EspecieDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WisevetEspecieModule {}
