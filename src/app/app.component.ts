import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime, map, mergeMap, tap } from 'rxjs/operators';
import { CoreHttpService } from './shared/services/core-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private authService: AuthService,
    private http: CoreHttpService
  ) {}

  @ViewChild('search')
  searchBox: ElementRef | undefined;
  ngOnInit(): void {
    this.authService.autoLogin();
  }

  ngAfterViewInit(): void {
    // streams
    const keyup$ = fromEvent(this.searchBox!.nativeElement, 'keyup');

    // wait .5s between keyups to emit current value
    keyup$
      .pipe(
        map((i: any) => i.currentTarget.value),
        tap((res) => console.log(res)),
        mergeMap(() => this.http.get('http://localhost:3000/')),
        debounceTime(500)
      )
      .subscribe(console.log);
  }
}
