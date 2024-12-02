import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasajeroPage } from './pasajero.page';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('PasajeroPage', () => {
  let component: PasajeroPage;
  let fixture: ComponentFixture<PasajeroPage>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['getCurrentNavigation', 'navigate']);

    routerSpy.getCurrentNavigation.and.returnValue({
      extras: {
        state: {
          username: 'testUser', 
          password: 'testPass',
        }
      }
    });

    TestBed.configureTestingModule({
      providers: [provideHttpClient(),{provide: Router ,useValue: routerSpy }]
    }).compileComponents;
    fixture = TestBed.createComponent(PasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.username).toBe('testUser');
  });
});
