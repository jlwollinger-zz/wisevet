import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVacina } from 'app/shared/model/vacina.model';

@Component({
    selector: 'jhi-vacina-detail',
    templateUrl: './vacina-detail.component.html'
})
export class VacinaDetailComponent implements OnInit {
    vacina: IVacina;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vacina }) => {
            this.vacina = vacina;
        });
    }

    previousState() {
        window.history.back();
    }
}
