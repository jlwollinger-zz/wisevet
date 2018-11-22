/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WisevetTestModule } from '../../../test.module';
import { CirurgiaComponent } from 'app/entities/cirurgia/cirurgia.component';
import { CirurgiaService } from 'app/entities/cirurgia/cirurgia.service';
import { Cirurgia } from 'app/shared/model/cirurgia.model';

describe('Component Tests', () => {
    describe('Cirurgia Management Component', () => {
        let comp: CirurgiaComponent;
        let fixture: ComponentFixture<CirurgiaComponent>;
        let service: CirurgiaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [CirurgiaComponent],
                providers: []
            })
                .overrideTemplate(CirurgiaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CirurgiaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CirurgiaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Cirurgia(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cirurgias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
