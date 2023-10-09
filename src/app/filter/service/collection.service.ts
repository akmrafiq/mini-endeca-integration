import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { StateService } from './state.service';
import { AppConfigData, RecordLabel } from '../model/config/app-config-data';
import { SelectItem } from 'primeng/api';
import { Filter } from '../model/config/filter';
import { TplField } from '../model/config/templatefield';
import { Sortings } from '../model/config/sortings';
import { SortCriterium } from '@ibfd/endecapod';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private appConfigData: AppConfigData;
  private addRelevance = false;
  private setRelevance = false;

  constructor(
    private appConfigService: AppConfigService,
    private stateService: StateService
  ) {

    this.appConfigData = new AppConfigData(this.appConfigService.config);
  }

  public getFilterThreshold(id: number): number {
    return this.appConfigData.getCollectionFilterThreshold(id);
  }
  public getCollectionId(code: string): number {
    return this.appConfigData.getCollectionId(code);
  }
  /**
   * Return the results template configured for the subcollection with this code.
   * If there is no such template return the one from the collection with this code
   * If no such template is found you will get the default template
   * @param collectionCode
   */
  public getResultTemplate(category: number, collectionCode: string): TplField[] {
    return this.appConfigData.getCollectionResultTemplate(category, collectionCode);
  }
  public getFilters(id: number): Filter[] {

    return this.appConfigData.getCollectionFilters(id);
  }
  public getActions(id: number): any {
    return this.appConfigData.getCollectionActions(id);
  }
  public getSortOptions(id: number): SelectItem[] {
    const options = this.appConfigData.getCollectionConfiguredSortOptions(id).filter(o => o.value !== SortCriterium.EDCA_RELEVANCE_VALUE);
    if (this.addRelevance) {
      // Add Relevance ranking as an option
      options.push({label: SortCriterium.EDCA_RELEVANCE_LABEL, value: SortCriterium.EDCA_RELEVANCE_VALUE});
    }
    return options;
  }
  public getPageSize(id: number): number {
    return this.appConfigData.getPageSize(id);
  }
  public getLabelByID(id: number, label: RecordLabel): string {
    return this.appConfigData.getRecordLabel(id, label);
  }
  public getLabelByCode(code: string, label: RecordLabel): string {
    return this.appConfigData.getRecordLabelByCode(code, label);
  }
  public getAlias(id: number): string {
    return this.appConfigData.getCollectionAlias(id);
  }
  /**
   * Add/remove Relevance Sorting as an option
   */
  public AddRelevanceSort(v: boolean) {
    this.addRelevance = v;
  }
  /**
   * Set Relevance sorting as active/inactive sortoption
   * @param v
   */
  public SetRelevanceSort(v: boolean) {
    this.setRelevance = v;
  }
  public getCurrentSortCriteria(id: number): SortCriterium[] {
    if (this.addRelevance && this.setRelevance) {
    // Relevance sorting is set and active
    return [];
    }
    const sort = this.stateService.load(StateService.STATE_KEY_COLLECTION_SORT  + '.' + id);
    if (sort) {
      const sortings: Sortings = this.appConfigData.getConfiguredSortings()
        .filter((s: Sortings) => s.name === sort.split('|')[0])[0];
        return sort.split('|')[1] === 'desc' ? sortings.desc : sortings.asc;
    }
    return this.getDefaultSortCriteria(id);
  }
  public getDefaultSortCriteria(id: number): SortCriterium[] {
    const sorts = this.appConfigData.getCollectionConfiguredSortOptions(id);
    if (sorts && sorts.length) {
      /*
       * Sorting is defined for the current collection, sort on the first one
       */
      const sortings: Sortings = this.appConfigData.getConfiguredSortings()
        .filter((s: Sortings) => s.name === sorts[0].value)[0];
      return sortings.default === 'desc' ? sortings.desc : sortings.asc;
    }
    return [];
  }
  /*
   * Did we save a sorting in state?
   */
  public getCurrentSort(id: number): string {
    if (this.addRelevance && this.setRelevance) {
      // Relevance ranking is set and active
      return SortCriterium.EDCA_RELEVANCE_VALUE + '|' + SortCriterium.EDCA_RELEVANCE_ORDER;
    }
    const s =  this.stateService.load(StateService.STATE_KEY_COLLECTION_SORT  + '.' + id);
    return s ? s : this.getDefaultSort(id);
  }
  /*
   * The first one mentioned is the default
   */
  private getDefaultSort(id: number): string {
    const opt = this.appConfigData.getCollectionConfiguredSortOptions(id) ||
       this.appConfigData.getCollectionConfiguredSortOptions(0);
    if (opt) {
      if (opt.length > 0) {
        return opt[0].value + '|' + this.appConfigData.getConfiguredSortings()
          .filter(o => o.name === opt[0].value)
          .map(o => o.default);
      }
    }
    return undefined;
  }

}
