import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { PetService } from '../../service/pet.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html'
})
export class CatsComponent implements OnInit {

  title = 'Cats';
  cats: string[] = [];

  constructor(private service: PetService) { }

  ngOnInit() {
    this.service.getTitle()
      .subscribe(title => {
        this.title = title;
        this.listar();
      });
  }

  listar() {
    this.service.getPets()
      .pipe(
        tap(console.log),
        map(http => http.body),
        tap(console.log)
      )
      .subscribe(cats => this.cats = cats);
  }

}
