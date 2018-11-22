/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WisevetTestModule } from '../../../test.module';
import { VacinaAplicadaDeleteDialogComponent } from 'app/entities/vacina-aplicada/vacina-aplicada-delete-dialog.component';
import { VacinaAplicadaService } from 'app/entities/vacina-aplicada/vacina-aplicada.service';

describe('Component Tests', () => {
    describe('VacinaAplicada Management Delete Component', () => {
        let comp: VacinaAplicadaDeleteDialogComponent;
        let fixture: ComponentFixture<VacinaAplicadaDeleteDialogComponent>;
        let service: VacinaAplicadaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [VacinaAplicadaDeleteDialogComponent]
            })
                .overrideTemplate(VacinaAplicadaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VacinaAplicadaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VacinaAplicadaService);
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
