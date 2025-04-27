import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Alternative {
  name: string;
  sodium: number;
  sodiumClass: string;
  potassium: number;
  potassiumClass: string;
  phosphorus: number;
  phosphorusClass: string;
}

interface Product {
  name: string;
  barcode: string;
  sodium: number;
  sodiumPercentage: number;
  sodiumClass: string;
  sodiumStatus: string;
  potassium: number;
  potassiumPercentage: number;
  potassiumClass: string;
  potassiumStatus: string;
  phosphorus: number;
  phosphorusPercentage: number;
  phosphorusClass: string;
  phosphorusStatus: string;
  safetyClass: string;
  safetyMessage: string;
  alternatives: Alternative[];
}

@Component({
  selector: 'app-scan-prod-page',
  imports: [IonicModule, CommonModule],
  templateUrl: './scan-prod-page.component.html',
  styleUrl: './scan-prod-page.component.css',
  standalone: true
})
export class ScanProdPageComponent implements OnInit {
  showProductInfo: boolean = false;

  // Default empty product
  product: Product = {
    name: '',
    barcode: '',
    sodium: 0,
    sodiumPercentage: 0,
    sodiumClass: 'green',
    sodiumStatus: 'Safe',
    potassium: 0,
    potassiumPercentage: 0,
    potassiumClass: 'green',
    potassiumStatus: 'Safe',
    phosphorus: 0,
    phosphorusPercentage: 0,
    phosphorusClass: 'green',
    phosphorusStatus: 'Safe',
    safetyClass: 'safe',
    safetyMessage: 'Safe for kidney patients',
    alternatives: []
  };

  // Mock product data for demonstration
  mockProducts: Product[] = [
    {
      name: 'Canned Vegetable Soup',
      barcode: '123456789',
      sodium: 750,
      sodiumPercentage: 65,
      sodiumClass: 'yellow',
      sodiumStatus: 'Moderate - watch your intake',
      potassium: 450,
      potassiumPercentage: 30,
      potassiumClass: 'green',
      potassiumStatus: 'Good - low potassium',
      phosphorus: 120,
      phosphorusPercentage: 30,
      phosphorusClass: 'green',
      phosphorusStatus: 'Good - low phosphorus',
      safetyClass: 'caution',
      safetyMessage: 'Caution - High sodium',
      alternatives: [
        {
          name: 'Low-Sodium Vegetable Soup',
          sodium: 140,
          sodiumClass: 'green',
          potassium: 300,
          potassiumClass: 'green',
          phosphorus: 90,
          phosphorusClass: 'green'
        },
        {
          name: 'Homemade Vegetable Broth',
          sodium: 70,
          sodiumClass: 'green',
          potassium: 250,
          potassiumClass: 'green',
          phosphorus: 60,
          phosphorusClass: 'green'
        }
      ]
    },
    {
      name: 'Cheese Crackers',
      barcode: '987654321',
      sodium: 950,
      sodiumPercentage: 85,
      sodiumClass: 'red',
      sodiumStatus: 'High - avoid if possible',
      potassium: 150,
      potassiumPercentage: 10,
      potassiumClass: 'green',
      potassiumStatus: 'Good - low potassium',
      phosphorus: 350,
      phosphorusPercentage: 70,
      phosphorusClass: 'yellow',
      phosphorusStatus: 'Moderate - watch your intake',
      safetyClass: 'avoid',
      safetyMessage: 'Not recommended - High sodium',
      alternatives: [
        {
          name: 'Rice Cakes',
          sodium: 60,
          sodiumClass: 'green',
          potassium: 30,
          potassiumClass: 'green',
          phosphorus: 40,
          phosphorusClass: 'green'
        },
        {
          name: 'Low-Sodium Crackers',
          sodium: 120,
          sodiumClass: 'green',
          potassium: 60,
          potassiumClass: 'green',
          phosphorus: 80,
          phosphorusClass: 'green'
        }
      ]
    }
  ];

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    
  }

  // Mock scanning functionality
  Scan() {
    // Randomly select one of the mock products
    const randomIndex = Math.floor(Math.random() * this.mockProducts.length);
    this.product = this.mockProducts[randomIndex];
    
    // Show product info
    this.showProductInfo = true;
    
    // In a real app, you would integrate with the camera here
    // and use an API to get product information
  }

  // Reset to scan view
  resetScan() {
    this.showProductInfo = false;
  }

  // Add scanned product to food log
  addToLog() {
    // Navigate to the logging page with the product info
    this.router.navigate(['/logging-page'], {
      queryParams: { productName: this.product.name, addProduct: 'true',
        date: new Date().toISOString().split('T')[0] }
    });
  }

  // Navigate back to home page
  navigateToHome() {
    this.router.navigate(['/home-page']);
  }

  // This function would call an API to get alternative foods
  // It's just a placeholder for now
  getSaferAlternatives(product: string) {
    // Example API call
    // this.http.get('https://your-api-endpoint/alternatives?product=' + product)
    //   .subscribe(
    //     (data: any) => {
    //       // Process API response
    //       this.product.alternatives = data.map((item: any) => {
    //         return {
    //           name: item.name,
    //           sodium: item.sodium,
    //           sodiumClass: this.getNutrientClass(item.sodium, 300),
    //           potassium: item.potassium,
    //           potassiumClass: this.getNutrientClass(item.potassium, 800),
    //           phosphorus: item.phosphorus,
    //           phosphorusClass: this.getNutrientClass(item.phosphorus, 200)
    //         };
    //       });
    //     },
    //     error => {
    //       console.error('Error fetching alternatives', error);
    //     }
    //   );
  }

  // Helper function to determine nutrient classification
  getNutrientClass(value: number, threshold: number): string {
    if (value < threshold * 0.5) return 'green';
    if (value < threshold * 0.8) return 'yellow';
    return 'red';
  }
}
