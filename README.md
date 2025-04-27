Kidney Health Tracker
This is a prototype that demonstrates what I have in mind for the overall app.

Context
Kidney patients have strict dietary restrictions, that makes it hard to track and maintain, on what they can eat and drink.

An older family member of mine has been recently diagnosed with kidney disease. The objective of this app is to help my family member and older kidney patients to keep track of their diet intake.

Many of the apps aren't designed with older users in mind, hence my app idea and design approach to the prototype.

It is recommended for patients of kidney disease to track and monitor their sodium, potassium and phosphorus intake.
This can be overwhelming and time consuming, which is why I want to add the scan feature to get immediate feedback on whether food items are safe or not for their current condition.

Problem Statement

Kidney patients have a hard time to make informed decisions while shopping, as the ingredients and nutritional information can be overwhelming to get through.
Older patients would need simple and actionable guidance on dietary choices specific to kidney health.

Proposed Solution

The solution I propose to this, is a simplified health tracking app, specifically designed in mind for older and non-tech savvy people.

Key features:
-Barcode scanner, to identify product information, in a concise manner.
-Color-coded nutritional information, traffic light system.
-Daily intake organised by date and mealtimes.
-Alternative suggestions, for unsafe foods, or are high in sodium, potassium and phosphorus.
-Accessible interface for older users and non-tech savvy.

Design principles:
-High contrast colours and large touch targets.
-Minimal steps to complete tasks (example toggle button for settings).
-Clear and direct language.
-Consistent navigation patterns.

Benefits:
-Immediate feedback on product information in regard to kidney health.
-Simplified tracking of specific kidney nutrients.
-Actionable alternatives for products when they are unsuitable.
-Easy sharing and logging of dietary information with healthcare providers.
Technology Implementation
•	Angular 19.2.3 as the main framework
•	Ionic UI components for mobile-friendly design
•	TypeScript for enhanced development
•	LocalStorage for data persistence

Project Structure
Key Components
1. Home Page: Central dashboard with quick access to main features
2. Logging Page: Food intake tracking organized by meal types
3. Daily Summary: Visual nutrient tracking with color-coded indicators
4. Scan Product: Simulated barcode scanning with traffic light feedback
5. Settings: Accessibility options and personalization

Installation Instructions
1. Clone this repository
2. Run npm install to install dependencies
3. Run ng serve to start the development server
4. Navigate to http://localhost:4200/ in your browser

Further consideration:
-Test the app with kidney patients to validate design choices.
-Integrate with nutritional and healthcare databases for comprehensive product information. -Implement actual barcode scanning functionality -Add backend services for data persistence -Enhance the alternative suggestion algorithm
