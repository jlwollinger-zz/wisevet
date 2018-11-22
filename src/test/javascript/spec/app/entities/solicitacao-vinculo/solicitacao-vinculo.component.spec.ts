/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WisevetTestModule } from '../../../test.module';
import { SolicitacaoVinculoComponent } from 'app/entities/solicitacao-vinculo/solicitacao-vinculo.component';
import { SolicitacaoVinculoService } from 'app/entities/solicitacao-vinculo/solicitacao-vinculo.service';
import { SolicitacaoVinculo } from 'app/shared/model/solicitacao-vinculo.model';

describe('Component Tests', () => {
    describe('SolicitacaoVinculo Management Component', () => {
        let comp: SolicitacaoVinculoComponent;
        let fixture: ComponentFixture<SolicitacaoVinculoComponent>;
        let service: SolicitacaoVinculoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [SolicitacaoVinculoComponent],
                providers: []
            })
                .overrideTemplate(SolicitacaoVinculoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SolicitacaoVinculoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolicitacaoVinculoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SolicitacaoVinculo(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.solicitacaoVinculos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
