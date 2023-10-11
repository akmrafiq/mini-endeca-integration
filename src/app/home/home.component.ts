import { Component, OnInit } from '@angular/core';
import { map, switchMap, toArray } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { EdcaUrlSerializer, EndecapodService, SearchResult } from '@ibfd/endecapod';
import { NavigationOption } from '../shared/navigation-option';
import { FilterServiceConfig } from '../search/model/filter-service-config';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchResult: SearchResult | boolean = true;
  endecaRecordsUser: any[] = [];
  initialOptions: NavigationOption[] = [];
  offset: number = 0;
  id: number;
  dirty = false;


  /** @internal */
  filterConfig: FilterServiceConfig;
  /** @internal */
  loading: boolean = false;


  constructor(
    private endecapodService: EndecapodService,
    private urlSerializer: EdcaUrlSerializer
  ) {
    this.loadInitQuery();
    this.filterConfig =  {
      "initQuery": "N=3+10&Ne=6185+6201+6332+6593+6680&select=relative_path",
      "endecapodUrl": "/endecapod",
      "awareUrl": "/endecapod/my",
      "topicDimensions": [
        6185,
        6201,
        6332,
        6593,
        6680
      ],
      "suppressedChips": [
        3368,
        3686,
        7487
      ]
    };
  }

  ngOnInit(): void {
    this.endecapodService.setName('DemoEndecaService');
    this.endecapodService.setURL("/endecapod", "/endecapod/my");
    this.endecapodService.Result()
    .subscribe(res => {
      console.log("res", res);
      this.searchResult = res;

      of(this.searchResult['result']['records'])
      .pipe(
        switchMap(records => from(records)),
        map(records => records['records'][0]['properties']),
        toArray()
      )
      .subscribe( sub => {
        console.log("sub", sub);
        this.endecaRecordsUser = sub;
        console.log("endecoRecords", this.endecaRecordsUser);
      })

    })
    this.doSearch();
  }

  private loadInitQuery() {
    this.endecapodService.setName('DemoEndecaService');
    this.endecapodService.setURL("/endecapod", "/endecapod/my");
    this.endecapodService.setSubscriptionAwareness(true);
    this.endecapodService.RegisterParams(this.urlSerializer.parse(`?Ns=sort_date_common|1&N=3+10&Ne=7487&Nu=global_rollup_key&Np=2`).queryParamMap);
    this.endecapodService.SetNe([7742]);
  }

  doSearch(id?: number, reset = false){
    this.dirty = true;
    this.endecaRecordsUser = [];
    if(reset){
      this.id = id;
      this.endecapodService.SetN([3, 10, this.id]);
      this.offset = 0;
    }
    console.log("doSearch id", this.id);
    console.log("doSearch offset", this.offset);
    this.endecapodService.Paginate(this.offset);
    this.endecapodService.DoSearch();
  }

  next(){
    this.endecapodService.Paginate(this.offset);
    this.offset = this.offset + 10;
    this.doSearch(this.id);
  }

  previous(){
    this.endecapodService.Paginate(this.offset);
    if(this.offset - 10 < 0) {
      this.offset = 0;
    } else {
      this.offset = this.offset - 10;
    }
    this.doSearch(this.id);
  }
}
