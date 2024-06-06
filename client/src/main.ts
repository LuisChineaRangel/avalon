import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from 'src/app/app.routes';
import { AppComponent } from 'src/app/app.component';

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(RouterModule.forRoot(routes)), provideAnimationsAsync(), provideHttpClient(), provideAnimationsAsync()]
}).catch(err => console.error(err));
