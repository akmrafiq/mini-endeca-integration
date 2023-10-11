import { Dimension } from "@ibfd/endecapod";
import { TplField } from "./templatefield";
import { Filter } from "./filter";
import { SelectItem } from "primeng/api";
import { Sortings } from "./sortings";

export enum RecordLabel {
  RECORD = 0,
  RECORDS = 1,
  A_RECORD = 2,
  A_RECORDS = 3,
  ACTION_RECORD = 4,
  ACTION_A_RECORD = 5
}

export class AppConfigData {
  private readonly configMap = {};

  constructor(data: any) {
    Object.keys(data).forEach(key => (this.configMap[key] = data[key]));
  }

  /**
   * Sort collections based on the order in the configuration file
   * @param a
   * @param b
   */
  public sortCollection(a: Dimension, b: Dimension): number {
    const collections = this.getCollections();
    const aN = collections.findIndex(c => c['N'] === a.id);
    const bN = collections.findIndex(c => c['N'] === b.id);
    if (aN === bN) { return 0; }
    if (aN > bN) { return 1; }
    return -1;
  }

  getHomeURL(): string {
    return this.configMap['home_url'];
  }

  getFbSvcURL(): string {
    return this.configMap['feedback-service_url'];
  }

  getAccountURL(): string {
    return this.configMap['account_url'];
  }

  getGlossaryURL(): string {
    return this.configMap['glossary_url'];
  }

  getBusinessEntitiesURL(): string {
    return this.configMap['itgbus_url'];
  }
  getOrganizationTreatiesURL(): string {
    return this.configMap['itgorg_url'];
  }
  getCourtsURL(): string {
    return this.configMap['itgcourts_url'];
  }

  getCopyrightURL(): string {
    return this.configMap['copyright_url'];
  }

  getPrivacyURL(): string {
    return this.configMap['privacy_url'];
  }

  getDisclaimerURL(): string {
    return this.configMap['disclaimer_url'];
  }

  getCookieStmtURL(): string {
    return this.configMap['cookie_stmt_url'];
  }

  getTermsCondURL(): string {
    return this.configMap['terms_cond_url'];
  }

  getTwitterURL(): string {
    return this.configMap['twitter_url'];
  }

  getLinkedInURL(): string {
    return this.configMap['linked_in_url'];
  }

  getCorpURL(): string {
    return this.configMap['corp_url'];
  }

  getResearchURL(): string {
    return this.configMap['research_url'];
  }

  getTrainingURL(): string {
    return this.configMap['training_url'];
  }

  getTrialURL(): string {
    return this.configMap['trial_url'];
  }

  getCatalogURL(): string {
    return this.configMap['catalog_url'];
  }

  getCartURL(): string {
    return this.configMap['cart_url'];
  }

  getCSAEmail(): string {
    return this.configMap['CSA_email'];
  }

  getCSAURL(): string {
    return this.configMap['CSA_url'];
  }

  getSmartPanelURL(): string {
    return this.configMap['piano_url'];
  }

  getError(): any {
    return this.configMap['error'];
  }

  getCartCookieName(): string {
    return this.configMap['cart_cookie_name'];
  }

  getBackendCollectionDimension(): Dimension {
    return this.configMap['backend_collection_dimension'];
  }

  getCollectionDimension(): Dimension {
    return this.configMap['collection_dimension'];
  }

  getCountryDimension(): Dimension {
    return this.configMap['country_dimension'];
  }

  getRelatedCountryDimension(): Dimension {
    return this.configMap['related_country_dimension'];
  }

  getStateProvinceDimension(): Dimension {
    return this.configMap['state_province'];
  }

  getSubCollectionDimension(): Dimension {
    return this.configMap['sub_collection_dimension'];
  }

  getInternationalOrgDimension(): Dimension {
    return this.configMap['international_org_dimension'];
  }

  getKeywordSuggestDimension(): Dimension {
    return this.configMap['keyword_suggest_dimension'];
  }

  getQandADimension(): Dimension {
    return this.configMap['q_and_a_dimension'];
  }

  getEndecapodURL(): string {
    return this.configMap['endecapod']['url'];
  }

