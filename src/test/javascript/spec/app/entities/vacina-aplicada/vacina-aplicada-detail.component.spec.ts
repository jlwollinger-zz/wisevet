/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WisevetTestModule } from '../../../test.module';
import { VacinaAplicadaDetailComponent } from 'app/entities/vacina-aplicada/vacina-aplicada-detail.component';
import { VacinaAplicada } from 'app/shared/model/vacina-aplicada.model';

describe('Component Tests', () => {
    describe('VacinaAplicada Management Detail Component', () => {
        let comp: VacinaAplicadaDetailComponent;
        let fixture: ComponentFixture<VacinaAplicadaDetailComponent>;
        const route = ({ data: of({ vacinaAplicada: new VacinaAplicada(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [VacinaAplicadaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VacinaAplicadaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VacinaAplicadaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.vacinaAplicada).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
