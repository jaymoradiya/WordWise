import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QUESTIONS } from 'src/app/data/questions';
import { Question } from 'src/app/model/question.model';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent {

  @Output()
  onQuestionSelected = new EventEmitter();
  @ViewChild('app-question')  
  appQuestion: any;
  selectedQuestion: Question | undefined;
  questions = QUESTIONS;

  
  constructor(private route: ActivatedRoute){
  }


  onQuestionSelect(question: Question){
    this.selectedQuestion = question;
    this.onQuestionSelected.emit(question);
  }
}
