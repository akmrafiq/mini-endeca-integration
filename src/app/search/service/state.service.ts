import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public static readonly STATE_KEY_COLLECTION_HOME = 'collection.home';
  public static readonly STATE_KEY_HAS_DIMENSION_VALUES = 'collection.home.dimension.values';
  public static readonly STATE_KEY_COLLECTION_SORT = 'collection.sort';
  public static readonly STATE_KEY_MORE_FILTER = 'filter.showmoreifavailable';
  public static readonly STATE_KEY_TOPIC_SEARCH_LOADING = 'topic-search.loading';
  public static readonly STATE_KEY_DOCUMENT_HIGHLIGHTER_KEY = 'document.highlighter';
  public static readonly STATE_KEY_DOCUMENT_LANGUAGE_VERSION = 'document.language-version';
  public static readonly STATE_KEY_DIFFY_DOC_HIGHLIGHTER = 'document.diffy.highlighter';
  public static readonly STATE_KEY_TOUR_PER_USER_SESSION = 'tour.per.user.session';
  public static readonly STATE_KEY_TOPIC_SEARCH_CLEAN = 'topic-search.clean';

  private ping: BehaviorSubject<string> = new BehaviorSubject('');
  private hashmap: Map<string, string> = new Map();

  constructor() { }

  private _ping(val: string): string {
    this.ping.next(val);
    return val;
  }
  private _useSessionStorage(): boolean {
    return window.sessionStorage !== undefined;
  }
  /*
   * Triggered on a store event
   * Publishes true if succesfull, false otherwise.
   */
  public Pong(): Observable<string> {
    return this.ping.asObservable();
  }

  public load(key: string): string {
    if (this._useSessionStorage()) {
      return sessionStorage.getItem(key);
    } else {
      return this.hashmap.get(key);
    }
  }
  public save(key: string, value: string): void {
    if (this._useSessionStorage()) {
      sessionStorage.setItem(key, value);
    } else {
      this.hashmap.set(key, value);
    }
    this._ping(key);
  }
  public delete(key: string): void {
    if (this._useSessionStorage()) {
      sessionStorage.removeItem(key);
    } else {
      this.hashmap.delete(key);
    }
    this._ping(key);
  }
}
