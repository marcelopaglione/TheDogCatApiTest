import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PetService } from 'src/app/service/pet.service';
import { ButtonComponent } from '../dummy/button/button.component';
import { ImgComponent } from '../dummy/img/img.component';
import { ListComponent } from '../dummy/list/list.component';
import { DogsComponent } from './dogs.component';

class DogFakeService {
  getPets() {
    console.log('getPets fake');
    return of({
      body: [
        {
          height: 720,
          id: 'r1Ylge5Vm',
          url: 'https://cdn2.thedogapi.com/images/r1Ylge5Vm_390x256.jpg',
          width: 1081
        }
      ]
    });
  }

  getTitle() {
    return of('Dogs Test').pipe(delay(100));
  }
}

describe('DogsComponent', () => {
  let component: DogsComponent;
  let fixture: ComponentFixture<DogsComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DogsComponent,
        ButtonComponent,
        ListComponent,
        ImgComponent
      ],
      imports: [HttpClientModule],
      providers: [{ provide: PetService, useClass: DogFakeService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.autoDetectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should test title', fakeAsync(() => {
    expect(component.title).toBe('Dogs');

    fixture.whenStable().then(() => {
      expect(component.title).toBe('Dogs Test');
    });
  }));

  it('should test button click', async(() => {
    const buttonSpy = spyOn(component, 'listar');
    const button = debugElement.nativeElement.querySelector('button');
    button.click();

    expect(buttonSpy).toHaveBeenCalledTimes(1);
  }));

  it('should list cards after button click', fakeAsync(() => {
    spyOn(component, 'listar').and.callThrough();
    const button = debugElement.nativeElement.querySelector('button');
    button.click();


    expect(component.listar).toHaveBeenCalled();
    expect(component.dogs).toBeDefined();
    expect(component.dogs.length).toBe(1);

    const img = debugElement.query(By.css('.card-img-top'));
    console.log(debugElement.nativeElement);
    console.log('img', img);

    expect(img).toBeDefined();
    expect(img.properties.height).toBe(720);
    expect(img.properties.width).toBe(1081);
    expect(img.properties.src).toBe(
      'https://cdn2.thedogapi.com/images/r1Ylge5Vm_390x256.jpg'
    );
  }));
});
