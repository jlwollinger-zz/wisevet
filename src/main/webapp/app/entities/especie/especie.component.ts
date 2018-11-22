import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEspecie } from 'app/shared/model/especie.model';
import { Principal } from 'app/core';
import { EspecieService } from './especie.service';

@Component({
    selector: 'jhi-especie',
    templateUrl: './especie.component.html'
})
export class EspecieComponent implements OnInit, OnDestroy {
    especies: IEspecie[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private especieService: EspecieService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.especieService.query().subscribe(
            (res: HttpResponse<IEspecie[]>) => {
                this.especies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEspecies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEspecie) {
        return item.id;
    }

    registerChangeInEspecies() {
        this.eventSubscriber = this.eventManager.subscribe('especieListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
