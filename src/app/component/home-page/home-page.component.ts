import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [IonicModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone: true,
})
export class HomePageComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialization logic can go here
  }

  // Navigation methods
  navigateToLogging(): void {
    this.router.navigate(['/logging-page']);
  }

  navigateToDaily(): void {
    this.router.navigate(['/daily-sum-page']);
  }

  navigateToScan(): void {
    this.router.navigate(['/scan-prod-page']);
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings-page']);
  }
}
