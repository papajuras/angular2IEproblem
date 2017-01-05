import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>
<bootstrap-switch [switchId]="'switchId'"
                                      [value]="switchValue"
                                      (switchChange)="switchValue = $event" [disabledCondition]="false"></bootstrap-switch>

`,
})
export class AppComponent  { 
  name = 'Angular';
  switchValue = false;
}
