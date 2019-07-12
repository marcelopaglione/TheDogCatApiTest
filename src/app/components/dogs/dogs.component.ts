import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { PetService } from '../../service/pet.service';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html'
})
export class DogsComponent implements OnInit {

  title = 'Dogs';
  dogs: string[] = [];

  constructor(public service: PetService) { }

  ngOnInit() {
    this.service.api = 'dog';
    this.service.getTitle()
      .subscribe(title => {
        this.title = title;
        this.listar();
      });
  }

  listar() {
    this.service.getPets()
      .pipe(
        tap(obj => console.log('listar dogs http', obj)),
        map(http => http.body),
        tap(obj => console.log('listar dogs body', obj)),
      )
      .subscribe(dogs => this.dogs = dogs);
  }

}
