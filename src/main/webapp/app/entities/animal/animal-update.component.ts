import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IAnimal } from 'app/shared/model/animal.model';
import { AnimalService } from './animal.service';
import { IEspecie } from 'app/shared/model/especie.model';
import { EspecieService } from 'app/entities/especie';

@Component({
    selector: 'jhi-animal-update',
    templateUrl: './animal-update.component.html'
})
export class AnimalUpdateComponent implements OnInit {
    animal: IAnimal;
    isSaving: boolean;

    especies: IEspecie[];
    dataNascimento: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private animalService: AnimalService,
        private especieService: EspecieService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ animal }) => {
            this.animal = animal;
            this.dataNascimento = this.animal.dataNascimento != null ? this.animal.dataNascimento.format(DATE_TIME_FORMAT) : null;
        });
        this.especieService.query({ filter: 'animal-is-null' }).subscribe(
            (res: HttpResponse<IEspecie[]>) => {
                if (!this.animal.especie || !this.animal.especie.id) {
                    this.especies = res.body;
                } else {
                    this.especieService.find(this.animal.especie.id).subscribe(
                        (subRes: HttpResponse<IEspecie>) => {
                            this.especies = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.animal.dataNascimento = this.dataNascimento != null ? moment(this.dataNascimento, DATE_TIME_FORMAT) : null;
        if (this.animal.id !== undefined) {
            this.subscribeToSaveResponse(this.animalService.update(this.animal));
        } else {
            this.subscribeToSaveResponse(this.animalService.create(this.animal));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAnimal>>) {
        result.subscribe((res: HttpResponse<IAnimal>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEspecieById(index: number, item: IEspecie) {
        return item.id;
    }
}
