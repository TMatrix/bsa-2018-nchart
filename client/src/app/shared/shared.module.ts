import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { FormFieldModule } from '@app/shared/components/form-field/form-field.module';
import { ActionButtonComponent } from '@app/shared/components/button/action-button/action-button.component';
import { HeaderModule } from '@app/shared/components/header/header.module';
import { MainBlockComponent } from '@app/shared/components/main-block/main-block.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LinkComponent } from '@app/shared/components/link/link.component';
import { DragDropComponent } from '@app/shared/components/dragDrop/drag-drop.component';
import { ChartsModule } from '@app/shared/components/charts/charts.module';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { CardComponent } from '@app/shared/components/card/card.component';
import { DeleteDialogComponent } from '@app/shared/components/dialogDelete/delete-dialog.component';
import { TableComponent } from '@app/shared/components/table/table.component';
import { PopupMenuComponent } from '@app/shared/components/button/popup-menu/popup-menu.component';
import { PaginatorComponent } from '@app/shared/components/paginator/paginator.component';
import { DialogRenameComponent } from '@app/shared/components/dialog-rename/dialog-rename.component';

@NgModule({
	imports: [
		UIKitModule,
		FormFieldModule,
		HeaderModule,
		BrowserAnimationsModule,
		ChartsModule
	],
	exports: [
		ActionButtonComponent,
		FormFieldModule,
		HeaderModule,
		ChartsModule,
		UIKitModule,
		MainBlockComponent,
		DragDropComponent,
		LinkComponent,
		DialogComponent,
		CardComponent,
		DeleteDialogComponent,
		TableComponent,
		PopupMenuComponent,
		PaginatorComponent,
		DialogRenameComponent
	],
	declarations: [
		ActionButtonComponent,
		DragDropComponent,
		MainBlockComponent,
		LinkComponent,
		DialogComponent,
		CardComponent,
		DeleteDialogComponent,
		TableComponent,
		PopupMenuComponent,
		PaginatorComponent,
		DialogRenameComponent
	]
})
export class SharedModule {}
