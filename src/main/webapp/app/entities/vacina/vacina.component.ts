import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVacina } from 'app/shared/model/vacina.model';
import { Principal } from 'app/core';
import { VacinaService } from './vacina.service';

@Component({
    selector: 'jhi-vacina',
    templateUrl: './vacina.component.html'
})
export class VacinaComponent implements OnInit, OnDestroy {
    vacinas: IVacina[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private vacinaService: VacinaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.vacinaService.query().subscribe(
            (res: HttpResponse<IVacina[]>) => {
                this.vacinas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVacinas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVacina) {
        return item.id;
    }

    registerChangeInVacinas() {
        this.eventSubscriber = this.eventManager.subscribe('vacinaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
