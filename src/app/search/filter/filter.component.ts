import { Component, OnInit, Input, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Option, FilterKind } from '../model/option';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges, OnDestroy {
  /** @internal */
  @Input() options: Option;
  /** @internal */
  @Input() hasCountryGroups = false;
  /** @internal */
  @Input() resetOnSubmit: boolean;
  /** @internal */
  @Input() resetFilter: boolean;
  /** @internal */
  @Output() submit = new EventEmitter<number[]>();
  private multi: number[];

  constructor(

  ) {}

  /** @internal */
  getValues(): boolean {
    if (!this.options.exposed) {
      this._getValues((res: Option) =>  {
        this.setOption(res);
      });
      this.options.exposed = true;
    }
    return true;
  }

  private _getValues(doTask: (res: Option) => void) {
    this.options.filler.getValues(this.options.id).subscribe(
      res => {
       doTask(res);
      },
      err => {
        //this.messageService.add({ severity: 'error', summary: '', detail: err, life: MessageSettings.DEFAULT_MSG_LIFE});
      }
    );
  }

  /** @internal */
  onSelectChange(id: any) {
    if (id) {
      this.submit.next([id]);
    }
  }

  /** @internal */
  onMultiSelectSubmit(id: any) {
    if (this.multi && this.multi.length > 0) {
      this.submit.next(this.multi);
      this.multi = [];
    } else if ([FilterKind.GRID, FilterKind.GRID_COLUMN, FilterKind.URL].includes(this.options.kind)) {
      this.multi = [];
      this.submit.next(this.multi);
    }
  }

  /** @internal */
  onMultiSelectChange(event: any[]) {
    if (this.hasCountryGroups) {
      this.handleCountryGroupFiltering();
    }
    this.multi = event;
  }

  ngOnChanges() {
    this.multi = [];
  }

  ngOnInit() {}

  private setOption(res: Option) {
    this.options.values = res.values;
    this.options.selectedValues = res.selectedValues;
  }

  private handleCountryGroupFiltering() {
    this.options.values.filter(country => country.id.endsWith('_group'))
      .filter(countryGroup => {
        const isSelected = this.options.selectedValues.some(country => country === countryGroup);
        const isToggled = (countryGroup['isSelected'] || isSelected) && countryGroup['isSelected'] !== isSelected;
        if (isToggled) {
          countryGroup['action'](this.options, isSelected);
        }
        return !isToggled;
      })
      .forEach(countryGroup => {
        countryGroup['updateSelection'](this.options);
      });
  }

  ngOnDestroy() {
  }

}
