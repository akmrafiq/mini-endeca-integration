import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkTaggerDirective } from '../../model/directives/link-tagger.directive';




@NgModule({
  declarations: [LinkTaggerDirective],
  imports: [CommonModule],
  exports: [LinkTaggerDirective]
})
export class LinktaggerModule { }
