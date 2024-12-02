// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MantenedorPage } from './mantenedor.page';

// // import { ApiControllerServiceService } from 'src/app/Servicios/api-controller-service.service';
// import { provideHttpClient } from '@angular/common/http';
// import { ActivatedRoute } from '@angular/router';

// describe('MantenedorPage', () => {
//   let component: MantenedorPage;
//   let fixture: ComponentFixture<MantenedorPage>;

//   // beforeEach(() => {
//   //   fixture = TestBed.createComponent(MantenedorPage);
//   //   component = fixture.componentInstance;
//   //   fixture.detectChanges();
//   // });

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [MantenedorPage],
//       // imports: [IonicModule.forRoot(), IonicStorageModule.forRoot()],
//       providers: [provideHttpClient()]
//     }).compileComponents();
//     fixture = TestBed.createComponent(MantenedorPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


// // // VERSION 2
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MantenedorPage } from './mantenedor.page';
// import { provideHttpClient } from '@angular/common/http';
// import { ActivatedRoute } from '@angular/router';
// import { of } from 'rxjs';

// describe('MantenedorPage', () => {
//   let component: MantenedorPage;
//   let fixture: ComponentFixture<MantenedorPage>;

//   beforeEach(() => {
//     // Mock del ActivatedRoute
//     const activatedRouteMock = {
//       snapshot: { paramMap: { get: () => 'some-value' } },
//       queryParams: of({ someQueryParam: 'value' }) // Si usas queryParams
//     };

//     TestBed.configureTestingModule({
//       declarations: [MantenedorPage],
//       providers: [
//         provideHttpClient(),
//         { provide: ActivatedRoute, useValue: activatedRouteMock }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(MantenedorPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

// VERSION 3
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenedorPage } from './mantenedor.page';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MantenedorPage', () => {
  let component: MantenedorPage;
  let fixture: ComponentFixture<MantenedorPage>;

  beforeEach(() => {
    // Mock del ActivatedRoute
    const activatedRouteMock = {
      paramMap: of({
        get: () => 'some-value'  // Simula que 'refresh' es un valor que se pasa en la URL
      }),
      queryParams: of({ someQueryParam: 'value' }) // Si usas queryParams
    };

    TestBed.configureTestingModule({
      declarations: [MantenedorPage],
      providers: [
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MantenedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
