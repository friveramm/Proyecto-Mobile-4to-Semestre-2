// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { PasajeroPage } from './pasajero.page';

// import { provideHttpClient } from '@angular/common/http';

// describe('PasajeroPage', () => {
//   let component: PasajeroPage;
//   let fixture: ComponentFixture<PasajeroPage>;

//   // beforeEach(() => {
//   //   fixture = TestBed.createComponent(PasajeroPage);
//   //   component = fixture.componentInstance;
//   //   fixture.detectChanges();
//   // });

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [PasajeroPage],
//       providers: [provideHttpClient()]
//     }).compileComponents();
//     fixture = TestBed.createComponent(PasajeroPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasajeroPage } from './pasajero.page';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('PasajeroPage', () => {
  let component: PasajeroPage;
  let fixture: ComponentFixture<PasajeroPage>;

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
      declarations: [PasajeroPage],
      providers: [
        provideHttpClient(),
        { provide: Router, useValue: routerMock } // Proveemos el mock del Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
