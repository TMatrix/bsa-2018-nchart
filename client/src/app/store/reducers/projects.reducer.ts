import { Actions as ProjectsActions } from '../actions/projects/projects.actions';
import { combineReducers } from '@ngrx/store';
import { ProjectsState } from '@app/models';
import { ProjectsActionConstants as constants } from '@app/store/actions/projects/projects.action-types';
import { SchemeID } from '@app/models/normalizr.model';
import { project } from '@app/store/selectors/projects.selectors';

export const initialState: ProjectsState = {
	byId: {},
	all: [],
	active: null,
	isLoading: false
};

const all = (state = initialState.all, action: ProjectsActions) => {
	switch (action.type) {
		case constants.LOAD_PROJECTS:
			return [];
		case constants.LOAD_PROJECTS__COMPLETE:
			return action.payload.projects.all;
		case constants.CREATE_DRAFT_PROJECT__COMPLETE:
			return [...state, action.payload.project.id];
		default:
			return state;
	}
};

const byId = (state = initialState.byId, action: ProjectsActions) => {
	switch (action.type) {
		case constants.LOAD_PROJECTS:
			return {};
		case constants.LOAD_PROJECTS__COMPLETE:
			return action.payload.projects.byId;
		case constants.CREATE_DRAFT_PROJECT__COMPLETE:
			return {
				...state,
				[action.payload.project.id]: action.payload.project
			};
		case constants.CHANGE_PROJECT_NAME:
			return {
				...state,
				// [action.payload.project.id]: action.payload.project
				[action.payload.id]: {
					...state[action.payload.id],
					name: action.payload.name
				}
			};
		default:
			return state;
	}
};

export const isLoading = (
	state = initialState.isLoading,
	action: ProjectsActions
): boolean => {
	switch (action.type) {
		case constants.LOAD_PROJECTS:
			return true;
		case constants.LOAD_PROJECTS__COMPLETE:
		case constants.LOAD_PROJECTS__FAILED:
			return false;
		default:
			return state;
	}
};

export const active = (
	state = initialState.active,
	action: ProjectsActions
): SchemeID => {
	switch (action.type) {
		case constants.CREATE_DRAFT_PROJECT__COMPLETE:
			return action.payload.project.id;
		default:
			return state;
	}
};

const reducers = {
	all,
	byId,
	isLoading,
	active
};

export const projectsReducer = combineReducers(reducers);
