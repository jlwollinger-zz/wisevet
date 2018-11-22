/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WisevetTestModule } from '../../../test.module';
import { CirurgiaDetailComponent } from 'app/entities/cirurgia/cirurgia-detail.component';
import { Cirurgia } from 'app/shared/model/cirurgia.model';

describe('Component Tests', () => {
    describe('Cirurgia Management Detail Component', () => {
        let comp: CirurgiaDetailComponent;
        let fixture: ComponentFixture<CirurgiaDetailComponent>;
        const route = ({ data: of({ cirurgia: new Cirurgia(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [CirurgiaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CirurgiaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CirurgiaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cirurgia).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
