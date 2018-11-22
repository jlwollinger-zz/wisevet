import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Papel } from 'app/shared/model/papel.model';
import { PapelService } from './papel.service';
import { PapelComponent } from './papel.component';
import { PapelDetailComponent } from './papel-detail.component';
import { PapelUpdateComponent } from './papel-update.component';
import { PapelDeletePopupComponent } from './papel-delete-dialog.component';
import { IPapel } from 'app/shared/model/papel.model';

@Injectable({ providedIn: 'root' })
export class PapelResolve implements Resolve<IPapel> {
    constructor(private service: PapelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Papel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Papel>) => response.ok),
                map((papel: HttpResponse<Papel>) => papel.body)
            );
        }
        return of(new Papel());
    }
}

export const papelRoute: Routes = [
    {
        path: 'papel',
        component: PapelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Papels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'papel/:id/view',
        component: PapelDetailComponent,
        resolve: {
            papel: PapelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Papels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'papel/new',
        component: PapelUpdateComponent,
        resolve: {
            papel: PapelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Papels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'papel/:id/edit',
        component: PapelUpdateComponent,
        resolve: {
            papel: PapelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Papels'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const papelPopupRoute: Routes = [
    {
        path: 'papel/:id/delete',
        component: PapelDeletePopupComponent,
        resolve: {
            papel: PapelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Papels'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
