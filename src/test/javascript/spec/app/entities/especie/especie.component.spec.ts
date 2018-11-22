/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WisevetTestModule } from '../../../test.module';
import { EspecieComponent } from 'app/entities/especie/especie.component';
import { EspecieService } from 'app/entities/especie/especie.service';
import { Especie } from 'app/shared/model/especie.model';

describe('Component Tests', () => {
    describe('Especie Management Component', () => {
        let comp: EspecieComponent;
        let fixture: ComponentFixture<EspecieComponent>;
        let service: EspecieService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [EspecieComponent],
                providers: []
            })
                .overrideTemplate(EspecieComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EspecieComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EspecieService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Especie(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.especies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
