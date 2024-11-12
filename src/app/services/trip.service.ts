import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Trip } from '../interfaces/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private tripsCollection = this.afs.collection<Trip>('trips');

  constructor(private afs: AngularFirestore) {}

  // Create a new trip
  createTrip(trip: Trip) {
    return this.tripsCollection.add(trip);
  }

  // Get all trips
getTrips(): Observable<Trip[]> {
  return this.tripsCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Trip;
      const id = a.payload.doc.id;

      // Remove id from data to avoid conflict during spread
      const { id: _, ...tripData } = data;

      return { id, ...tripData };
    }))
  );
}


  // Get a single trip by ID
// Get a single trip by ID
getTripById(id: string): Observable<Trip> {
  return this.afs.collection('trips').doc<Trip>(id).valueChanges().pipe(
    map(trip => trip || this.getEmptyTrip())  // If the trip doesn't exist, return an empty trip object
  );
}

// Method to return a default (empty) trip if the trip doesn't exist
private getEmptyTrip(): Trip {
  return {
    id: '',
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    peopleQuantity: 0,
    images: [],
    memoryImages: [],
    coordinates: { lat: 0, lng: 0 },
    days: []
  };
}


  // Update a trip
  updateTrip(id: string, trip: Trip) {
    return this.afs.collection('trips').doc(id).update(trip);
  }

  // Delete a trip
  deleteTrip(id: string) {
    return this.afs.collection('trips').doc(id).delete();
  }
}

