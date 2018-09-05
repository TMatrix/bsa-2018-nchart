import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SchemeID } from '@app/models/normalizr.model';
import { StoreService } from '@app/services/store.service';
import { PickActiveChart } from '@app/store/actions/charts/charts.actions';
import { RemovePageProject } from '@app/store/actions/projects/projects.actions';

@Component({
	selector: 'app-project-tabs',
	templateUrl: './project-tabs.component.html',
	styleUrls: ['./project-tabs.component.sass']
})
export class ProjectTabsComponent implements OnInit, OnChanges {
	@Input()
	listPages = [];
	@Input()
	activeCharId: SchemeID;
	@Output()
	displayModalDataset = new EventEmitter();
	isClosable = this.listPages.length > 1 ? true : false;

	constructor(private storeService: StoreService) {}

	ngOnInit() {}

	onChange(event) {
		this.select(this.listPages[event.index]);
	}
	ngOnChanges() {
		this.isClosable = this.listPages.length > 1 ? true : false;
	}

	isActive(id) {
		return this.activeCharId === id;
	}

	handleClose(event) {
		this.remove(this.listPages[event.index]);
		event.close();
	}
	select(id) {
		this.storeService.dispatch(new PickActiveChart({ id }));
	}
	remove(chartId) {
		this.storeService.dispatch(new RemovePageProject({ chartId }));
	}
	isDisplayModalDataset() {
		this.displayModalDataset.emit();
	}
}
