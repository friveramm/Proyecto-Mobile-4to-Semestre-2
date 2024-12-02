import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectionPage } from './selection.page';
import { Router } from '@angular/router';


describe('SelectionPage', () => {
  let component: SelectionPage;
  let fixture: ComponentFixture<SelectionPage>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['getCurrentNavigation', 'navigate']);

    routerSpy.getCurrentNavigation.and.returnValue({
      extras: {
        state: {
          username: 'testUser', 
          password: 'testPass',
        }
      }
    });

    await TestBed.configureTestingModule({
      declarations: [SelectionPage],
      providers: [{provide: Router, useValue: routerSpy}]
    }).compileComponents;
    
    fixture = TestBed.createComponent(SelectionPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.username).toBe('testUser');
  });
});
