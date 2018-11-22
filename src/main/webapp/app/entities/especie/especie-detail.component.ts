import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEspecie } from 'app/shared/model/especie.model';

@Component({
    selector: 'jhi-especie-detail',
    templateUrl: './especie-detail.component.html'
})
export class EspecieDetailComponent implements OnInit {
    especie: IEspecie;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ especie }) => {
            this.especie = especie;
        });
    }

    previousState() {
        window.history.back();
    }
}
