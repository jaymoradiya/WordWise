import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languageTransform'
})
export class LanguageTransformPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.toLowerCase();
  }

}
