import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  title = 'routrip';
  currentSlide = 0;

  testimonials = [
    {
      name: 'Jane Smith',
      role: 'Travel Enthusiast',
      rating: 5,
      image: './assets/Avatar.png',
      text: 'I love Routrip, this is the best place to plan and help you find your dream holiday.'
    },
    {
      name: 'Joe Doe',
      role: 'Adventure Seeker',
      rating: 5,
      image: './assets/Avatar-2.png',
      text: 'Routrip helped me find hidden gems on my last vacation. Highly recommended!'
    },
    {
      name: 'Sammy Wilson',
      role: 'Backpacker',
      rating: 5,
      image: './assets/Avatar-3.png',
      text: 'The planning tools are amazing, and the recommendations were spot on!'
    }
  ];

  showSlide(index: number) {
    this.currentSlide = index;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
  }
}
