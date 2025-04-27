import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AppSettings {
  // Accessibility settings
  textSize: string;
  highContrast: boolean;

  // Nutrition limits
  sodiumLimit: number;
  potassiumLimit: number;
  phosphorusLimit: number;

  // Notification settings
  mealReminders: boolean;
  nutrientAlerts: boolean;
}

@Component({
  selector: 'app-settings-page',
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css',
  standalone: true
})
export class SettingsPageComponent implements OnInit {
  // Default settings
  defaultSettings: AppSettings = {
    textSize: 'normal',
    highContrast: false,
    sodiumLimit: 2300,
    potassiumLimit: 3000,
    phosphorusLimit: 800,
    mealReminders: true,
    nutrientAlerts: true
  };

  // Current settings
  settings: AppSettings = { ...this.defaultSettings };

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadSettings();
  }

  // Load saved settings from localStorage
  loadSettings() {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      this.settings = { ...this.defaultSettings, ...JSON.parse(savedSettings) };
    }
  }

  // Save settings to localStorage
  saveSettings() {
    localStorage.setItem('appSettings', JSON.stringify(this.settings));

    // Apply settings to the app (in a real app, you would use a service for this)
    this.applySettings();
  }

  // Reset settings to default values
  resetSettings() {
    this.settings = { ...this.defaultSettings };
    this.saveSettings();
    // Show a toast or alert that settings have been reset
    alert('Settings have been reset to default values');
  }

  // Apply settings to the app (placeholder for now)
  applySettings() {
    // In a real app, you would apply text size, contrast, etc. here
    console.log('Settings applied:', this.settings);

    // Example of how you might apply text size
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      // Remove any existing text size classes
      htmlElement.classList.remove('text-normal', 'text-large', 'text-extra-large');
      // Add the current text size class
      htmlElement.classList.add(`text-${this.settings.textSize}`);
    }

    // Example of how you might apply high contrast
    if (this.settings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }

  // Navigate back to home page
  navigateToHome() {
    this.router.navigate(['/home-page']);
  }
}
