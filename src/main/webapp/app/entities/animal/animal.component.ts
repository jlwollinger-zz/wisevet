import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAnimal } from 'app/shared/model/animal.model';
import { Principal } from 'app/core';
import { AnimalService } from './animal.service';

@Component({
    selector: 'jhi-animal',
    templateUrl: './animal.component.html'
})
export class AnimalComponent implements OnInit, OnDestroy {
    animals: IAnimal[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private animalService: AnimalService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.animalService.query().subscribe(
            (res: HttpResponse<IAnimal[]>) => {
                this.animals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAnimals();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAnimal) {
        return item.id;
    }

    registerChangeInAnimals() {
        this.eventSubscriber = this.eventManager.subscribe('animalListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