  getDWayURL(): string {
    return this.configMap['d-way_url'];
  }

  getDynamicTreatyChartURL(): string {
    return this.configMap['dtchart_url'];
  }

  getFeatureSwitch(feature: string): any {
    return this.configMap['feature_switch'] && this.configMap['feature_switch'][feature];
  }

  getDogeURL(): string {
    return this.configMap['doge_url'];
  }

  getCustosURL(): string {
    return this.configMap['custos_url'];
  }

  getAuthURL(): string {
    return this.configMap['auth_url'];
  }

  getWebshopURL(): string {
    return this.configMap['webshop_url'];
  }

  getLinkresolverXqueryURL(): string {
    return this.configMap['linkresolver_xquery_url'];
  }

  getSeeAlsoResolverURL(): string {
    return this.configMap['seealsoresolver_url'];
  }

  getAwareURL(): string {
    return this.configMap['endecapod']['aware_url'];
  }

  // getLanguageVersionConfig(): LanguageVersionConfig {
  //   return new LanguageVersionConfig(this.configMap['language_versions']);
  // }

  getStateProvinceCodes(): string {
    // TODO: Separate to new config instead of tools
    return this.configMap['tools']['state_province_codes'];
  }

  getSuppressedChips(): number[] {
    return this.configMap['chips'] ? this.configMap['chips']['suppress'] : [];
  }

  getExportJournalCollectionCode(): string[] {
    return this.configMap['export_journal_collection_code'] ? this.configMap['export_journal_collection_code'] : [];
  }

  getInitQuery(): string {
    return this.configMap['endecapod']['initial_query'];
  }

  /*
   * App services
   */

  /*
   * (Sub)Collections related
   */
  private hasCode(collection: any, code: string): boolean {
    if (collection['collection_code']) {
      const found = collection['collection_code'].find(c => c === code);
      return !!found;
    }
    return false;
  }
  getCollectionId(code: string): number {
    const collection = this.getCollections().find(
      col => this.hasCode(col, code)
    );
    return collection ? collection['N'] : 0;
  }
  private getCollections(): Object[] {
    return this.configMap['collections'];
  }

  getCollection(code: string): Object {
    const collection = this.getCollections().find(
      col => this.hasCode(col, code)
    );
    return collection;
  }

  private getTemplates(): Object[] {
    return this.configMap['templates'];
  }
  private getTemplateByName(name: string): TplField[] {
    return this.getTemplates()
      .find(tpl => tpl['name'] === name)['fields'];
  }

  getPageSize(collectionId: number): number {
    const collection = this.getCollections()
      .find(col => col['N'] === collectionId);
    return collection && collection['page_size'] ? collection['page_size'] : this.getDefaultPageSize();
  }

  getRecordLabelByCode(collectionCode: string, label: RecordLabel): string {
    const collection = this.getCollections()
      .find(col => this.hasCode(col, collectionCode));
    const subcollection = collection && collection['subcollections'] &&
      collection['subcollections'].find(sub => this.hasCode(sub, collectionCode));
    if (subcollection && subcollection['label']) {
      return subcollection['label'][label];
    }
    return collection && collection['label'] ? collection['label'][label] : this.getDefaultRecordLabel(label);
  }
  getRecordLabel(collectionId: number, label: RecordLabel): string {
    const collection = this.getCollections()
      .find(col => col['N'] === collectionId);
    return collection && collection['label'] ? collection['label'][label] : this.getDefaultRecordLabel(label);
  }

  getCollectionResultTemplate(category: number, collectionCode: string): TplField[] {
    const collection = this.getCollections()
      .find(col => col['N'] === category && this.hasCode(col, collectionCode));
    const subcollection = collection && collection['subcollections'] &&
      collection['subcollections'].find(sub => this.hasCode(sub, collectionCode));
    if (subcollection && subcollection['template']) {
      return subcollection['template']['name'] ? this.getTemplateByName(subcollection['template']['name']) : subcollection['template'];
    }
    if (collection && collection['template']) {
      return collection['template']['name'] ? this.getTemplateByName(collection['template']['name']) : collection['template'];
    }
    return this.getDefaultCollectionResultTemplate();
  }

