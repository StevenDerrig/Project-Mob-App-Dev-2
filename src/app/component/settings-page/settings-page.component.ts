import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
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

  constructor(private router: Router, private toastController: ToastController) { }

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
  async saveSettings() {
    localStorage.setItem('appSettings', JSON.stringify(this.settings));

    // Apply settings to the app
    this.applySettings();
    
    // Show success toast
    const toast = await this.toastController.create({
      message: 'Settings saved successfully',
      duration: 2000,
      position: 'bottom',
      color: 'success',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    
    await toast.present();
  }

  // Reset settings to default values
  async resetSettings() {
    this.settings = { ...this.defaultSettings };
    
    // Save to localStorage
    localStorage.setItem('appSettings', JSON.stringify(this.settings));
    
    // Show toast message that settings have been reset
    const toast = await this.toastController.create({
      message: 'Settings have been reset to default values',
      duration: 2000,
      position: 'bottom',
      color: 'primary',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    
    await toast.present();
  }

  // Apply settings to the app
  applySettings() {
    
    console.log('Settings applied:', this.settings);

    // Example of text size
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      // Remove any existing text size classes
      htmlElement.classList.remove('text-normal', 'text-large', 'text-extra-large');
      // Add the current text size class
      htmlElement.classList.add(`text-${this.settings.textSize}`);
    }

    // Example of high contrast
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