import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarUsuarioPage } from './editar-usuario.page';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('EditarUsuarioPage', () => {
  let component: EditarUsuarioPage;
  let fixture: ComponentFixture<EditarUsuarioPage>;

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
    fixture = TestBed.createComponent(EditarUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.username).toBe('testUser');
  });
});
