/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WisevetTestModule } from '../../../test.module';
import { DonoAnimalComponent } from 'app/entities/dono-animal/dono-animal.component';
import { DonoAnimalService } from 'app/entities/dono-animal/dono-animal.service';
import { DonoAnimal } from 'app/shared/model/dono-animal.model';

describe('Component Tests', () => {
    describe('DonoAnimal Management Component', () => {
        let comp: DonoAnimalComponent;
        let fixture: ComponentFixture<DonoAnimalComponent>;
        let service: DonoAnimalService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [DonoAnimalComponent],
                providers: []
            })
                .overrideTemplate(DonoAnimalComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DonoAnimalComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonoAnimalService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DonoAnimal(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.donoAnimals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
