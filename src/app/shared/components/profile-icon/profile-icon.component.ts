import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.css'],
})
export class ProfileIconComponent {
  @Input()
  name: string = '';

  get twoLatter() {
    // let arr: string[] = [];
    // let latter = '';
    // try {
    //    arr = this.name.split('@');
    //    latter = arr[0][0];
    //   } catch (error) {
    //   arr = ["User"];
    //   latter = arr[0][0];
    // }
    let latter = this.name[0];
    return latter.toUpperCase();
  }
}
