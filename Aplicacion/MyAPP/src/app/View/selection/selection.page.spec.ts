// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { SelectionPage } from './selection.page';

// describe('SelectionPage', () => {
//   let component: SelectionPage;
//   let fixture: ComponentFixture<SelectionPage>;

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SelectionPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectionPage } from './selection.page';
import { Router } from '@angular/router';

describe('SelectionPage', () => {
  let component: SelectionPage;
  let fixture: ComponentFixture<SelectionPage>;

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
      declarations: [SelectionPage],
      providers: [
        { provide: Router, useValue: routerMock } // Proveemos el mock del Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});