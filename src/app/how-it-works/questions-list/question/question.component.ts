import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/app/model/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent{
  @Input()
  question: Question | undefined;

}
