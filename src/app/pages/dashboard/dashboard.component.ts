// In dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/interfaces/trip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  nearestTrips: Trip[] = [];
  pastTrips: Trip[] = [];
  currentNearestIndex = 0;
  currentPastIndex = 0;

  constructor(private tripService: TripService, private router: Router) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.tripService.getNearestTrips().subscribe(trips => {
      this.nearestTrips = trips;
    });
    
    this.tripService.getPastTrips().subscribe(trips => {
      this.pastTrips = trips;
    });
  }

  goToTrip(tripId: string | undefined): void {
    if (tripId) {
      this.router.navigate([`/trip/${tripId}`]);
    }
  }

  nextNearestTrip(event: Event): void {
    event.stopPropagation();
    if (this.currentNearestIndex < this.nearestTrips.length - 1) {
      this.currentNearestIndex++;
    }
  }

  previousNearestTrip(event: Event): void {
    event.stopPropagation();
    if (this.currentNearestIndex > 0) {
      this.currentNearestIndex--;
    }
  }

  nextPastTrip(event: Event): void {
    event.stopPropagation();
    if (this.currentPastIndex < this.pastTrips.length - 1) {
      this.currentPastIndex++;
    }
  }

  previousPastTrip(event: Event): void {
    event.stopPropagation();
    if (this.currentPastIndex > 0) {
      this.currentPastIndex--;
    }
  }
}

