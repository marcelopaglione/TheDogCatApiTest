import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {

  @Input() items;
  @Input() propertyName;
  @Input() footer = 'Last updated 3 mins ago';

  constructor() { }


}
