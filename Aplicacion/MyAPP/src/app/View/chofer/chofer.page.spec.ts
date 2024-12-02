import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChoferPage } from './chofer.page';
import { Router } from '@angular/router';
import { MatAutocomplete} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiControllerServiceService } from 'src/app/Servicios/api-controller-service.service';
import { provideHttpClient } from '@angular/common/http';


describe('ChoferPage', () => {
  let component: ChoferPage;
  let fixture: ComponentFixture<ChoferPage>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['getCurrentNavigation', 'navigate']);
    const apiSpy = jasmine.createSpyObj('ApiControllerServiceService', ['postTrip']);

    routerSpy.getCurrentNavigation.and.returnValue({
      extras: {
        state: {
          username: 'testUser', 
          password: 'testPass',
        }
      }
    });

    TestBed.configureTestingModule({
      imports: [MatAutocomplete,MatFormFieldModule,MatInputModule, ReactiveFormsModule],
      providers: [{provide: Router ,useValue: routerSpy }, 
        {provide: ApiControllerServiceService, useValue:apiSpy},
        provideHttpClient()
      ]
    }).compileComponents();   
    fixture = TestBed.createComponent(ChoferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.username).toBe('testUser');
  });
});
