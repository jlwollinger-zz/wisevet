/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WisevetTestModule } from '../../../test.module';
import { PapelUpdateComponent } from 'app/entities/papel/papel-update.component';
import { PapelService } from 'app/entities/papel/papel.service';
import { Papel } from 'app/shared/model/papel.model';

describe('Component Tests', () => {
    describe('Papel Management Update Component', () => {
        let comp: PapelUpdateComponent;
        let fixture: ComponentFixture<PapelUpdateComponent>;
        let service: PapelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [PapelUpdateComponent]
            })
                .overrideTemplate(PapelUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PapelUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PapelService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Papel(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.papel = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Papel();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.papel = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
