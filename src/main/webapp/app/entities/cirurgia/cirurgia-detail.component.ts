import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICirurgia } from 'app/shared/model/cirurgia.model';

@Component({
    selector: 'jhi-cirurgia-detail',
    templateUrl: './cirurgia-detail.component.html'
})
export class CirurgiaDetailComponent implements OnInit {
    cirurgia: ICirurgia;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cirurgia }) => {
            this.cirurgia = cirurgia;
        });
    }

    previousState() {
        window.history.back();
    }
}
