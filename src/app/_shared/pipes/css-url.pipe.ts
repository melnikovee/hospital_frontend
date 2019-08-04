import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Pipe({
  name: 'cssUrl'
})
export class CssUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string | undefined | null): SafeStyle | undefined | null {
    if (value == undefined) {
      return undefined;
    }
    return this.sanitizer.bypassSecurityTrustStyle(
      `url(' ${value} ')`
    );
  }

}
