import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  animations: [],
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})

export class ImgComponent  {
  @Input() src: string;
  @Input() width: number;
  @Input() height: number;
  @Input() alt = 'not found';
}
