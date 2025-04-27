import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MealData {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
}

@Component({
  selector: 'app-logging-page',
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './logging-page.component.html',
  styleUrl: './logging-page.component.css',
  standalone: true
})
export class LoggingPageComponent implements OnInit {
  // Date handling
  selectedDateStr: string = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  currentDate: Date = new Date();
  selectedDate: Date = new Date();

  // View state
  calendarView: boolean = true;

  // Meals data
  meals: MealData = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  };

  // Preview data
  previewMeals: { type: string, items: string[] }[] = [];
  hasLoggedItems: boolean = false;

  // Add item dialog
  showAddDialog: boolean = false;
  currentMealType: string = '';
  newItemName: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    // Set the initial date string to match the Date object
    this.selectedDateStr = this.formatDate(this.selectedDate);
    // Load saved data if exists
    this.loadMealsForDate(this.selectedDate);
  }

  // Date selection in calendar
  onDateSelected() {
    this.selectedDate = new Date(this.selectedDateStr);
    this.loadMealsForDate(this.selectedDate);
  }

  // Load meals for a specific date
  loadMealsForDate(date: Date) {
    // For demo purposes, use this mock data
    // In a real app, this would load from storage or service
    const dateString = this.formatDate(date);

    // Check if we have stored data
    const storedData = localStorage.getItem(`meals_${dateString}`);

    if (storedData) {
      this.meals = JSON.parse(storedData);

      // Prepare preview data
      this.preparePreviewData();
      this.hasLoggedItems = this.checkIfHasItems();
    } else {
      // Reset meals
      this.meals = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
      };

      this.hasLoggedItems = false;
      this.previewMeals = [];
    }
  }

  // Navigation to home page
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  // Prepare preview data for the calendar view
  preparePreviewData() {
    this.previewMeals = [];

    if (this.meals.breakfast.length > 0) {
      this.previewMeals.push({ type: 'Breakfast', items: this.meals.breakfast });
    }

    if (this.meals.lunch.length > 0) {
      this.previewMeals.push({ type: 'Lunch', items: this.meals.lunch });
    }

    if (this.meals.dinner.length > 0) {
      this.previewMeals.push({ type: 'Dinner', items: this.meals.dinner });
    }

    if (this.meals.snacks.length > 0) {
      this.previewMeals.push({ type: 'Snacks', items: this.meals.snacks });
    }
  }

  // Check if any meals have items
  checkIfHasItems(): boolean {
    return this.meals.breakfast.length > 0 ||
      this.meals.lunch.length > 0 ||
      this.meals.dinner.length > 0 ||
      this.meals.snacks.length > 0;
  }

  // Switch to day view
  showDayView() {
    this.calendarView = false;
  }

  // Switch to calendar view
  showCalendarView() {
    this.calendarView = true;
    // Refresh preview data
    this.preparePreviewData();
  }

  // Navigate to previous day
  previousDay() {
    const prevDate = new Date(this.selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    this.selectedDate = prevDate;
    this.selectedDateStr = this.formatDate(prevDate);
    this.loadMealsForDate(this.selectedDate);
  }

  // Navigate to next day
  nextDay() {
    const nextDate = new Date(this.selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    this.selectedDate = nextDate;
    this.selectedDateStr = this.formatDate(nextDate);
    this.loadMealsForDate(this.selectedDate);
  }

  // Add item to a meal
  addItem(mealType: string) {
    this.currentMealType = mealType;
    this.showAddDialog = true;
    this.newItemName = '';
  }

  // Confirm adding new item
  confirmAdd() {
    if (this.newItemName.trim()) {
      this.meals[this.currentMealType as keyof MealData].push(this.newItemName);
      this.saveMeals();
    }
    this.showAddDialog = false;
  }

  // Cancel adding item
  cancelAdd() {
    this.showAddDialog = false;
  }

  // Remove item from a meal
  removeItem(mealType: string, index: number) {
    this.meals[mealType as keyof MealData].splice(index, 1);
    this.saveMeals();
  }

  // Save meals to storage
  saveMeals() {
    const dateString = this.formatDate(this.selectedDate);
    localStorage.setItem(`meals_${dateString}`, JSON.stringify(this.meals));
    this.hasLoggedItems = this.checkIfHasItems();
  }

  // Format date to string for storage keys
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // View daily summary
  viewDailySummary() {
    this.router.navigate(['/daily-sum-page'], {
      queryParams: { date: this.formatDate(this.selectedDate) }
    });
  }
}
