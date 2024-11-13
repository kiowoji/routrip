import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/interfaces/trip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent implements OnInit {
  trip: Trip = {
    title: '',
    status: '',
    startDate: null,
    endDate: null,
    peopleQuantity: 0,
    coordinates: { lat: 0, lng: 0 },
    images: [],
    memoryImages: [],
    days: []
  };

  isEditMode = false;

  constructor(
    private tripService: TripService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    const handleFirebaseError = (err: any) => {
      console.error('Error creating or updating trip:', err);
      if (err.message.includes('exceeds the maximum allowed size')) {
        window.alert('Error: Selected files are too large. Please choose smaller files.');
      } else {
        window.alert('Error creating or updating trip: ' + err.message);
      }
    };

    if (this.isEditMode) {
      if (this.trip.id) { 
        this.tripService.updateTrip(this.trip.id, this.trip).then(() => {
          console.log('Trip updated successfully');
          this.router.navigate(['/all-trips']); 
        }).catch(handleFirebaseError);
      } else {
        console.error('Trip ID is undefined');
      }
    } else {
      this.tripService.createTrip(this.trip).then(() => {
        console.log('Trip created successfully');
        this.router.navigate(['/all-trips']); 
      }).catch(handleFirebaseError);
    }
  }

  onImageSelect(event: any) {
    const files = event.target.files;
    this.trip.images = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.trip.images.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
    }
  }
}
