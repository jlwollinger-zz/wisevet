import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISolicitacaoVinculo } from 'app/shared/model/solicitacao-vinculo.model';
import { Principal } from 'app/core';
import { SolicitacaoVinculoService } from './solicitacao-vinculo.service';

@Component({
    selector: 'jhi-solicitacao-vinculo',
    templateUrl: './solicitacao-vinculo.component.html'
})
export class SolicitacaoVinculoComponent implements OnInit, OnDestroy {
    solicitacaoVinculos: ISolicitacaoVinculo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private solicitacaoVinculoService: SolicitacaoVinculoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.solicitacaoVinculoService.query().subscribe(
            (res: HttpResponse<ISolicitacaoVinculo[]>) => {
                this.solicitacaoVinculos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSolicitacaoVinculos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISolicitacaoVinculo) {
        return item.id;
    }

    registerChangeInSolicitacaoVinculos() {
        this.eventSubscriber = this.eventManager.subscribe('solicitacaoVinculoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
