import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [IonicModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone: true,
})
export class HomePageComponent implements OnInit{
  // Add date property
  currentDate: Date = new Date();
  
  // User info
  userName: string = '<Name>'; // Placeholder, would come from a service
  
  // Nutrient values - these would be updated from a service
  sodiumValue: string = '0.01';
  potassiumValue: string = '0.2';
  phosphorusValue: string = '1';
  constructor(private router: Router) { }

  ngOnInit(): void {
    //this.loadUserInfo();
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
