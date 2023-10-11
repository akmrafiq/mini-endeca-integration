import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { FilterComponent } from './filter/filter.component';
import { SingleSelectFilterComponent } from './single-select-filter/single-select-filter.component';
import { LinktaggerModule } from './lib/linktagger/linktagger.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    FilterPanelComponent,
    FilterComponent,
    SingleSelectFilterComponent
  ],
  imports: [
    BrowserModule,
    MultiSelectModule,
    FormsModule,
    CommonModule,
    LinktaggerModule,
    DropdownModule,
    BrowserAnimationsModule
  ],
  bootstrap:[
    FilterPanelComponent,
    FilterComponent,
    SingleSelectFilterComponent
  ],
  exports: [
    FilterPanelComponent,
    FilterComponent,
    SingleSelectFilterComponent
  ],
})
export class SearchModule { }
export { FilterService } from './service/filter.service';
export { FilterServiceConfig } from './model/filter-service-config';
