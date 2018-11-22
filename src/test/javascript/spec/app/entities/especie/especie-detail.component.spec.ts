/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WisevetTestModule } from '../../../test.module';
import { EspecieDetailComponent } from 'app/entities/especie/especie-detail.component';
import { Especie } from 'app/shared/model/especie.model';

describe('Component Tests', () => {
    describe('Especie Management Detail Component', () => {
        let comp: EspecieDetailComponent;
        let fixture: ComponentFixture<EspecieDetailComponent>;
        const route = ({ data: of({ especie: new Especie(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [EspecieDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EspecieDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EspecieDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.especie).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
