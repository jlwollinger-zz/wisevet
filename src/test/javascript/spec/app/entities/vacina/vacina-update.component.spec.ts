/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WisevetTestModule } from '../../../test.module';
import { VacinaUpdateComponent } from 'app/entities/vacina/vacina-update.component';
import { VacinaService } from 'app/entities/vacina/vacina.service';
import { Vacina } from 'app/shared/model/vacina.model';

describe('Component Tests', () => {
    describe('Vacina Management Update Component', () => {
        let comp: VacinaUpdateComponent;
        let fixture: ComponentFixture<VacinaUpdateComponent>;
        let service: VacinaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [VacinaUpdateComponent]
            })
                .overrideTemplate(VacinaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VacinaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VacinaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Vacina(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.vacina = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Vacina();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.vacina = entity;
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
