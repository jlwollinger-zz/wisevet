/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WisevetTestModule } from '../../../test.module';
import { DonoAnimalDetailComponent } from 'app/entities/dono-animal/dono-animal-detail.component';
import { DonoAnimal } from 'app/shared/model/dono-animal.model';

describe('Component Tests', () => {
    describe('DonoAnimal Management Detail Component', () => {
        let comp: DonoAnimalDetailComponent;
        let fixture: ComponentFixture<DonoAnimalDetailComponent>;
        const route = ({ data: of({ donoAnimal: new DonoAnimal(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WisevetTestModule],
                declarations: [DonoAnimalDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DonoAnimalDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DonoAnimalDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.donoAnimal).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
