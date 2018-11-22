import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEspecie } from 'app/shared/model/especie.model';

type EntityResponseType = HttpResponse<IEspecie>;
type EntityArrayResponseType = HttpResponse<IEspecie[]>;

@Injectable({ providedIn: 'root' })
export class EspecieService {
    public resourceUrl = SERVER_API_URL + 'api/especies';

    constructor(private http: HttpClient) {}

    create(especie: IEspecie): Observable<EntityResponseType> {
        return this.http.post<IEspecie>(this.resourceUrl, especie, { observe: 'response' });
    }

    update(especie: IEspecie): Observable<EntityResponseType> {
        return this.http.put<IEspecie>(this.resourceUrl, especie, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEspecie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEspecie[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
