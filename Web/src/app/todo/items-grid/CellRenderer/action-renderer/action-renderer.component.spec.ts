import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRendererComponentComponent } from './action-renderer.component';

describe('ActionRendererComponentComponent', () => {
  let component: ActionRendererComponentComponent;
  let fixture: ComponentFixture<ActionRendererComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionRendererComponentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActionRendererComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
