import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVeterinario } from 'app/shared/model/veterinario.model';

@Component({
    selector: 'jhi-veterinario-detail',
    templateUrl: './veterinario-detail.component.html'
})
export class VeterinarioDetailComponent implements OnInit {
    veterinario: IVeterinario;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ veterinario }) => {
            this.veterinario = veterinario;
        });
    }

    previousState() {
        window.history.back();
    }
}
