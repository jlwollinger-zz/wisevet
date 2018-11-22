/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WisevetTestModule } from '../../../test.module';
import { VeterinarioUpdateComponent } from 'app/entities/veterinario/veterinario-update.component';
import { VeterinarioService } from 'app/entities/veterinario/veterinario.service';
import { Veterinario } from 'app/shared/model/veterinario.model';

describe('Component Tests', () => {
    describe('Veterinario Management Update Component', () => {
        let comp: VeterinarioUpdateComponent;
        let fixture: ComponentFixture<VeterinarioUpdateComponent>;
        let service: VeterinarioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [VeterinarioUpdateComponent]
            })
                .overrideTemplate(VeterinarioUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VeterinarioUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VeterinarioService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Veterinario(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.veterinario = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Veterinario();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.veterinario = entity;
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
