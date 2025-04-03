// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthorsComponent } from './app/authors/authors.component';

bootstrapApplication(AuthorsComponent, {
  providers: [provideHttpClient(withFetch())] 
});
