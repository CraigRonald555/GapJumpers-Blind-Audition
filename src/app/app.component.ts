import { Component } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { GraphService } from './graph.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GapJumpers';

  constructor(private firebaseService: FirebaseService, private graphService: GraphService) {}

}
