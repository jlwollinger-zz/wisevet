/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WisevetTestModule } from '../../../test.module';
import { SolicitacaoVinculoDetailComponent } from 'app/entities/solicitacao-vinculo/solicitacao-vinculo-detail.component';
import { SolicitacaoVinculo } from 'app/shared/model/solicitacao-vinculo.model';

describe('Component Tests', () => {
    describe('SolicitacaoVinculo Management Detail Component', () => {
        let comp: SolicitacaoVinculoDetailComponent;
        let fixture: ComponentFixture<SolicitacaoVinculoDetailComponent>;
        const route = ({ data: of({ solicitacaoVinculo: new SolicitacaoVinculo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [SolicitacaoVinculoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SolicitacaoVinculoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SolicitacaoVinculoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.solicitacaoVinculo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
