import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css'],
})
export class HowItWorksComponent {
  answer = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  setAnswer(question: any) {
    this.answer = question.answer;
    this.router.navigate([question.index], { relativeTo: this.route });
  }
}
