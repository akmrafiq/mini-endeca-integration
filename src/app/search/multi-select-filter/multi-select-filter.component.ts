import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MultiSelect } from 'primeng/multiselect';
import { Option } from '../model/option';
import { snakeCase } from 'lodash-es';

@Component({
  selector: 'app-multi-select-filter',
  templateUrl: './multi-select-filter.component.html',
  styleUrls: ['./multi-select-filter.component.scss']
})
export class MultiSelectFilterComponent implements OnInit, OnChanges, AfterViewInit {
  /** @internal */
  @Input() options: Option;
  /** @internal */
  @Output() panelShow = new EventEmitter<any>();
  /** @internal */
  @Output() panelHide = new EventEmitter<any>();
  /** @internal */
  @Output() change = new EventEmitter<any[]>();
  /** @internal */
  @ViewChild('multiSelect', {static: false}) multiSelect: MultiSelect;
  /** @ingternal */
  styleClass: string;

  constructor() { }

  /** @internal */
  onPanelShow() {
    this.styleClass = '';
    this.setIdToFilterSearch();
    //Autocomplete.off(this.nativeInput);
    this.panelShow.emit(this.options.id);
  }
  /** @internal */
  onPanelHide() {
    this.panelHide.emit(this.options.id);
  }
  /** @internal */
  onChange(event: any) {
    this.styleClass = event.value.length ? 'ib-select-active' : '';
    this.change.emit(this.options.selectedValues.map(v => v.id));
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.setIdToFilterActivator();
  }

  ngOnChanges() {
//    this.selectedValues = [];
  }

  private clearFilter() {
    // to prevent incorrect behavior of selecting all values (toggleAll)
    this.multiSelect._filteredOptions = [];
    this.multiSelect.options = [];
  }

  private setIdToFilterSearch() {
    /** prime-ng doesn't directly support id attribute at the filter field search in p-multiselect component. So I manually added here */
    this.nativeInput.id = `filter_${snakeCase(this.options.name)}_search`;
  }

  private setIdToFilterActivator() {
    const elm = this.multiSelect.containerViewChild.nativeElement.querySelector('div.p-multiselect-trigger');
    elm.id = `filter_${snakeCase(this.options.name)}_activator`;
  }

  private get nativeInput() {
    return this.multiSelect.filterInputChild.nativeElement;
  }
}

