import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVacinaAplicada } from 'app/shared/model/vacina-aplicada.model';

@Component({
    selector: 'jhi-vacina-aplicada-detail',
    templateUrl: './vacina-aplicada-detail.component.html'
})
export class VacinaAplicadaDetailComponent implements OnInit {
    vacinaAplicada: IVacinaAplicada;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vacinaAplicada }) => {
            this.vacinaAplicada = vacinaAplicada;
        });
    }

    previousState() {
        window.history.back();
    }
}
