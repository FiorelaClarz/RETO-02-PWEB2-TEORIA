import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieByGenreComponent } from './movie-by-genre.component';

describe('MovieByGenreComponent', () => {
  let component: MovieByGenreComponent;
  let fixture: ComponentFixture<MovieByGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieByGenreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieByGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
