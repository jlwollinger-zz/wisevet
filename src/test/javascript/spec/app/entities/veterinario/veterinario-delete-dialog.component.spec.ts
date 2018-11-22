/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WisevetTestModule } from '../../../test.module';
import { VeterinarioDeleteDialogComponent } from 'app/entities/veterinario/veterinario-delete-dialog.component';
import { VeterinarioService } from 'app/entities/veterinario/veterinario.service';

describe('Component Tests', () => {
    describe('Veterinario Management Delete Component', () => {
        let comp: VeterinarioDeleteDialogComponent;
        let fixture: ComponentFixture<VeterinarioDeleteDialogComponent>;
        let service: VeterinarioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [VeterinarioDeleteDialogComponent]
            })
                .overrideTemplate(VeterinarioDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VeterinarioDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VeterinarioService);
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
