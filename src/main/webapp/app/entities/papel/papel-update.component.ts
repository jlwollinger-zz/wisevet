import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPapel } from 'app/shared/model/papel.model';
import { PapelService } from './papel.service';

@Component({
    selector: 'jhi-papel-update',
    templateUrl: './papel-update.component.html'
})
export class PapelUpdateComponent implements OnInit {
    papel: IPapel;
    isSaving: boolean;

    constructor(private papelService: PapelService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ papel }) => {
            this.papel = papel;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.papel.id !== undefined) {
            this.subscribeToSaveResponse(this.papelService.update(this.papel));
        } else {
            this.subscribeToSaveResponse(this.papelService.create(this.papel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPapel>>) {
        result.subscribe((res: HttpResponse<IPapel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
