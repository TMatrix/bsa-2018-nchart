import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

class Column {
	constructor(public variable: string, public type: string) {}
}

@Component({
	selector: 'app-drag-drop',
	templateUrl: './drag-drop.component.html'
})
export class DragDropComponent implements OnInit, OnDestroy {
	DIMENSIONS = 'DIMENSIONS';

	@Input()
	dimensionsSettings = [];

	@Input()
	columns = [];
	public dimensions = [];

	subs = new Subscription();
	constructor(private _dragulaService: DragulaService) {
		_dragulaService.createGroup(this.DIMENSIONS, {
			copy: (el, source) => {
				return source.id === 'columns';
			},
			copyItem: (column: Column) => {
				return new Column(column.variable, column.type);
			},
			accepts: (el, target, source, sibling) => {
				return target.id !== 'columns';
			}
		});

		this.subs.add(
			this._dragulaService
				.dropModel(this.DIMENSIONS)
				.subscribe(({ target, source, targetModel, item }) => {
					if (
						this.isValid(
							target.parentElement.firstElementChild.innerHTML,
							item
						)
					) {
						targetModel.splice(targetModel.indexOf(item), 1);
					} else if (
						!this.hasPlace(
							target.parentElement.firstElementChild.innerHTML,
							item
						)
					) {
						targetModel.splice(targetModel.indexOf(item), 1);
					}
					if (this.hasDuplicates(targetModel)) {
						targetModel.splice(targetModel.indexOf(item), 1);
					}
				})
		);
	}

	ngOnInit() {}

	getClasses(multiple, required) {
		return {
			multiple: multiple,
			required: required
		};
	}

	hasDuplicates(array) {
		length = array.length;
		array = array.filter(
			(thing, index, self) =>
				index === self.findIndex(t => t.variable === thing.variable)
		);
		return length !== array.length;
	}

	isValid(target: string, item: Column) {
		const dimension = this.dimensionsSettings.filter(obj => {
			return obj.variable === target;
		});

		const isValid = dimension[0].type.indexOf(item.type);
		return isValid === -1;
	}

	hasPlace(target: string, item: Column) {
		const dimension = this.dimensionsSettings.filter(obj => {
			return obj.variable === target;
		});
		const isMultiple = dimension[0].multiple;
		const hasPlace = dimension[0].value.length;
		return isMultiple ? isMultiple : hasPlace === 0;
	}

	remove(x, values) {
		values.splice(values.indexOf(x), 1);
	}

	removeAll() {
		this.dimensionsSettings.forEach(element => {
			element.value = [];
		});
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
		this._dragulaService.destroy(this.DIMENSIONS);
	}
}