  getCollectionConfiguredSortOptions(collectionId: number): SelectItem[] {
    const collection = this.getCollections()
      .find(col => col['N'] === collectionId);
    return collection && collection['sorting'] ? collection['sorting'] : this.getDefaultCollectionConfiguredSortOptions();
  }

  private getDefaultCollectionConfiguredSortOptions(): SelectItem {
    return this.getCollections()
      .find(col => col['N'] === 0)['sorting'];
  }

  getConfiguredSortings(): Sortings[] {
    return this.configMap['sortings'];
  }

  getCollectionFilters(collectionId: number): Filter[] {

    const collection = this.getCollections()
      .find(col => col['N'] === collectionId);
    return collection && collection['filters'] ? collection['filters'] : this.getDefaultCollectionFilters();
  }

  getCollectionActions(collectionId: number): any {
    const collection = this.getCollections()
      .find(col => col['N'] === collectionId);
    return collection && collection['actions'] ? collection['actions'] : this.getDefaultCollectionActions();
  }

  getCollectionFilterThreshold(collectionId: number): number {
    const collection = this.getCollections()
      .find(col => col['N'] === collectionId);
    return collection && collection['filter_threshold'] ? collection['filter_threshold'] : this.getDefaultCollectionFilterThreshold();
  }

  getCollectionAlias(collectionId: number): string {
    const collection = this.getCollections()
      .find(col => col['N'] === collectionId);
    return collection && collection['alias'] ? collection['alias'] : undefined;
  }

  getPropertyAlias(property: string, collectionId: number): string {
    const props = this.getCollections()
      .find(col => col['N'] === collectionId)['properties'];
    const a = props && props.find(f => (f['property'] === property));
    return a ? a['alias'] : this.getDefaultPropertyAlias(property);
  }

  getDimensionAlias(dimensionId: number, collectionId: number): string {
    const dim = this.getCollections()
      .find(col => col['N'] === collectionId)['dimensions'];
    const a = dim && dim.find(f => (f['id'] === dimensionId));
    return a ? a['alias'] : this.getDefaultDimensionAlias(dimensionId);
  }

  getDropdownPrefix(dimensionId: number, collectionId: number): string {
    const dim = this.getCollections()
      .find(col => col['N'] === collectionId)['dimensions'];
    const a = dim && dim.find(f => (f['id'] === dimensionId));
    return a ? a['pfx'] : this.getDefaultDropdownPrefix(dimensionId);
  }

  /*
   * Fallback values
   */

  private getDefaultPageSize(): number {
    return this.getCollections()
      .find(col => col['N'] === 0)['page_size'];
  }

  private getDefaultRecordLabel(label: RecordLabel): string {
    return this.getCollections()
      .find(col => col['N'] === 0)['label'][label];
  }

  private getDefaultCollectionActions(): any {
    return this.getCollections()
      .find(col => col['N'] === 0)['actions'];
  }

  getDefaultPropertyAlias(property: string): string {
    const props = this.getCollections()
      .find(col => col['N'] === 0)['properties'];
    const a = props && props.find(f => (f['property'] === property));
    return a ? a['alias'] : undefined;
  }

  getDefaultDimensionAlias(dimensionId: number): string {
    const dim = this.getCollections()
      .find(col => col['N'] === 0)['dimensions'];
    const a = dim && dim.find(f => (f['id'] === dimensionId));
    return a ? a['alias'] : undefined;
  }

  getDefaultDropdownPrefix(dimensionId: number): string {
    const dim = this.getCollections()
      .find(col => col['N'] === 0)['dimensions'];
    const a = dim && dim.find(f => (f['id'] === dimensionId));
    return a ? a['pfx'] : '';
  }

  private getDefaultCollectionFilters(): Filter[] {
   
    return this.getCollections()
      .find(col => col['N'] === 0)['filters'];
  }

  private getDefaultCollectionResultTemplate(): TplField[] {
    const t = this.getCollections().find(col => col['N'] === 0)['template'];
    return t['name'] ? this.getTemplateByName(t['name']) : t;
  }

  private getDefaultCollectionFilterThreshold(): number {
    return this.getCollections()
      .find(col => col['N'] === 0)['filter_threshold'];
  }
}
