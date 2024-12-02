// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ChoferPage } from './chofer.page';

// import { provideHttpClient } from '@angular/common/http';

// describe('ChoferPage', () => {
//   let component: ChoferPage;
//   let fixture: ComponentFixture<ChoferPage>;

//   // beforeEach(() => {
//   //   fixture = TestBed.createComponent(ChoferPage);
//   //   component = fixture.componentInstance;
//   //   fixture.detectChanges();
//   // });

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ChoferPage],
//       providers: [provideHttpClient()]
//     }).compileComponents();
//     fixture = TestBed.createComponent(ChoferPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChoferPage } from './chofer.page';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

import { MatAutocompleteModule} from '@angular/material/autocomplete';

describe('ChoferPage', () => {
  let component: ChoferPage;
  let fixture: ComponentFixture<ChoferPage>;

  beforeEach(() => {
    // Mock del Router
    const routerMock = {
      getCurrentNavigation: () => ({
        extras: {
          state: {
            username: 'testUser',
            password: 'testPassword'
          }
        }
      })
    };

    TestBed.configureTestingModule({
      declarations: [ChoferPage],
      imports: [MatAutocompleteModule],
      providers: [
        { provide: Router, useValue: routerMock }, // Proveemos el mock del Router
        provideHttpClient(),
        AlertController // Inyectamos el AlertController si es necesario
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
