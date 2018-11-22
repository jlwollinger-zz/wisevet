/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WisevetTestModule } from '../../../test.module';
import { VeterinarioComponent } from 'app/entities/veterinario/veterinario.component';
import { VeterinarioService } from 'app/entities/veterinario/veterinario.service';
import { Veterinario } from 'app/shared/model/veterinario.model';

describe('Component Tests', () => {
    describe('Veterinario Management Component', () => {
        let comp: VeterinarioComponent;
        let fixture: ComponentFixture<VeterinarioComponent>;
        let service: VeterinarioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [VeterinarioComponent],
                providers: []
            })
                .overrideTemplate(VeterinarioComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VeterinarioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VeterinarioService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Veterinario(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.veterinarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
