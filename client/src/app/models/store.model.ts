import { UserState } from './user-store.model';
import { CompaniesState } from './companies-store.model';
import { ErrorHandlerState } from './error-store.model';
import { ProjectsState } from './projects-store.model';

export class AppAction<T = undefined> {
	readonly type: string;
	constructor(public payload?: T) {}
}

export class FailedActionPayload {
	msg?: string;
	action?: any;
	error?: Error;
	serverMessages?: string[];
}

export class FailedAction extends AppAction<FailedActionPayload> {}

export interface AppState {
	user: UserState;
	errorHandler: ErrorHandlerState;
	companies: CompaniesState;
	projects: ProjectsState;
}