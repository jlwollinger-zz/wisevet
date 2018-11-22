import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVacinaAplicada } from 'app/shared/model/vacina-aplicada.model';
import { VacinaAplicadaService } from './vacina-aplicada.service';

@Component({
    selector: 'jhi-vacina-aplicada-delete-dialog',
    templateUrl: './vacina-aplicada-delete-dialog.component.html'
})
export class VacinaAplicadaDeleteDialogComponent {
    vacinaAplicada: IVacinaAplicada;

    constructor(
        private vacinaAplicadaService: VacinaAplicadaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vacinaAplicadaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'vacinaAplicadaListModification',
                content: 'Deleted an vacinaAplicada'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vacina-aplicada-delete-popup',
    template: ''
})
export class VacinaAplicadaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vacinaAplicada }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VacinaAplicadaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.vacinaAplicada = vacinaAplicada;
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
