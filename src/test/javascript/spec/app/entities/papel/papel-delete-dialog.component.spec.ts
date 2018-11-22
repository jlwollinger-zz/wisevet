/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WisevetTestModule } from '../../../test.module';
import { PapelDeleteDialogComponent } from 'app/entities/papel/papel-delete-dialog.component';
import { PapelService } from 'app/entities/papel/papel.service';

describe('Component Tests', () => {
    describe('Papel Management Delete Component', () => {
        let comp: PapelDeleteDialogComponent;
        let fixture: ComponentFixture<PapelDeleteDialogComponent>;
        let service: PapelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [PapelDeleteDialogComponent]
            })
                .overrideTemplate(PapelDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PapelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PapelService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
