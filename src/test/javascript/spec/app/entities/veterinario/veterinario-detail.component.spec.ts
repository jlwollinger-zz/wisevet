/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WisevetTestModule } from '../../../test.module';
import { VeterinarioDetailComponent } from 'app/entities/veterinario/veterinario-detail.component';
import { Veterinario } from 'app/shared/model/veterinario.model';

describe('Component Tests', () => {
    describe('Veterinario Management Detail Component', () => {
        let comp: VeterinarioDetailComponent;
        let fixture: ComponentFixture<VeterinarioDetailComponent>;
        const route = ({ data: of({ veterinario: new Veterinario(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [VeterinarioDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VeterinarioDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VeterinarioDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.veterinario).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
