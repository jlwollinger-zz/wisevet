import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDonoAnimal } from 'app/shared/model/dono-animal.model';
import { Principal } from 'app/core';
import { DonoAnimalService } from './dono-animal.service';

@Component({
    selector: 'jhi-dono-animal',
    templateUrl: './dono-animal.component.html'
})
export class DonoAnimalComponent implements OnInit, OnDestroy {
    donoAnimals: IDonoAnimal[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private donoAnimalService: DonoAnimalService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.donoAnimalService.query().subscribe(
            (res: HttpResponse<IDonoAnimal[]>) => {
                this.donoAnimals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDonoAnimals();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDonoAnimal) {
        return item.id;
    }

    registerChangeInDonoAnimals() {
        this.eventSubscriber = this.eventManager.subscribe('donoAnimalListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
