// src/app/app.component.ts
import { Component } from '@angular/core';
import { AuthorsComponent } from './authors/authors.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AuthorsComponent],
  template: `
    <h1>Pubs Dashboard</h1>
    <app-authors></app-authors>
  `
})
export class AppComponent {}
