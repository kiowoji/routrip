import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/interfaces/trip';

@Component({
  selector: 'app-all-trips',
  templateUrl: './all-trips.component.html',
  styleUrls: ['./all-trips.component.scss']
})
export class AllTripsComponent implements OnInit {
  trips: Trip[] = [];
  filteredTrips: Trip[] = []; // Array to hold filtered trips
  searchTerm: string = ''; // Holds the search input

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.getTrips().subscribe((trips: Trip[]) => {
      this.trips = trips;
      this.filteredTrips = trips; // Initially, show all trips
    });
  }

  // Method to filter trips based on search term
  filterTrips(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredTrips = this.trips; // If search term is empty, show all trips
    } else {
      this.filteredTrips = this.trips.filter(trip =>
        trip.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}

