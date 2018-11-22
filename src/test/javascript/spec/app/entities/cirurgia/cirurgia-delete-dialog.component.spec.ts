/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WisevetTestModule } from '../../../test.module';
import { CirurgiaDeleteDialogComponent } from 'app/entities/cirurgia/cirurgia-delete-dialog.component';
import { CirurgiaService } from 'app/entities/cirurgia/cirurgia.service';

describe('Component Tests', () => {
    describe('Cirurgia Management Delete Component', () => {
        let comp: CirurgiaDeleteDialogComponent;
        let fixture: ComponentFixture<CirurgiaDeleteDialogComponent>;
        let service: CirurgiaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [CirurgiaDeleteDialogComponent]
            })
                .overrideTemplate(CirurgiaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CirurgiaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CirurgiaService);
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
