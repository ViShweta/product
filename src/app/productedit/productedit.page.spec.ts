import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProducteditPage } from './productedit.page';

describe('ProducteditPage', () => {
  let component: ProducteditPage;
  let fixture: ComponentFixture<ProducteditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProducteditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
