import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languageTransform',
})
export class LanguageTransformPipe implements PipeTransform {
  transform(value: string): unknown {
    return value.toLowerCase();
  }
}
