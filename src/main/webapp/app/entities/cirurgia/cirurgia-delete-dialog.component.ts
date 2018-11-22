import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICirurgia } from 'app/shared/model/cirurgia.model';
import { CirurgiaService } from './cirurgia.service';

@Component({
    selector: 'jhi-cirurgia-delete-dialog',
    templateUrl: './cirurgia-delete-dialog.component.html'
})
export class CirurgiaDeleteDialogComponent {
    cirurgia: ICirurgia;

    constructor(private cirurgiaService: CirurgiaService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cirurgiaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cirurgiaListModification',
                content: 'Deleted an cirurgia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cirurgia-delete-popup',
    template: ''
})
export class CirurgiaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cirurgia }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CirurgiaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.cirurgia = cirurgia;
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
