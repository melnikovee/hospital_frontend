import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectCompletion'
})
export class ProjectCompletionPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (value == undefined) {
      return 'Active';
    }
    return value;
  }

}
