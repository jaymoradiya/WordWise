import { Component, OnInit } from '@angular/core';
import { Question } from '../model/question.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent {

  answer: string ="";

  constructor(private router: Router, private route: ActivatedRoute){
  }

  setAnswer(question: any){
    this.answer = question.answer;
    this.router.navigate([question.index], {relativeTo: this.route});
  }
}
