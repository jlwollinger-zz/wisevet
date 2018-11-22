import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Vacina } from 'app/shared/model/vacina.model';
import { VacinaService } from './vacina.service';
import { VacinaComponent } from './vacina.component';
import { VacinaDetailComponent } from './vacina-detail.component';
import { VacinaUpdateComponent } from './vacina-update.component';
import { VacinaDeletePopupComponent } from './vacina-delete-dialog.component';
import { IVacina } from 'app/shared/model/vacina.model';

@Injectable({ providedIn: 'root' })
export class VacinaResolve implements Resolve<IVacina> {
    constructor(private service: VacinaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vacina> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Vacina>) => response.ok),
                map((vacina: HttpResponse<Vacina>) => vacina.body)
            );
        }
        return of(new Vacina());
    }
}

export const vacinaRoute: Routes = [
    {
        path: 'vacina',
        component: VacinaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vacinas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vacina/:id/view',
        component: VacinaDetailComponent,
        resolve: {
            vacina: VacinaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vacinas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vacina/new',
        component: VacinaUpdateComponent,
        resolve: {
            vacina: VacinaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vacinas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vacina/:id/edit',
        component: VacinaUpdateComponent,
        resolve: {
            vacina: VacinaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vacinas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vacinaPopupRoute: Routes = [
    {
        path: 'vacina/:id/delete',
        component: VacinaDeletePopupComponent,
        resolve: {
            vacina: VacinaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vacinas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
