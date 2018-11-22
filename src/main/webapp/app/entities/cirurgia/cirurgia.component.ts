import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICirurgia } from 'app/shared/model/cirurgia.model';
import { Principal } from 'app/core';
import { CirurgiaService } from './cirurgia.service';

@Component({
    selector: 'jhi-cirurgia',
    templateUrl: './cirurgia.component.html'
})
export class CirurgiaComponent implements OnInit, OnDestroy {
    cirurgias: ICirurgia[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cirurgiaService: CirurgiaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.cirurgiaService.query().subscribe(
            (res: HttpResponse<ICirurgia[]>) => {
                this.cirurgias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCirurgias();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICirurgia) {
        return item.id;
    }

    registerChangeInCirurgias() {
        this.eventSubscriber = this.eventManager.subscribe('cirurgiaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
