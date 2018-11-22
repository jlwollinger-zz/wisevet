import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPapel } from 'app/shared/model/papel.model';

@Component({
    selector: 'jhi-papel-detail',
    templateUrl: './papel-detail.component.html'
})
export class PapelDetailComponent implements OnInit {
    papel: IPapel;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ papel }) => {
            this.papel = papel;
        });
    }

    previousState() {
        window.history.back();
    }
}
