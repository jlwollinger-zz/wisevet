/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ConsultaService } from 'app/entities/consulta/consulta.service';
import { IConsulta, Consulta } from 'app/shared/model/consulta.model';

describe('Service Tests', () => {
    describe('Consulta Service', () => {
        let injector: TestBed;
        let service: ConsultaService;
        let httpMock: HttpTestingController;
        let elemDefault: IConsulta;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ConsultaService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Consulta(0, currentDate, 'AAAAAAA', 'AAAAAAA', false);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataHora: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Consulta', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dataHora: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataHora: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Consulta(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Consulta', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataHora: currentDate.format(DATE_TIME_FORMAT),
                        descricao: 'BBBBBB',
                        observacoes: 'BBBBBB',
                        realizada: true
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dataHora: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Consulta', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataHora: currentDate.format(DATE_TIME_FORMAT),
                        descricao: 'BBBBBB',
                        observacoes: 'BBBBBB',
                        realizada: true
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataHora: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Consulta', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
