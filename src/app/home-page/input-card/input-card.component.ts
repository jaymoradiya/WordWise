import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked, HostListener } from '@angular/core';

@Component({
  selector: 'app-input-card',
  templateUrl: './input-card.component.html',
  styleUrls: ['./input-card.component.css']
})
export class InputCardComponent implements OnInit, AfterViewChecked{

  @ViewChild('fileInput') 
  fileInput : ElementRef<HTMLInputElement> | undefined;
  @ViewChild('previewFile') 
  previewFile : ElementRef<HTMLIFrameElement> | undefined;
  @ViewChild('captureArea') 
  captureArea : ElementRef<HTMLDivElement> | undefined;
  savedFiles: string[]  = [];
  error: string = "";
  dragAreaClass: string = "";
  
  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }

  @HostListener("keydown", ["$event"]) onKeyDown(event: any){
    console.log("keydown");
  }
  // @HostListener("paste", ["$event"]) onPaste(event: any){
  //   event.preventDefault();
  //     let paste = (event.clipboardData).getData('text');
  //     console.log(paste);
  // }

 
  constructor(){}

  ngOnInit() {
    this.dragAreaClass = "dragarea";
    
  }

  ngAfterViewChecked(): void {
    this.captureArea!.nativeElement!.onpaste = (event: any) => {
      event.preventDefault();
      let paste = (event.clipboardData).getData('text');
      console.log(paste);
    };
  }

  onFileChange (event: any) {
      const files:FileList  = this.fileInput!.nativeElement!.files!;
      if (files?.length == 0){
      }
      else{
        this.saveFiles(files);
      }
  }

  saveFiles(files: FileList) {
    if (files.length > 1) this.error = "Only one file at time allow";
    else {
      this.error = "";
      for (let i = 0; i < files.length; i++) {
       
        const reader = new FileReader();
        reader.readAsDataURL(files[i]); // Read file as data url
        reader.onloadend = (e) => { // function call once readAsDataUrl is completed
          this.savedFiles = [reader.result as string]; // Set image in element
          this.previewFile!.nativeElement.src = (reader.result as string);
        };
      }
    }
  }

  previewFileClass(){
    return {
      "show": this.savedFiles.length != 0
    }
  }
}
