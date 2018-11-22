import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WisevetSharedModule } from 'app/shared';
import {
    CirurgiaComponent,
    CirurgiaDetailComponent,
    CirurgiaUpdateComponent,
    CirurgiaDeletePopupComponent,
    CirurgiaDeleteDialogComponent,
    cirurgiaRoute,
    cirurgiaPopupRoute
} from './';

const ENTITY_STATES = [...cirurgiaRoute, ...cirurgiaPopupRoute];

@NgModule({
    imports: [WisevetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CirurgiaComponent,
        CirurgiaDetailComponent,
        CirurgiaUpdateComponent,
        CirurgiaDeleteDialogComponent,
        CirurgiaDeletePopupComponent
    ],
    entryComponents: [CirurgiaComponent, CirurgiaUpdateComponent, CirurgiaDeleteDialogComponent, CirurgiaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WisevetCirurgiaModule {}
