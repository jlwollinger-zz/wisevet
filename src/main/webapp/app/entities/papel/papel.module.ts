import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WisevetSharedModule } from 'app/shared';
import {
    PapelComponent,
    PapelDetailComponent,
    PapelUpdateComponent,
    PapelDeletePopupComponent,
    PapelDeleteDialogComponent,
    papelRoute,
    papelPopupRoute
} from './';

const ENTITY_STATES = [...papelRoute, ...papelPopupRoute];

@NgModule({
    imports: [WisevetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PapelComponent, PapelDetailComponent, PapelUpdateComponent, PapelDeleteDialogComponent, PapelDeletePopupComponent],
    entryComponents: [PapelComponent, PapelUpdateComponent, PapelDeleteDialogComponent, PapelDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WisevetPapelModule {}
