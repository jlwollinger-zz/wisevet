import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDonoAnimal } from 'app/shared/model/dono-animal.model';

@Component({
    selector: 'jhi-dono-animal-detail',
    templateUrl: './dono-animal-detail.component.html'
})
export class DonoAnimalDetailComponent implements OnInit {
    donoAnimal: IDonoAnimal;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ donoAnimal }) => {
            this.donoAnimal = donoAnimal;
        });
    }

    previousState() {
        window.history.back();
    }
}
