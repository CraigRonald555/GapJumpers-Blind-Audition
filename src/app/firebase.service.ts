import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebaseRTD: AngularFireDatabase) { }

  async retrieveData(reference) {

    let returnValue;

    await this.firebaseRTD.database.ref(reference).once('value')
      .then(snapshot => {

        returnValue = snapshot.val();

      })
      .catch(error => {

        console.log(error);
        returnValue = error;

     });

    //  for (let i = 0;)

    return returnValue;

  }
}
