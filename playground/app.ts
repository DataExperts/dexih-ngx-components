import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-component',
    templateUrl: './app.html'
  })
  export class AppComponent {

    public selectedItem: string;
    public textValue = 'text value';

    public selectedItem2 = 1;
    public textValue2: string = null;

    public selectedItem3: string = null;
    public textValue3 = 'static value';

    public selectedItem4: string = null;
    public textValue4 = 'the text';

    public selectedItem5 = 'cat2 item2';
    public textValue5: string = null;

    public close() {
      alert('close click');
    }

    public show(value: string) {
      alert(value);
    }

    public cancelled() {
      alert('cancelled');
    }

    public progress() {
      alert('progress');
    }

    public selectChange(value: string) {
      alert('selected - ' + value);
    }
  }
