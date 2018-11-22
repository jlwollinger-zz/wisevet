import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WisevetSharedModule } from 'app/shared';
import {
    AnimalComponent,
    AnimalDetailComponent,
    AnimalUpdateComponent,
    AnimalDeletePopupComponent,
    AnimalDeleteDialogComponent,
    animalRoute,
    animalPopupRoute
} from './';

const ENTITY_STATES = [...animalRoute, ...animalPopupRoute];

@NgModule({
    imports: [WisevetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AnimalComponent, AnimalDetailComponent, AnimalUpdateComponent, AnimalDeleteDialogComponent, AnimalDeletePopupComponent],
    entryComponents: [AnimalComponent, AnimalUpdateComponent, AnimalDeleteDialogComponent, AnimalDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WisevetAnimalModule {}
