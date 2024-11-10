import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecPassPage } from './rec-pass.page';

describe('RecPassPage', () => {
  let component: RecPassPage;
  let fixture: ComponentFixture<RecPassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
