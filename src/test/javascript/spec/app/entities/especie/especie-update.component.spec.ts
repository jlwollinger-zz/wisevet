/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WisevetTestModule } from '../../../test.module';
import { EspecieUpdateComponent } from 'app/entities/especie/especie-update.component';
import { EspecieService } from 'app/entities/especie/especie.service';
import { Especie } from 'app/shared/model/especie.model';

describe('Component Tests', () => {
    describe('Especie Management Update Component', () => {
        let comp: EspecieUpdateComponent;
        let fixture: ComponentFixture<EspecieUpdateComponent>;
        let service: EspecieService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [EspecieUpdateComponent]
            })
                .overrideTemplate(EspecieUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EspecieUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EspecieService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Especie(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.especie = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Especie();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.especie = entity;
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
