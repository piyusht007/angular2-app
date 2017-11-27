import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FightsComponent } from './fights/fights.component';
import { AppRoutingModule } from './app-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './heroes/dialog/dialog.component';
import { HeroService } from './services/hero.service';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    FightsComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule 
  ],
  providers: [HeroService],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
  ]
})
export class AppModule { }