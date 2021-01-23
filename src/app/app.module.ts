import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { ExpandedComponent } from './expanded/expanded.component';

import { ChartsModule } from 'ng2-charts';
import { ReferencesComponent } from './references/references.component';
import { NotesComponent } from './notes/notes.component';

const appRoutes = [

  { path: '', component: SummaryComponent},
  { path: 'references', component: ReferencesComponent},
  { path: 'notes', component: NotesComponent},
  { path: ':jobtitle', component: ExpandedComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    ExpandedComponent,
    ReferencesComponent,
    NotesComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireStorageModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
