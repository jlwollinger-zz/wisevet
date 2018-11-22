import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISolicitacaoVinculo } from 'app/shared/model/solicitacao-vinculo.model';

@Component({
    selector: 'jhi-solicitacao-vinculo-detail',
    templateUrl: './solicitacao-vinculo-detail.component.html'
})
export class SolicitacaoVinculoDetailComponent implements OnInit {
    solicitacaoVinculo: ISolicitacaoVinculo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ solicitacaoVinculo }) => {
            this.solicitacaoVinculo = solicitacaoVinculo;
        });
    }

    previousState() {
        window.history.back();
    }
}
