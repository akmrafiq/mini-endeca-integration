import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Dimension, EndecapodService, RangeFilter, SearchResult } from '@ibfd/endecapod';
import { Filter, FilterType } from '../model/config/filter';
import { AppConfigData } from '../model/config/app-config-data';
import { Subscription } from 'rxjs';
import { FilterValuesService } from '../service/filter-values.service';
import { AppConfigService } from '../service/app-config.service';
import { MessageService } from 'primeng/api';
import { StateService } from '../service/state.service';
import { CollectionService } from '../service/collection.service';
import { Option } from '../model/option';
import { DimensionFilterValueService } from '../service/dimension-filter-value.service';
import { MessageSettings } from '../model/message-settings';

@Injectable()
export class FilterExposeService extends EndecapodService { }

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  providers: [
    { provide: FilterExposeService, useClass: FilterExposeService }
  ],
})

export class FilterPanelComponent implements OnInit, OnDestroy {

  private appConfigData: AppConfigData;
  /** @internal */
  filters: Filter[];
  /** @internal */
  rangeFilter: RangeFilter;
  /** @internal */
  more_filters: Filter[];
  /** @internal */
  morelinkactive: boolean;
  /** @internal */
  lesslinkactive: boolean;
  /** @internal */
  isCollapsed = false;
  private showMoreIfAvailable: string;
  private subscription: Subscription;
  /** @internal */
  valueSvc: FilterValuesService;

  constructor(
   // private messageService: MessageService,
    private endecapodService: EndecapodService,
    private stateService: StateService,
    private appConfigService: AppConfigService,
    private collectionService: CollectionService,
    private filterExposeService: FilterExposeService
  ) {
    this.appConfigData = new AppConfigData(this.appConfigService.config);
  }

  /** @internal */
  onSubmit(event: number[]) {
    this.endecapodService.AddMultiple(event);
    this.stateService.save(StateService.STATE_KEY_COLLECTION_HOME, 'false');
}

  /** @internal  */
  morelessToggle(event: Event) {
    this.morelinkactive = !this.morelinkactive;
    this.lesslinkactive = !this.lesslinkactive;
    this.stateService.save(StateService.STATE_KEY_MORE_FILTER, this.morelinkactive ? 'false' : 'true');
  }

  private loadFilters(res: SearchResult): Filter[][] {
    /*
     * Which collection is selected?
     */
    const selectedCollection = res.getChips()
      .filter(p => p.parent.id === this.appConfigData.getCollectionDimension().id)
      .map(p => p.dimension.id)[0] || 0;
    /*
     * Which filters are configured?
     */

    let filters = this.collectionService.getFilters(selectedCollection);
    let more_filters = [];
    /*
     * Get the dimensions for select filters
     */
    filters
      .map((f: Filter) => {

        if ((f.type === FilterType.MSELECT) || (f.type === FilterType.SSELECT)) {
          f.option = <Option>res.getDimensions().find((d: Dimension) => d.id === f.N)
            || <Option>{ id: f.N, name: '', multi: f.type === FilterType.MSELECT, disabled: true };
          f.option.name = f.alias ? f.alias :
            this.appConfigData.getDimensionAlias(f.option.id, selectedCollection) ?
              this.appConfigData.getDimensionAlias(f.option.id, selectedCollection) : f.option.name;
          f.option.multi = f.type === FilterType.MSELECT;
          f.option.filler = this.valueSvc;
          if (f.load_on_init) {
            f.option.filler.getValues(f.option.id).subscribe(
              v => {
                f.option.values = v.values;
                f.option.exposed = true;
              }
            );
          }
          f.option.pfx = this.appConfigData.getDropdownPrefix(f.option.id, selectedCollection);
        } else if (f.type === FilterType.DATERANGE) {
          f.alias = this.appConfigData.getPropertyAlias(f.propName, selectedCollection);
        }
      });
    /*
     * Move everything over the threshold to the more_dimensions array
     */
    if (filters) {
      const threshold = this.collectionService.getFilterThreshold(selectedCollection);
      if (filters.length > threshold) {
        this.morelinkactive = this.showMoreIfAvailable === 'true' ? false : true;
        this.lesslinkactive = this.showMoreIfAvailable === 'true' ? true : false;
      } else {
        this.morelinkactive = false;
        this.lesslinkactive = false;
      }
      more_filters = filters
        .filter((d: Filter, idx: number) => idx >= threshold);
      filters = filters
        .filter((d: Filter, idx: number) => idx < threshold);
    }
    return [filters, more_filters];
  }

  ngOnInit() {

    this.valueSvc = new DimensionFilterValueService(this.filterExposeService, this.endecapodService);
    /**
     * Subscribe to behavior-result here becasue we are late
     */
    this.subscription = this.endecapodService.BehaviorResult().subscribe(
      res => {

        if (res instanceof SearchResult) {
          this.rangeFilter = res.getNavigationRangeFilter();
          [this.filters, this.more_filters] = this.loadFilters(res);
        }
      },
      err => {
       // this.messageService.add({ severity: 'error', summary: '', detail: err, life: MessageSettings.DEFAULT_MSG_LIFE });
      }
    );
    this.subscription.add(
      this.stateService.Pong().subscribe(
        res => {
          if (res === StateService.STATE_KEY_MORE_FILTER) {
            this.showMoreIfAvailable = this.stateService.load(StateService.STATE_KEY_MORE_FILTER);
          }
        },
        err => {
          // this.messageService.add({
          //   severity: 'error',
          //   summary: 'Error saving state!',
          //   detail: '',
          //   life: MessageSettings.DEFAULT_MSG_LIFE
          // });
        }
      )
    );
  }

  /**@internal */
  togglePanel() {
    this.isCollapsed = !this.isCollapsed;
    return false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

