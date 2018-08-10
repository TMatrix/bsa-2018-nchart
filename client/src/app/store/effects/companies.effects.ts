import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CompaniesActionConstants } from '@app/store/actions/companies/companies.action-types';
import { Company } from '@app/models';
import {
	LoadDataComplete,
	LoadDataFailed
} from '@app/store/actions/companies/companies.actions';
import { normalize } from 'normalizr';
import { arrayOfCustomData } from '@app/models/custom.schema';

@Injectable()
export class CompaniesEffects {
	api = {
		loadCompanies: (): Observable<Company[]> => {
			return of([
				{
					id: 'q1',
					name: 'binary',
					createdAt: '12345678'
				},
				{
					id: 'q2',
					name: 'macpaw',
					createdAt: '995678'
				},
				{
					id: 'q3',
					name: 'kpi',
					createdAt: '1'
				}
			]);
		}
	};

	constructor(private action$: Actions) {}

	@Effect()
	loadData$ = this.action$.pipe(
		ofType(CompaniesActionConstants.COMPANIES_LOAD_DATA),
		switchMap((action: any) =>
			this.api.loadCompanies().pipe(
				map((value: Array<Company>) => {
					const {
						result: all,
						entities: { byId }
					} = normalize(value, arrayOfCustomData);
					return new LoadDataComplete({
						companies: {
							all,
							byId
						}
					});
				}),
				catchError(error => {
					return of(
						new LoadDataFailed({
							action: action,
							msg: 'test',
							error
						})
					);
				})
			)
		)
	);
}