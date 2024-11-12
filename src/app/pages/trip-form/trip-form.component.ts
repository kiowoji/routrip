import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/interfaces/trip';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent implements OnInit {
  trip: Trip = {
    title: '',
    startDate: null,
    endDate: null,
    peopleQuantity: 0,
    coordinates: { lat: 0, lng: 0 },
    images: [],
    memoryImages: [],
    days: []
  };

  isEditMode = false;

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.isEditMode) {
      if (this.trip.id) { 
        this.tripService.updateTrip(this.trip.id, this.trip).then(() => {
          console.log('Trip updated successfully');
        }).catch(err => console.error('Error updating trip:', err));
      } else {
        console.error('Trip ID is undefined');
      }
    } else {
      this.tripService.createTrip(this.trip).then(() => {
        console.log('Trip created successfully');
      }).catch(err => console.error('Error creating trip:', err));
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

  onMemoryImageSelect(event: any) {
    const files = event.target.files;
    this.trip.memoryImages = []; 
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.trip.memoryImages.push(e.target.result); 
      };
      reader.readAsDataURL(files[i]);
    }
  }
}
