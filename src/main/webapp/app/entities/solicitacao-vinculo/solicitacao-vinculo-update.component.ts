import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISolicitacaoVinculo } from 'app/shared/model/solicitacao-vinculo.model';
import { SolicitacaoVinculoService } from './solicitacao-vinculo.service';

@Component({
    selector: 'jhi-solicitacao-vinculo-update',
    templateUrl: './solicitacao-vinculo-update.component.html'
})
export class SolicitacaoVinculoUpdateComponent implements OnInit {
    solicitacaoVinculo: ISolicitacaoVinculo;
    isSaving: boolean;
    dataEnvio: string;

    constructor(private solicitacaoVinculoService: SolicitacaoVinculoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ solicitacaoVinculo }) => {
            this.solicitacaoVinculo = solicitacaoVinculo;
            this.dataEnvio = this.solicitacaoVinculo.dataEnvio != null ? this.solicitacaoVinculo.dataEnvio.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.solicitacaoVinculo.dataEnvio = this.dataEnvio != null ? moment(this.dataEnvio, DATE_TIME_FORMAT) : null;
        if (this.solicitacaoVinculo.id !== undefined) {
            this.subscribeToSaveResponse(this.solicitacaoVinculoService.update(this.solicitacaoVinculo));
        } else {
            this.subscribeToSaveResponse(this.solicitacaoVinculoService.create(this.solicitacaoVinculo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISolicitacaoVinculo>>) {
        result.subscribe((res: HttpResponse<ISolicitacaoVinculo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
