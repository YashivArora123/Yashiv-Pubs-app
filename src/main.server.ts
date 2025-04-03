// src/main.server.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { provideHttpClient, withFetch } from '@angular/common/http'; // ✅ Add this

const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(withFetch()), // ✅ Enables fetch for SSR
      ...config.providers              // ✅ Retain existing SSR config
    ]
  });

export default bootstrap;
