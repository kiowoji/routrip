import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/interfaces/trip';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trip-page',
  templateUrl: './trip-page.component.html',
  styleUrls: ['./trip-page.component.scss']
})
export class TripPageComponent implements OnInit {
  panelOpenState = false;
  trip$: Observable<Trip> | undefined;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    // Get the trip ID from the URL
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      // Fetch the trip data from the service
      this.trip$ = this.tripService.getTripById(tripId);
    }
  }
}
