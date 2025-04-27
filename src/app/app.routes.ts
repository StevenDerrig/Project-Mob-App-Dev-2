import { Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home-page',
        pathMatch: 'full'
    },
    {
        path: 'home-page',
        component: HomePageComponent
    },
    {
        path: 'logging-page',
        loadComponent: () => import('./component/logging-page/logging-page.component').then(m => m.LoggingPageComponent)
    },
    {
        path: 'daily-sum-page',
        loadComponent: () => import('./component/daily-sum-page/daily-sum-page.component').then(m => m.DailySumPageComponent)
    },
    {
        path: 'scan-prod-page',
        loadComponent: () => import('./component/scan-prod-page/scan-prod-page.component').then(m => m.ScanProdPageComponent)
    },
    {
        path: 'settings-page',
        loadComponent: () => import('./component/settings-page/settings-page.component').then(m => m.SettingsPageComponent)
    },
    {
        path: '**',
        redirectTo: 'home-page'
    }
];
