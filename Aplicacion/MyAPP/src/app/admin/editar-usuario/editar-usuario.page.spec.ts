import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarUsuarioPage } from './editar-usuario.page';

import { provideHttpClient } from '@angular/common/http';

describe('EditarUsuarioPage', () => {
  let component: EditarUsuarioPage;
  let fixture: ComponentFixture<EditarUsuarioPage>;

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(EditarUsuarioPage);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarUsuarioPage],
      providers: [provideHttpClient()]
    }).compileComponents();
    fixture = TestBed.createComponent(EditarUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
