import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDonoAnimal } from 'app/shared/model/dono-animal.model';
import { DonoAnimalService } from './dono-animal.service';
import { IAnimal } from 'app/shared/model/animal.model';
import { AnimalService } from 'app/entities/animal';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from 'app/entities/endereco';

@Component({
    selector: 'jhi-dono-animal-update',
    templateUrl: './dono-animal-update.component.html'
})
export class DonoAnimalUpdateComponent implements OnInit {
    donoAnimal: IDonoAnimal;
    isSaving: boolean;

    animals: IAnimal[];

    enderecos: IEndereco[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private donoAnimalService: DonoAnimalService,
        private animalService: AnimalService,
        private enderecoService: EnderecoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ donoAnimal }) => {
            this.donoAnimal = donoAnimal;
        });
        this.animalService.query({ filter: 'donoanimal-is-null' }).subscribe(
            (res: HttpResponse<IAnimal[]>) => {
                if (!this.donoAnimal.animal || !this.donoAnimal.animal.id) {
                    this.animals = res.body;
                } else {
                    this.animalService.find(this.donoAnimal.animal.id).subscribe(
                        (subRes: HttpResponse<IAnimal>) => {
                            this.animals = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.enderecoService.query({ filter: 'donoanimal-is-null' }).subscribe(
            (res: HttpResponse<IEndereco[]>) => {
                if (!this.donoAnimal.endereco || !this.donoAnimal.endereco.id) {
                    this.enderecos = res.body;
                } else {
                    this.enderecoService.find(this.donoAnimal.endereco.id).subscribe(
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
        if (this.donoAnimal.id !== undefined) {
            this.subscribeToSaveResponse(this.donoAnimalService.update(this.donoAnimal));
        } else {
            this.subscribeToSaveResponse(this.donoAnimalService.create(this.donoAnimal));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDonoAnimal>>) {
        result.subscribe((res: HttpResponse<IDonoAnimal>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEnderecoById(index: number, item: IEndereco) {
        return item.id;
    }
}
