import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IVacinaAplicada } from 'app/shared/model/vacina-aplicada.model';
import { VacinaAplicadaService } from './vacina-aplicada.service';
import { IVacina } from 'app/shared/model/vacina.model';
import { VacinaService } from 'app/entities/vacina';
import { IAnimal } from 'app/shared/model/animal.model';
import { AnimalService } from 'app/entities/animal';
import { IVeterinario } from 'app/shared/model/veterinario.model';
import { VeterinarioService } from 'app/entities/veterinario';

@Component({
    selector: 'jhi-vacina-aplicada-update',
    templateUrl: './vacina-aplicada-update.component.html'
})
export class VacinaAplicadaUpdateComponent implements OnInit {
    vacinaAplicada: IVacinaAplicada;
    isSaving: boolean;

    vacinas: IVacina[];

    animals: IAnimal[];

    veterinarios: IVeterinario[];
    dataAplicacao: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private vacinaAplicadaService: VacinaAplicadaService,
        private vacinaService: VacinaService,
        private animalService: AnimalService,
        private veterinarioService: VeterinarioService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vacinaAplicada }) => {
            this.vacinaAplicada = vacinaAplicada;
            this.dataAplicacao =
                this.vacinaAplicada.dataAplicacao != null ? this.vacinaAplicada.dataAplicacao.format(DATE_TIME_FORMAT) : null;
        });
        this.vacinaService.query().subscribe(
            (res: HttpResponse<IVacina[]>) => {
                this.vacinas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.animalService.query().subscribe(
            (res: HttpResponse<IAnimal[]>) => {
                this.animals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.veterinarioService.query().subscribe(
            (res: HttpResponse<IVeterinario[]>) => {
                this.veterinarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.vacinaAplicada.dataAplicacao = this.dataAplicacao != null ? moment(this.dataAplicacao, DATE_TIME_FORMAT) : null;
        if (this.vacinaAplicada.id !== undefined) {
            this.subscribeToSaveResponse(this.vacinaAplicadaService.update(this.vacinaAplicada));
        } else {
            this.subscribeToSaveResponse(this.vacinaAplicadaService.create(this.vacinaAplicada));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVacinaAplicada>>) {
        result.subscribe((res: HttpResponse<IVacinaAplicada>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackVacinaById(index: number, item: IVacina) {
        return item.id;
    }

    trackAnimalById(index: number, item: IAnimal) {
        return item.id;
    }

    trackVeterinarioById(index: number, item: IVeterinario) {
        return item.id;
    }
}
