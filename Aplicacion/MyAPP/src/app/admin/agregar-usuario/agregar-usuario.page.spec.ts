import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarUsuarioPage } from './agregar-usuario.page';
import { provideHttpClient } from '@angular/common/http';

describe('AgregarUsuarioPage', () => {
  let component: AgregarUsuarioPage;
  let fixture: ComponentFixture<AgregarUsuarioPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    }).compileComponents;
    fixture = TestBed.createComponent(AgregarUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
