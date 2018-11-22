import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPermissao } from 'app/shared/model/permissao.model';
import { Principal } from 'app/core';
import { PermissaoService } from './permissao.service';

@Component({
    selector: 'jhi-permissao',
    templateUrl: './permissao.component.html'
})
export class PermissaoComponent implements OnInit, OnDestroy {
    permissaos: IPermissao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private permissaoService: PermissaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.permissaoService.query().subscribe(
            (res: HttpResponse<IPermissao[]>) => {
                this.permissaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPermissaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPermissao) {
        return item.id;
    }

    registerChangeInPermissaos() {
        this.eventSubscriber = this.eventManager.subscribe('permissaoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
