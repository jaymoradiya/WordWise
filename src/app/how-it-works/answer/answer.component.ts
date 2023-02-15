import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QUESTIONS } from 'src/app/data/questions';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit{
  @Input()
  answer: string = "";
  
  constructor(private router: Router, private route: ActivatedRoute){

  }


  ngOnInit(): void {
    this.answer = QUESTIONS.find(q=> q.index == (this.route.snapshot.params["id"]))?.answer ?? "No Question Found";
    this.route.params.subscribe(params => {
      this.answer = QUESTIONS.find( q=> q.index == params["id"])?.answer ?? "No Question Found";
    });
  } 

}
