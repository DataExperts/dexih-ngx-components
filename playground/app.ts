import { Component } from '@angular/core';

@Component({
    selector: 'app-component',
    templateUrl: './app.html'
  })
  export class AppComponent {

    public close() {
        alert('close click');
    }

    public show(value: string) {
      alert(value);
    }
  }
