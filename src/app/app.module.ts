import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchModule, FilterService } from './search/search.module';
import { EdcaUrlSerializer, EndecapodModule, EndecapodService } from '@ibfd/endecapod';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './search/service/app-config.service';
import { LinktaggerModule } from './search/lib/linktagger/linktagger.module';
import { FilterComponent } from './search/filter/filter.component';

const appConfigFactory = (appConfigService: AppConfigService) => {
  return () => appConfigService.loadAppConfig();
};

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchModule,
    EndecapodModule,
    HttpClientModule,
    LinktaggerModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [
    EndecapodService,
    FilterService,
    {
    provide: APP_INITIALIZER,
    useFactory: appConfigFactory,
    multi: true,
    deps: [AppConfigService]
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
