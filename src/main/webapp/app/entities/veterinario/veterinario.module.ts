import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WisevetSharedModule } from 'app/shared';
import {
    VeterinarioComponent,
    VeterinarioDetailComponent,
    VeterinarioUpdateComponent,
    VeterinarioDeletePopupComponent,
    VeterinarioDeleteDialogComponent,
    veterinarioRoute,
    veterinarioPopupRoute
} from './';

const ENTITY_STATES = [...veterinarioRoute, ...veterinarioPopupRoute];

@NgModule({
    imports: [WisevetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VeterinarioComponent,
        VeterinarioDetailComponent,
        VeterinarioUpdateComponent,
        VeterinarioDeleteDialogComponent,
        VeterinarioDeletePopupComponent
    ],
    entryComponents: [VeterinarioComponent, VeterinarioUpdateComponent, VeterinarioDeleteDialogComponent, VeterinarioDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WisevetVeterinarioModule {}
