/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WisevetTestModule } from '../../../test.module';
import { SolicitacaoVinculoDeleteDialogComponent } from 'app/entities/solicitacao-vinculo/solicitacao-vinculo-delete-dialog.component';
import { SolicitacaoVinculoService } from 'app/entities/solicitacao-vinculo/solicitacao-vinculo.service';

describe('Component Tests', () => {
    describe('SolicitacaoVinculo Management Delete Component', () => {
        let comp: SolicitacaoVinculoDeleteDialogComponent;
        let fixture: ComponentFixture<SolicitacaoVinculoDeleteDialogComponent>;
        let service: SolicitacaoVinculoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [SolicitacaoVinculoDeleteDialogComponent]
            })
                .overrideTemplate(SolicitacaoVinculoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SolicitacaoVinculoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolicitacaoVinculoService);
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
