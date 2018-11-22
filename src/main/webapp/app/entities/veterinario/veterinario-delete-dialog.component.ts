import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVeterinario } from 'app/shared/model/veterinario.model';
import { VeterinarioService } from './veterinario.service';

@Component({
    selector: 'jhi-veterinario-delete-dialog',
    templateUrl: './veterinario-delete-dialog.component.html'
})
export class VeterinarioDeleteDialogComponent {
    veterinario: IVeterinario;

    constructor(
        private veterinarioService: VeterinarioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.veterinarioService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'veterinarioListModification',
                content: 'Deleted an veterinario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-veterinario-delete-popup',
    template: ''
})
export class VeterinarioDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ veterinario }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VeterinarioDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.veterinario = veterinario;
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
