import { HttpClientModule } from '@angular/common/http';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { PetService } from './pet.service';

describe('PetsService', () => {
  let service: PetService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.get(PetService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test title empty - sync', (done: DoneFn) => {
    let title: string;

    service.api = '';
    service.getTitle().subscribe(t => {
      title = t;
      expect(title).toBe('Dogs');
      done();
    });
  });

  it('should test title cats- sync', (done: DoneFn) => {
    let title: string;

    service.api = 'cat';
    service.getTitle().subscribe(t => {
      title = t;
      expect(title).toContain('Cats');
      done();
    });
  });

  it('should test title dogs - sync', (done: DoneFn) => {
    let title: string;

    service.api = 'dog';
    service.getTitle().subscribe(t => {
      title = t;
      expect(title).toContain('Dogs');
      done();
    });
  });

  it('should test title - async', async(() => {
    let title: string;

    service.api = '';
    service.getTitle().subscribe(t => {
      title = t;
      expect(title).toContain('Dogs');
    });

    service.api = 'cat';
    service.getTitle().subscribe(t => {
      title = t;
      expect(title).toContain('Cats');
    });

    service.api = 'dog';
    service.getTitle().subscribe(t => {
      title = t;
      expect(title).toContain('Dogs');
    });
  }));

  it('should test title - fakeAsync', fakeAsync(() => {
    let title: string;

    service.api = '';
    service.getTitle().subscribe(t => (title = t));
    tick(service.delayTime);
    expect(title).toContain('Dogs');

    service.api = 'cat';
    service.getTitle().subscribe(t => (title = t));
    tick(service.delayTime);
    expect(title).toContain('Cats');

    service.api = 'dog';
    service.getTitle().subscribe(t => (title = t));
    tick(service.delayTime);
    expect(title).toContain('Dogs');
  }));

  it('should get pets', async(() => {
    let pets: string[];

    const expectedObj = {
      body: [
        {
          id: 'r1Ylge5Vm',
          height: 720,
          width: 1081,
          url: 'https://cdn2.thedogapi.com/images/r1Ylge5Vm_390x256.jpg',
        }
      ]
    };

    spyOn(service, 'getPets').and.returnValue(
      of(expectedObj).pipe(delay(service.delayTime))
    );

    service
      .getPets()
      .pipe(
        tap(console.log),
        map(http => http.body),
        tap(console.log)
      )
      .subscribe(list => {
        pets = list;
        expect(pets).toBeDefined('Dogs list is empty');
        expect(pets.length).toBe(1);
      });
  }));
});
