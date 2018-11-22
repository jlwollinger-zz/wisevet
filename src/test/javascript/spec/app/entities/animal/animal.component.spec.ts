/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WisevetTestModule } from '../../../test.module';
import { AnimalComponent } from 'app/entities/animal/animal.component';
import { AnimalService } from 'app/entities/animal/animal.service';
import { Animal } from 'app/shared/model/animal.model';

describe('Component Tests', () => {
    describe('Animal Management Component', () => {
        let comp: AnimalComponent;
        let fixture: ComponentFixture<AnimalComponent>;
        let service: AnimalService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [AnimalComponent],
                providers: []
            })
                .overrideTemplate(AnimalComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AnimalComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnimalService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Animal(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.animals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
