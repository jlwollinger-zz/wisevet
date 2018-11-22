import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IVeterinario } from 'app/shared/model/veterinario.model';
import { VeterinarioService } from './veterinario.service';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from 'app/entities/endereco';

@Component({
    selector: 'jhi-veterinario-update',
    templateUrl: './veterinario-update.component.html'
})
export class VeterinarioUpdateComponent implements OnInit {
    veterinario: IVeterinario;
    isSaving: boolean;

    enderecos: IEndereco[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private veterinarioService: VeterinarioService,
        private enderecoService: EnderecoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ veterinario }) => {
            this.veterinario = veterinario;
        });
        this.enderecoService.query({ filter: 'veterinario-is-null' }).subscribe(
            (res: HttpResponse<IEndereco[]>) => {
                if (!this.veterinario.endereco || !this.veterinario.endereco.id) {
                    this.enderecos = res.body;
                } else {
                    this.enderecoService.find(this.veterinario.endereco.id).subscribe(
                        (subRes: HttpResponse<IEndereco>) => {
                            this.enderecos = [subRes.body].concat(res.body);
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
        if (this.veterinario.id !== undefined) {
            this.subscribeToSaveResponse(this.veterinarioService.update(this.veterinario));
        } else {
            this.subscribeToSaveResponse(this.veterinarioService.create(this.veterinario));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVeterinario>>) {
        result.subscribe((res: HttpResponse<IVeterinario>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEnderecoById(index: number, item: IEndereco) {
        return item.id;
    }
}
