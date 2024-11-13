import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/interfaces/trip';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as L from 'leaflet';  // Import Leaflet

@Component({
  selector: 'app-trip-page',
  templateUrl: './trip-page.component.html',
  styleUrls: ['./trip-page.component.scss']
})
export class TripPageComponent implements OnInit {
  panelOpenState = false;
  trip$: Observable<Trip> | undefined;
  showModal: boolean = false;
  currentImageIndex: number = 0; 
  tripImages: string[] = []; 
  currentImage: string = ''; 

  // Map variable to store the Leaflet map instance
  map: L.Map | undefined;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      this.trip$ = this.tripService.getTripById(tripId);
      this.trip$.subscribe(trip => {
        if (trip.images && trip.images.length > 0) {
          this.tripImages = trip.images;
          this.currentImage = this.tripImages[this.currentImageIndex]; 
        }

        // After fetching the trip, set up the map with the coordinates
        if (trip.coordinates && trip.coordinates.lat && trip.coordinates.lng) {
          this.initMap(trip.coordinates.lat, trip.coordinates.lng);
        }
      });
    }
  }

  // Initialize the map with the provided latitude and longitude
  initMap(lat: number, lng: number): void {
    if (this.map) {
      this.map.remove();  // Remove existing map if already initialized
    }

    // Create the map centered at the provided coordinates
    this.map = L.map('map').setView([lat, lng], 12);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // // Add a marker at the coordinates
    // L.marker([lat, lng]).addTo(this.map)
    //   .bindPopup('<b>Trip Location</b>')
    //   .openPopup();
  }

  changeImage(direction: number): void {
    if (this.tripImages.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + direction + this.tripImages.length) % this.tripImages.length;
      this.currentImage = this.tripImages[this.currentImageIndex];
    }
  }

  showDeleteModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  deleteTrip() {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      this.tripService.deleteTrip(tripId).then(() => {
        this.router.navigate(['/all-trips']);
      }).catch((error) => {
        console.error("Error deleting trip:", error);
      });
    }
  }
}
