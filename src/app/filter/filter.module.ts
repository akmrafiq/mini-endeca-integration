import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';



@NgModule({
  declarations: [
    FilterPanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterPanelComponent
  ],
})
export class FilterModule { }
export { FilterService } from './service/filter.service';
export { FilterServiceConfig } from './model/filter-service-config';
