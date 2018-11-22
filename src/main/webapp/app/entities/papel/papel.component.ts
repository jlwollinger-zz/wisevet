import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPapel } from 'app/shared/model/papel.model';
import { Principal } from 'app/core';
import { PapelService } from './papel.service';

@Component({
    selector: 'jhi-papel',
    templateUrl: './papel.component.html'
})
export class PapelComponent implements OnInit, OnDestroy {
    papels: IPapel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private papelService: PapelService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.papelService.query().subscribe(
            (res: HttpResponse<IPapel[]>) => {
                this.papels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPapels();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPapel) {
        return item.id;
    }

    registerChangeInPapels() {
        this.eventSubscriber = this.eventManager.subscribe('papelListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
