import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/interfaces/trip';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

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
      });
    }
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
