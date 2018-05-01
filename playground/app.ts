import { Component } from '@angular/core';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app',
    templateUrl: './app.html'
  })
  export class AppComponent {

    public close() {
        alert('close click');
    }

    public show(value) {
      alert(value);
    }
  }
