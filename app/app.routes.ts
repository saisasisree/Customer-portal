import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/home/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'inquiry',
        loadComponent: () =>
          import('./pages/home/dashboard/inquiry/inquiry.component').then(
            (m) => m.InquiryComponent
          ),
      },
      {
        path: 'sales-order',
        loadComponent: () =>
          import('./pages/home/dashboard/sales-order/sales-order.component').then(
            (m) => m.SalesOrderComponent
          ),
      },
      {
        path: 'deliveries',
        loadComponent: () =>
          import('./pages/home/dashboard/deliveries/deliveries.component').then(
            (m) => m.DeliveriesComponent
          ),
      },
      {
        path: 'financials',
        loadComponent: () =>
          import('./pages/home/financials/financials.component').then(
            (m) => m.FinancialsComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/home/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
    ],
  },

  // ✅ Move these out of `financials` to render them as full separate routes
  {
    path: 'home/financials/invoice',
    loadComponent: () =>
      import('./pages/home/financials/invoice/invoice.component').then(
        (m) => m.InvoiceComponent
      ),
  },
  {
    path: 'home/financials/payments',
    loadComponent: () =>
      import('./pages/home/financials/payments-aging/payments-aging.component').then(
        (m) => m.PaymentsAgingComponent
      ),
  },
  {
    path: 'home/financials/credit-debit',
    loadComponent: () =>
      import('./pages/home/financials/credit-debit-memo/credit-debit-memo.component').then(
        (m) => m.CreditDebitMemoComponent
      ),
  },
  {
    path: 'home/financials/overall-sales',
    loadComponent: () =>
      import('./pages/home/financials/overall-sales/overall-sales.component').then(
        (m) => m.OverallSalesComponent
      ),
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
