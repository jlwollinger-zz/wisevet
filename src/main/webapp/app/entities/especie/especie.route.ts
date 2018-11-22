import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Especie } from 'app/shared/model/especie.model';
import { EspecieService } from './especie.service';
import { EspecieComponent } from './especie.component';
import { EspecieDetailComponent } from './especie-detail.component';
import { EspecieUpdateComponent } from './especie-update.component';
import { EspecieDeletePopupComponent } from './especie-delete-dialog.component';
import { IEspecie } from 'app/shared/model/especie.model';

@Injectable({ providedIn: 'root' })
export class EspecieResolve implements Resolve<IEspecie> {
    constructor(private service: EspecieService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Especie> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Especie>) => response.ok),
                map((especie: HttpResponse<Especie>) => especie.body)
            );
        }
        return of(new Especie());
    }
}

export const especieRoute: Routes = [
    {
        path: 'especie',
        component: EspecieComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Especies'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'especie/:id/view',
        component: EspecieDetailComponent,
        resolve: {
            especie: EspecieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Especies'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'especie/new',
        component: EspecieUpdateComponent,
        resolve: {
            especie: EspecieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Especies'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'especie/:id/edit',
        component: EspecieUpdateComponent,
        resolve: {
            especie: EspecieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Especies'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const especiePopupRoute: Routes = [
    {
        path: 'especie/:id/delete',
        component: EspecieDeletePopupComponent,
        resolve: {
            especie: EspecieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Especies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
