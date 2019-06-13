import { Component, OnInit, ViewChild } from '@angular/core';
import { DexihToastComponent, ToastMessage, DexihModalComponent } from 'dexih-ngx-components';

@Component({
    selector: 'app-component',
    templateUrl: './app.html'
  })
  export class AppComponent implements OnInit {
    @ViewChild('toasts') toasts: DexihToastComponent;
    @ViewChild('modal') modal: DexihModalComponent;

    public selectedItem0 = 0;

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

    public selectedItem6 = 1;
    public textValue6: string = null;

    public selectedTags = [{key: 1, name: 'item1'}, {key: 3, name: 'item3'}];

    public dynamicItems: string[] = null;

    public modalInformationValue: string;
    public modalConfirmValue: string;
    public modalPromptValue: string;

    ngOnInit() {
    }

    public AddItems() {
        this.dynamicItems = ['item1', 'item2', 'item3'];
    }

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

    public addToasts() {
      this.toasts.add({content: 'This is a success message', title: 'Success', type: 'success', delay: 7000});
      this.toasts.add({content: 'This is a error message', title: 'Error', type: 'error', delay: 5000});
      this.toasts.add({content: 'This is a information message', title: 'Information', type: 'info', delay: 6000});
      this.toasts.add({content: 'This message is huge ' + 'abc '.repeat(200), type: 'info', delay: 6000});
      this.toasts.add({content: 'This one will never close an can be clicked and return 1', type: 'info', delay: -1,
        buttonName: 'click me', reference: '1', onButtonClick: (m) => this.toastClick(m) });
    }

    public addToast(type) {
      this.toasts.add({content: `This is a ${type} message, that will last for 5 seconds`, title: type, type: type, delay: 5000});
    }

    public toastClick(message: ToastMessage) {
      alert('toast click with reference: ' + message.reference );
    }

    public modalInformation() {
      this.modal.information('Information', 'Some important info', 'Okey dokey').then(result => {
        this.modalInformationValue = 'ok';
      }).catch(() => this.modalInformationValue = 'should never happen');
    }

    public modalConfirm() {
      this.modal.confirm('Confirm', 'Do you want to do this <b>bold test<b>', 'Do it', 'escape...').then(result => {
        this.modalConfirmValue = 'confirmed';
      }).catch(() => this.modalConfirmValue = 'cancelled');
    }

    public modalPrompt() {
      this.modal.prompt('Prompt', 'Tell me something', 'The Value:', 'save', 'quit').then(result => {
        this.modalPromptValue = result;
      }).catch(() => this.modalPromptValue = 'cancelled');
    }

  }
