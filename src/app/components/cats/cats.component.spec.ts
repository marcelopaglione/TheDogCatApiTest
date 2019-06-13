import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PetService } from 'src/app/service/pet.service';
import { ButtonComponent } from '../dummy/button/button.component';
import { ImgComponent } from '../dummy/img/img.component';
import { ListComponent } from '../dummy/list/list.component';
import { CatsComponent } from './cats.component';


describe('CatsComponent', () => {
  let component: CatsComponent;
  let fixture: ComponentFixture<CatsComponent>;
  let debugElement: DebugElement;

  let service: any;

  beforeEach(async(() => {

    service = jasmine.createSpyObj('PetService', ['getTitle', 'getPets']);
    service.getTitle.and.callFake(() => {
      return of('Dogs');
    });
    service.getPets.and.callFake(() => {
      return of({
        body: [
          {
            id: 'r1Ylge5Vm',
            height: 720,
            width: 1081,
            url: 'https://cdn2.thedogapi.com/images/r1Ylge5Vm_390x256.jpg',
          }
        ]
      });
    });

    TestBed.configureTestingModule({
      declarations: [ CatsComponent, ButtonComponent, ListComponent, ImgComponent ],
      imports: [ HttpClientModule ],
      providers: [{provide: PetService, useValue: service}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.autoDetectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  xit('should test title', fakeAsync(() => {
    pending();
  }));

  xit('should test button click', async(() => {
    pending();
  }));

  it('should list cards after button click', fakeAsync(() => {

    spyOn(component, 'listar');
    const button = debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.listar).toHaveBeenCalledTimes(1);

    expect(component.cats).toBeDefined();
    expect(component.cats.length).toBe(1);

    const img = debugElement.query(By.css('img'));

    // console.log('nativeElement', debugElement.nativeElement.querySelector('img'));
    // console.log('nativeQuery', debugElement.query(By.css('img')));

    expect(img).toBeDefined();
    console.log('img cats', img);
    expect(img.properties).toBeDefined();
    expect(img.properties.height).toBe(720);
    expect(img.properties.src).toBe('https://cdn2.thedogapi.com/images/r1Ylge5Vm_390x256.jpg');
    expect(img.properties.width).toBe(1081);

  }));

});
