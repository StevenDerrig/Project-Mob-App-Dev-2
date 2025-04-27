import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface MealData {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
}

interface DailySummary {
  sodium: number;
  potassium: number;
  phosphorus: number;
}

@Component({
  selector: 'app-daily-sum-page',
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './daily-sum-page.component.html',
  styleUrl: './daily-sum-page.component.css',
  standalone: true
})
export class DailySumPageComponent implements OnInit {
  // Date handling
  selectedDate: Date = new Date();

  // Meals data
  meals: MealData = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  };

  hasLoggedItems: boolean = false;

  // Nutrition data
  dailySummary: DailySummary = {
    sodium: 100,
    potassium: 2900,
    phosphorus: 400
  };

  // Recommended daily limits (in mg)
  sodiumLimit: number = 2300;
  potassiumLimit: number = 3000;
  phosphorusLimit: number = 800;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Check for date parameter from logging page
    this.route.queryParams.subscribe(params => {
      if (params['date']) {
        this.selectedDate = new Date(params['date']);
      }
      this.loadMealsForDate(this.selectedDate);
    });
  }

  // Load meals data for a specific date
  loadMealsForDate(date: Date) {
    const dateString = this.formatDate(date);
    const storedData = localStorage.getItem(`meals_${dateString}`);

    if (storedData) {
      this.meals = JSON.parse(storedData);
      this.hasLoggedItems = this.checkIfHasItems();

      // Calculate nutrition data (using mock data for this prototype)
      this.calculateDailySummary();
    } else {
      // Reset meals and summary
      this.meals = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
      };

      this.dailySummary = {
        sodium: 0,
        potassium: 0,
        phosphorus: 0
      };

      this.hasLoggedItems = false;
    }
  }

  // Calculate daily nutrition summary
  // For prototype, we'll use mock data based on number of items
  calculateDailySummary() {
    // Reset summary
    this.dailySummary = {
      sodium: 0,
      potassium: 0,
      phosphorus: 0
    };

    // Count total items across all meals
    const totalItems =
      this.meals.breakfast.length +
      this.meals.lunch.length +
      this.meals.dinner.length +
      this.meals.snacks.length;

    // For prototype, generate representative values
    // In a real app, this would use actual nutritional data
    if (totalItems > 0) {
      this.dailySummary.sodium = Math.min(this.sodiumLimit * 0.8, totalItems * 350);
      this.dailySummary.potassium = Math.min(this.potassiumLimit * 0.7, totalItems * 400);
      this.dailySummary.phosphorus = Math.min(this.phosphorusLimit * 0.9, totalItems * 120);
    }
  }

  // Navigate back to previous page
  navigateBack() {
    this.router.navigate(['/home-page'], {
      queryParams: { date: this.formatDate(this.selectedDate) }
    });
  }

  // Navigate to logging page
  navigateToLogging() {
    this.router.navigate(['/logging-page'], {
      queryParams: { date: this.formatDate(this.selectedDate) }
    });
  }

  // Navigate to scan page
  navigateToScan() {
    this.router.navigate(['/scan-prod-page']);
  }

  // Check if any meals have items
  checkIfHasItems(): boolean {
    return this.meals.breakfast.length > 0 ||
      this.meals.lunch.length > 0 ||
      this.meals.dinner.length > 0 ||
      this.meals.snacks.length > 0;
  }

  // Previous day navigation
  previousDay() {
    const prevDate = new Date(this.selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    this.selectedDate = prevDate;
    this.loadMealsForDate(this.selectedDate);
  }

  // Next day navigation
  nextDay() {
    const nextDate = new Date(this.selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    this.selectedDate = nextDate;
    this.loadMealsForDate(this.selectedDate);
  }

  // Format date for localStorage keys
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // Calculate percentage for sodium gauge
  getSodiumPercentage(): number {
    return Math.min(100, (this.dailySummary.sodium / this.sodiumLimit) * 100);
  }

  // Determine color class for sodium gauge
  getSodiumClass(): string {
    const percentage = this.getSodiumPercentage();
    if (percentage < 50) return 'green';
    if (percentage < 75) return 'yellow';
    return 'red';
  }

  // Calculate percentage for potassium gauge
  getPotassiumPercentage(): number {
    return Math.min(100, (this.dailySummary.potassium / this.potassiumLimit) * 100);
  }

  // Determine color class for potassium gauge
  getPotassiumClass(): string {
    const percentage = this.getPotassiumPercentage();
    if (percentage < 50) return 'green';
    if (percentage < 75) return 'yellow';
    return 'red';
  }

  // Calculate percentage for phosphorus gauge
  getPhosphorusPercentage(): number {
    return Math.min(100, (this.dailySummary.phosphorus / this.phosphorusLimit) * 100);
  }

  // Determine color class for phosphorus gauge
  getPhosphorusClass(): string {
    const percentage = this.getPhosphorusPercentage();
    if (percentage < 50) return 'green';
    if (percentage < 75) return 'yellow';
    return 'red';
  }
}
