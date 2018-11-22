/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WisevetTestModule } from '../../../test.module';
import { DonoAnimalDeleteDialogComponent } from 'app/entities/dono-animal/dono-animal-delete-dialog.component';
import { DonoAnimalService } from 'app/entities/dono-animal/dono-animal.service';

describe('Component Tests', () => {
    describe('DonoAnimal Management Delete Component', () => {
        let comp: DonoAnimalDeleteDialogComponent;
        let fixture: ComponentFixture<DonoAnimalDeleteDialogComponent>;
        let service: DonoAnimalService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [DonoAnimalDeleteDialogComponent]
            })
                .overrideTemplate(DonoAnimalDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DonoAnimalDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonoAnimalService);
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
