import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IConsulta } from 'app/shared/model/consulta.model';
import { ConsultaService } from './consulta.service';
import { IAnimal } from 'app/shared/model/animal.model';
import { AnimalService } from 'app/entities/animal';
import { IVeterinario } from 'app/shared/model/veterinario.model';
import { VeterinarioService } from 'app/entities/veterinario';

@Component({
    selector: 'jhi-consulta-update',
    templateUrl: './consulta-update.component.html'
})
export class ConsultaUpdateComponent implements OnInit {
    consulta: IConsulta;
    isSaving: boolean;

    animals: IAnimal[];

    veterinarios: IVeterinario[];
    dataHora: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private consultaService: ConsultaService,
        private animalService: AnimalService,
        private veterinarioService: VeterinarioService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ consulta }) => {
            this.consulta = consulta;
            this.dataHora = this.consulta.dataHora != null ? this.consulta.dataHora.format(DATE_TIME_FORMAT) : null;
        });
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
        this.consulta.dataHora = this.dataHora != null ? moment(this.dataHora, DATE_TIME_FORMAT) : null;
        if (this.consulta.id !== undefined) {
            this.subscribeToSaveResponse(this.consultaService.update(this.consulta));
        } else {
            this.subscribeToSaveResponse(this.consultaService.create(this.consulta));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IConsulta>>) {
        result.subscribe((res: HttpResponse<IConsulta>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAnimalById(index: number, item: IAnimal) {
        return item.id;
    }

    trackVeterinarioById(index: number, item: IVeterinario) {
        return item.id;
    }
}
