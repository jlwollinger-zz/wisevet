import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDonoAnimal } from 'app/shared/model/dono-animal.model';

type EntityResponseType = HttpResponse<IDonoAnimal>;
type EntityArrayResponseType = HttpResponse<IDonoAnimal[]>;

@Injectable({ providedIn: 'root' })
export class DonoAnimalService {
    public resourceUrl = SERVER_API_URL + 'api/dono-animals';

    constructor(private http: HttpClient) {}

    create(donoAnimal: IDonoAnimal): Observable<EntityResponseType> {
        return this.http.post<IDonoAnimal>(this.resourceUrl, donoAnimal, { observe: 'response' });
    }

    update(donoAnimal: IDonoAnimal): Observable<EntityResponseType> {
        return this.http.put<IDonoAnimal>(this.resourceUrl, donoAnimal, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDonoAnimal>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDonoAnimal[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
