# Subscription + Usage-Based Billing Engine

A production-grade backend for a SaaS billing engine built with Node.js, TypeScript, and MongoDB.

## Problem Statement
Building a flexible billing system that handles both flat-rate subscriptions and usage-based metering is complex. This project provides a robust, scalable architecture to manage plans, subscriptions, usage tracking, and invoice generation, separating business logic from framework concerns.

## Billing Flow Overview
1. **Organization Creation**: A tenant (Organization) signs up.
2. **Subscription**: The Organization subscribes to a **Plan** (monthly/yearly).
3. **Usage Tracking**: As the Organization uses the product, **Usage** events are sent to the API.
4. **Billing Cycle**: A background job runs daily to check for subscriptions ending their period.
5. **Invoice Generation**: The system aggregates usage, calculates costs based on the Plan, and generates an **Invoice**.
6. **Payment**: The Invoice is attempted for payment (via mocked gateway).

## Architecture

```
[Client] -> [API Layer (Controllers)] -> [Service Layer (Business Logic)] -> [Data Access (Mongoose Models)]
                                                  |
                                                  v
                                          [Background Jobs]
```

## Data Models Summary
- **User**: Authentication & role management.
- **Organization**: The entity being billed (tenant).
- **Plan**: Defines pricing, interval, and features.
- **Subscription**: Links an Organization to a Plan with cycle dates.
- **Usage**: Records metering events (e.g., API calls, seats).
- **Billing**: Validated calculation records.
- **Invoice**: Financial record of a billing period.
- **Payment**: Transaction record for an invoice.

## Billing Cycle & Edge Cases
- **Proration**: (Planned) Handling upgrades/downgrades mid-cycle.
- **Failed Payments**: A retry job attempts to collect payment for failed invoices.
- **Usage Aggregation**: Usage is aggregated for the period before invoice generation.
- **Idempotency**: Usage tracking supports idempotency keys to prevent double-counting.

## How to Run Locally

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Setup Environment**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Update `MONGO_URI` if needed.
4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   (Note: Ensure you have a `dev` script in package.json, e.g., `ts-node-dev src/server.ts`)
5. **Build for Production**:
   ```bash
   npm run build
   ```

## Project Structure
- `src/config`: Environment and DB configuration.
- `src/modules`: Domain-driven modules (Auth, Billing, etc.).
- `src/jobs`: Background tasks.
- `src/middlewares`: Global middlewares.
- `src/utils`: Helper functions.
