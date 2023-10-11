import { Injectable } from '@angular/core';
import { FilterValuesService } from './filter-values.service';
import { EndecapodService, SearchResult } from '@ibfd/endecapod';
import { Observable } from 'rxjs';
import { Option } from '../model/option';
import { filter, map, take } from 'rxjs/operators';

@Injectable()
export class DimensionFilterValueService implements FilterValuesService {

  constructor(
    private exposeSvc: EndecapodService,
    private mainSvc: EndecapodService
  ) { }

  getValues(id: any): Observable<Option> {
    this.exposeSvc.setName(id + '-ExposeService');
    this.exposeSvc.Copy(this.mainSvc);
    this.exposeSvc.setDym(false);
    this.exposeSvc.SetNe([id]);
    return this.exposeSvc.Query()
      .pipe(
        filter(f => !!f),
        map(r => new SearchResult(r)),
        take(1),
        map((res: SearchResult) => this.toOption(res, id))
      );
  }

  private toOption(res: SearchResult, id: any): Option {
    return <Option>{
      values: res.getDimension(id) && res.getDimension(id).values ? res.getDimension(id).values : []
    };
  }

}
