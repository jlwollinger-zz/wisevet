import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cirurgia } from 'app/shared/model/cirurgia.model';
import { CirurgiaService } from './cirurgia.service';
import { CirurgiaComponent } from './cirurgia.component';
import { CirurgiaDetailComponent } from './cirurgia-detail.component';
import { CirurgiaUpdateComponent } from './cirurgia-update.component';
import { CirurgiaDeletePopupComponent } from './cirurgia-delete-dialog.component';
import { ICirurgia } from 'app/shared/model/cirurgia.model';

@Injectable({ providedIn: 'root' })
export class CirurgiaResolve implements Resolve<ICirurgia> {
    constructor(private service: CirurgiaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cirurgia> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Cirurgia>) => response.ok),
                map((cirurgia: HttpResponse<Cirurgia>) => cirurgia.body)
            );
        }
        return of(new Cirurgia());
    }
}

export const cirurgiaRoute: Routes = [
    {
        path: 'cirurgia',
        component: CirurgiaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cirurgias'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cirurgia/:id/view',
        component: CirurgiaDetailComponent,
        resolve: {
            cirurgia: CirurgiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cirurgias'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cirurgia/new',
        component: CirurgiaUpdateComponent,
        resolve: {
            cirurgia: CirurgiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cirurgias'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cirurgia/:id/edit',
        component: CirurgiaUpdateComponent,
        resolve: {
            cirurgia: CirurgiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cirurgias'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cirurgiaPopupRoute: Routes = [
    {
        path: 'cirurgia/:id/delete',
        component: CirurgiaDeletePopupComponent,
        resolve: {
            cirurgia: CirurgiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cirurgias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
