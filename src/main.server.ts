import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { provideHttpClient, withFetch } from '@angular/common/http'; 

const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(withFetch()), 
      ...config.providers             
    ]
  });

export default bootstrap;
