import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEspecie } from 'app/shared/model/especie.model';
import { EspecieService } from './especie.service';

@Component({
    selector: 'jhi-especie-update',
    templateUrl: './especie-update.component.html'
})
export class EspecieUpdateComponent implements OnInit {
    especie: IEspecie;
    isSaving: boolean;

    constructor(private especieService: EspecieService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ especie }) => {
            this.especie = especie;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.especie.id !== undefined) {
            this.subscribeToSaveResponse(this.especieService.update(this.especie));
        } else {
            this.subscribeToSaveResponse(this.especieService.create(this.especie));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEspecie>>) {
        result.subscribe((res: HttpResponse<IEspecie>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
