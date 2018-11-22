/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WisevetTestModule } from '../../../test.module';
import { CirurgiaUpdateComponent } from 'app/entities/cirurgia/cirurgia-update.component';
import { CirurgiaService } from 'app/entities/cirurgia/cirurgia.service';
import { Cirurgia } from 'app/shared/model/cirurgia.model';

describe('Component Tests', () => {
    describe('Cirurgia Management Update Component', () => {
        let comp: CirurgiaUpdateComponent;
        let fixture: ComponentFixture<CirurgiaUpdateComponent>;
        let service: CirurgiaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [CirurgiaUpdateComponent]
            })
                .overrideTemplate(CirurgiaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CirurgiaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CirurgiaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Cirurgia(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.cirurgia = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Cirurgia();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.cirurgia = entity;
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
