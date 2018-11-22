import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IVacina } from 'app/shared/model/vacina.model';
import { VacinaService } from './vacina.service';

@Component({
    selector: 'jhi-vacina-update',
    templateUrl: './vacina-update.component.html'
})
export class VacinaUpdateComponent implements OnInit {
    vacina: IVacina;
    isSaving: boolean;

    constructor(private vacinaService: VacinaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vacina }) => {
            this.vacina = vacina;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.vacina.id !== undefined) {
            this.subscribeToSaveResponse(this.vacinaService.update(this.vacina));
        } else {
            this.subscribeToSaveResponse(this.vacinaService.create(this.vacina));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVacina>>) {
        result.subscribe((res: HttpResponse<IVacina>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
