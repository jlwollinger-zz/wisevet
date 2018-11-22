/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WisevetTestModule } from '../../../test.module';
import { SolicitacaoVinculoUpdateComponent } from 'app/entities/solicitacao-vinculo/solicitacao-vinculo-update.component';
import { SolicitacaoVinculoService } from 'app/entities/solicitacao-vinculo/solicitacao-vinculo.service';
import { SolicitacaoVinculo } from 'app/shared/model/solicitacao-vinculo.model';

describe('Component Tests', () => {
    describe('SolicitacaoVinculo Management Update Component', () => {
        let comp: SolicitacaoVinculoUpdateComponent;
        let fixture: ComponentFixture<SolicitacaoVinculoUpdateComponent>;
        let service: SolicitacaoVinculoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [SolicitacaoVinculoUpdateComponent]
            })
                .overrideTemplate(SolicitacaoVinculoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SolicitacaoVinculoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolicitacaoVinculoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new SolicitacaoVinculo(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.solicitacaoVinculo = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new SolicitacaoVinculo();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.solicitacaoVinculo = entity;
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
