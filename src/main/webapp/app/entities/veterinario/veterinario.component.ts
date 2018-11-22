import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVeterinario } from 'app/shared/model/veterinario.model';
import { Principal } from 'app/core';
import { VeterinarioService } from './veterinario.service';

@Component({
    selector: 'jhi-veterinario',
    templateUrl: './veterinario.component.html'
})
export class VeterinarioComponent implements OnInit, OnDestroy {
    veterinarios: IVeterinario[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private veterinarioService: VeterinarioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.veterinarioService.query().subscribe(
            (res: HttpResponse<IVeterinario[]>) => {
                this.veterinarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVeterinarios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVeterinario) {
        return item.id;
    }

    registerChangeInVeterinarios() {
        this.eventSubscriber = this.eventManager.subscribe('veterinarioListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
