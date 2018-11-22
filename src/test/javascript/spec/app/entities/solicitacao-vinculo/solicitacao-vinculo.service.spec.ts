/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SolicitacaoVinculoService } from 'app/entities/solicitacao-vinculo/solicitacao-vinculo.service';
import { ISolicitacaoVinculo, SolicitacaoVinculo, STATUSSOLICITACAOVINCULO } from 'app/shared/model/solicitacao-vinculo.model';

describe('Service Tests', () => {
    describe('SolicitacaoVinculo Service', () => {
        let injector: TestBed;
        let service: SolicitacaoVinculoService;
        let httpMock: HttpTestingController;
        let elemDefault: ISolicitacaoVinculo;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(SolicitacaoVinculoService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new SolicitacaoVinculo(0, currentDate, STATUSSOLICITACAOVINCULO.ENVIADO);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataEnvio: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a SolicitacaoVinculo', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dataEnvio: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataEnvio: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new SolicitacaoVinculo(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a SolicitacaoVinculo', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataEnvio: currentDate.format(DATE_TIME_FORMAT),
                        status: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dataEnvio: currentDate
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

            it('should return a list of SolicitacaoVinculo', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataEnvio: currentDate.format(DATE_TIME_FORMAT),
                        status: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataEnvio: currentDate
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

            it('should delete a SolicitacaoVinculo', async () => {
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
