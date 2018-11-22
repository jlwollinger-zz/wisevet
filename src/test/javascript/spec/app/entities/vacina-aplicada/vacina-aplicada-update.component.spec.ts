/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WisevetTestModule } from '../../../test.module';
import { VacinaAplicadaUpdateComponent } from 'app/entities/vacina-aplicada/vacina-aplicada-update.component';
import { VacinaAplicadaService } from 'app/entities/vacina-aplicada/vacina-aplicada.service';
import { VacinaAplicada } from 'app/shared/model/vacina-aplicada.model';

describe('Component Tests', () => {
    describe('VacinaAplicada Management Update Component', () => {
        let comp: VacinaAplicadaUpdateComponent;
        let fixture: ComponentFixture<VacinaAplicadaUpdateComponent>;
        let service: VacinaAplicadaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [VacinaAplicadaUpdateComponent]
            })
                .overrideTemplate(VacinaAplicadaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VacinaAplicadaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VacinaAplicadaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new VacinaAplicada(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.vacinaAplicada = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new VacinaAplicada();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.vacinaAplicada = entity;
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
