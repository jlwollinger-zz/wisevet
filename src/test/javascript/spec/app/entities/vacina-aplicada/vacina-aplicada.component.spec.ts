/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WisevetTestModule } from '../../../test.module';
import { VacinaAplicadaComponent } from 'app/entities/vacina-aplicada/vacina-aplicada.component';
import { VacinaAplicadaService } from 'app/entities/vacina-aplicada/vacina-aplicada.service';
import { VacinaAplicada } from 'app/shared/model/vacina-aplicada.model';

describe('Component Tests', () => {
    describe('VacinaAplicada Management Component', () => {
        let comp: VacinaAplicadaComponent;
        let fixture: ComponentFixture<VacinaAplicadaComponent>;
        let service: VacinaAplicadaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [VacinaAplicadaComponent],
                providers: []
            })
                .overrideTemplate(VacinaAplicadaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VacinaAplicadaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VacinaAplicadaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new VacinaAplicada(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.vacinaAplicadas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
