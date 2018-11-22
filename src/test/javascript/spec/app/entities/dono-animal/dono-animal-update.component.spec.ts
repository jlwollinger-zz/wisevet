/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WisevetTestModule } from '../../../test.module';
import { DonoAnimalUpdateComponent } from 'app/entities/dono-animal/dono-animal-update.component';
import { DonoAnimalService } from 'app/entities/dono-animal/dono-animal.service';
import { DonoAnimal } from 'app/shared/model/dono-animal.model';

describe('Component Tests', () => {
    describe('DonoAnimal Management Update Component', () => {
        let comp: DonoAnimalUpdateComponent;
        let fixture: ComponentFixture<DonoAnimalUpdateComponent>;
        let service: DonoAnimalService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [DonoAnimalUpdateComponent]
            })
                .overrideTemplate(DonoAnimalUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DonoAnimalUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonoAnimalService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new DonoAnimal(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.donoAnimal = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new DonoAnimal();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.donoAnimal = entity;
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
