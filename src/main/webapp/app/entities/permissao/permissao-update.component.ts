import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPermissao } from 'app/shared/model/permissao.model';
import { PermissaoService } from './permissao.service';

@Component({
    selector: 'jhi-permissao-update',
    templateUrl: './permissao-update.component.html'
})
export class PermissaoUpdateComponent implements OnInit {
    permissao: IPermissao;
    isSaving: boolean;

    constructor(private permissaoService: PermissaoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ permissao }) => {
            this.permissao = permissao;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.permissao.id !== undefined) {
            this.subscribeToSaveResponse(this.permissaoService.update(this.permissao));
        } else {
            this.subscribeToSaveResponse(this.permissaoService.create(this.permissao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPermissao>>) {
        result.subscribe((res: HttpResponse<IPermissao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
