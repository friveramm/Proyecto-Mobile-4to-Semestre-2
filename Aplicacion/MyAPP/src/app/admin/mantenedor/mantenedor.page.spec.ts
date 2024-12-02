import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenedorPage } from './mantenedor.page';
import { ApiControllerServiceService } from 'src/app/Servicios/api-controller-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

class ApiControllerServiceServiceMock {
  getUsers() {
    return of([{ username: 'user1' }, { username: 'user2' }]); // Simulamos la respuesta con usuarios
  }

  deleteUser(username: string) {
    return of({ message: 'Usuario eliminado exitosamente' }); // Simulamos una respuesta de eliminación
  }
}

describe('MantenedorPage', () => {
  let component: MantenedorPage;
  let fixture: ComponentFixture<MantenedorPage>;
  let routerMock: jasmine.SpyObj<Router>;
  let apiMock: ApiControllerServiceServiceMock;
  let activatedRouteMock: any;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    
    // Mock de ActivatedRoute con valores simulados
    activatedRouteMock = {
      paramMap: of({ get: (key: string) => key === 'refresh' ? 'true' : null }) // Simulamos el parámetro 'refresh'
    };

    apiMock = new ApiControllerServiceServiceMock();

    TestBed.configureTestingModule({
      declarations: [MantenedorPage],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ApiControllerServiceService, useValue: apiMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }],
    }).compileComponents();
    fixture = TestBed.createComponent(MantenedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.users.length).toBe(2);  
    expect(component.users[0].username).toBe('user1');  
  });
});
