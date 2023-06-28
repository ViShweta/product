import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyproductPage } from './myproduct.page';

describe('MyproductPage', () => {
  let component: MyproductPage;
  let fixture: ComponentFixture<MyproductPage>;

  beforeEach(async (() => {
    fixture = TestBed.createComponent(MyproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
