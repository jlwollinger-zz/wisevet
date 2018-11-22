import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDonoAnimal } from 'app/shared/model/dono-animal.model';
import { DonoAnimalService } from './dono-animal.service';

@Component({
    selector: 'jhi-dono-animal-delete-dialog',
    templateUrl: './dono-animal-delete-dialog.component.html'
})
export class DonoAnimalDeleteDialogComponent {
    donoAnimal: IDonoAnimal;

    constructor(private donoAnimalService: DonoAnimalService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.donoAnimalService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'donoAnimalListModification',
                content: 'Deleted an donoAnimal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dono-animal-delete-popup',
    template: ''
})
export class DonoAnimalDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ donoAnimal }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DonoAnimalDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.donoAnimal = donoAnimal;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
