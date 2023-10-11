import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { Option, FilterKind } from '../model/option';
import { snakeCase } from 'lodash-es';
import { Dropdown } from 'primeng/dropdown';
// import { Autocomplete } from '../../utils/autocomplete';

@Component({
  selector: 'app-single-select-filter',
  templateUrl: './single-select-filter.component.html',
  styleUrls: ['./single-select-filter.component.scss']
})
export class SingleSelectFilterComponent implements AfterViewInit, OnChanges {
  /** @internal */
  @Input() options: Option;
  /** @internal */
  @Input() resetOnSubmit: boolean;
  /** @internal */
  @Input() resetFilter: boolean;
  /** @internal */
  @Input() placeholder = 'Select an option';
  /** @internal */
  @Output() show = new EventEmitter<any>();
  /** @internal */
  @Output() select = new EventEmitter<any>();
  /** @internal */
  option: Option;
  /** @internal */
  @ViewChild('dropdown', { static: false }) dropdownRef: Dropdown;

  constructor() { }

  /** @internal */
  onShow(event: any) {
    this.setIdFilterSearch();
    //Autocomplete.off(this.nativeInput);
    this.show.emit(this.options.id);
  }
  /** @internal */
  submit() {
    if (this.option) {
      this.select.emit(this.option.id);
      this.reset();
    }
  }

  private reset() {
    if (!this.resetOnSubmit) {
      this.dropdownRef.placeholder = this.option.name;
    }

    this.option = undefined;
  }

  ngAfterViewInit() {
    this.setIdToFilterActivator();
  }

  private setIdFilterSearch() {
    /** prime-ng doesn't directly support id attribute at the filter field search in p-dropdown component. So I manually added here */
    this.nativeInput.id = `filter_${snakeCase(this.options.name)}_search`;
  }

  private setIdToFilterActivator() {
    const elm = this.dropdownRef.containerViewChild.nativeElement.querySelector('div.p-dropdown-trigger');
    elm.id = `filter_${snakeCase(this.options.name)}_activator`;
  }

  private get nativeInput() {
    return this.dropdownRef.filterViewChild.nativeElement;
  }

  ngOnChanges(): void {
    if (this.resetFilter) {
      this.option = undefined;
    }
  }

}
