import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryProductsComponent } from './category-products.component';

describe('CategoryProductsComponent', () => {
  let component: CategoryProductsComponent;
  let fixture: ComponentFixture<CategoryProductsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
