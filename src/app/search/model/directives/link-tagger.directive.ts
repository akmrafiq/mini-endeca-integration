import { Directive, Input, HostListener } from '@angular/core';
//import { AdobeTagService } from '@ibfd/adobe';

@Directive({
  selector: '[appLinkTagger]'
})
export class LinkTaggerDirective {
  /**
   * linkCategory
   * Mandatory
   * Every Link is categorized into a few broader categories, for example a link in header falls under category 'navigation'
   * Possible values
   * navigation:
   * when a link is used to navigate to different section of website and such link is present on every page,
   * basically all links on header and footer are navigation link
   * content
   * links that refresh the content of the same page and are used to browse content of a page eg. "load more" link
   * internal
   * when a link takes a user to different page of same domain with in same browser tab
   * external
   * if link takes user to different website on different browser tab, etc.
   * download
   * if user is able to download a file using a link
   */
  @Input() public linkCategory: string;
  /**
   * linkSection
   * Mandatory
   * Location on page where the link is located. This is basically component name in more understandable words
   */
  @Input() public linkSection: string;
  /**
   * linkLabel
   * Optional
   * Header of a link (if present) For example if link 'like' is placed on a blog thumbnail then label is the blog title
   */
  @Input() public linkLabel: string;
  /**
   * linkText
   * Mandatory
   * This is the text on which link is applied and if link is image link then populate with alternate-text of that image
   */
  @Input() public linkText: string;
  /**
   * linkAction
   * Undocumented
   */
  @Input() public linkAction: string;
  /**
   * trackEvent
   * The event to listen on
   * Supported values so far: selectTab, click
   */
  @Input() public trackEvent: string;

  @HostListener('selectTab') onSelectTab() {
    if (this.trackEvent === 'selectTab') {
      this.track();
    }
  }
  @HostListener('click') onClick() {
    if (this.trackEvent === 'click') {
      this.track();
    }
  }
  constructor(
    //public adobe: AdobeTagService
  ) { }

  public track() {
    //this.adobe.trackLinkClick(this.linkCategory, this.linkSection, this.linkLabel, this.linkText, this.linkAction);
  }

}
