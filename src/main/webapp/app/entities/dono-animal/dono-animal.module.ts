import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WisevetSharedModule } from 'app/shared';
import {
    DonoAnimalComponent,
    DonoAnimalDetailComponent,
    DonoAnimalUpdateComponent,
    DonoAnimalDeletePopupComponent,
    DonoAnimalDeleteDialogComponent,
    donoAnimalRoute,
    donoAnimalPopupRoute
} from './';

const ENTITY_STATES = [...donoAnimalRoute, ...donoAnimalPopupRoute];

@NgModule({
    imports: [WisevetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DonoAnimalComponent,
        DonoAnimalDetailComponent,
        DonoAnimalUpdateComponent,
        DonoAnimalDeleteDialogComponent,
        DonoAnimalDeletePopupComponent
    ],
    entryComponents: [DonoAnimalComponent, DonoAnimalUpdateComponent, DonoAnimalDeleteDialogComponent, DonoAnimalDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WisevetDonoAnimalModule {}
