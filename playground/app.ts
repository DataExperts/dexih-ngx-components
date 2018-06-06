import { Component } from '@angular/core';

@Component({
    selector: 'app-component',
    templateUrl: './app.html'
  })
  export class AppComponent {

    public selectedItem: string;
    public textValue = 'text value';

    public selectedItem2 = 1;
    public textValue2: string = null;

    public selectedItem3 = 'cat2 item2';
    public textValue3: string = null;

    public close() {
        alert('close click');
    }

    public show(value: string) {
      alert(value);
    }
  }
