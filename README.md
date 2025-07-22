# assetto-Asset Management System
Assetto is a full-featured asset management web application designed for managing company assets, vendors, branches, GRNs, and more. This project is built with Node.js, Express, TypeScript, and MongoDB following clean code and repository pattern principles.

##  Project Progression
- TypeScript-based Express server setup
- MongoDB Atlas integration
- Environment variables managed via .env
- Project structured into modular architecture

###  Core Infrastructure
- `tsconfig.json`, `package.json`
- Defined `app.ts`, `server.ts`, and `db.ts`
- Standardized folder structure


###  Modules Implemented

Branches ==> Create, get, list, and manage company branches 
Vendors  ==> Manage vendors supplying assets 
Asset Categories ==> Grouping of high-level asset types 
Asset Subcategories ==> Linked to categories
GRN (Goods Receipt Note) | Auto-generate GRN Numbers, link to vendors/branches, store items 
GRN List (Filter + Report) | List GRNs with filtering by vendor, branch, date range 

##  Folder Structure

backend/
|== controllers/ # Handles request logic
|== models/ # Mongoose schemas
|== repositories/ # DB interaction logic (clean architecture)
|== routes/ # API endpoints
|== services/ # Business logic 
|== utils/ # Utilities 
|== config/ # DB connection setup
|== app.ts # Express app config
|== server.ts # App entry point

# 1. Clone the repo
git clone https://github.com/Riswanabasil/assetto.git

# 2. Start the server
npm run dev


## Frontend Tech Stack

- React (with TypeScript)
- Vite
- Tailwind CSS
- Material UI (for modals, inputs)
- Axios (for API requests)
- React Router DOM (routing)
- SweetAlert2 (notifications)
- xlsx (for Excel report download)


## Frontend Features

-Category, SubCategory, Vendor, Branch, Manufacturer CRUD (via list + modal form)
- GRN Module
  - Add/Edit GRN with nested line items
  - Filter GRNs by vendor, branch, and date
  - Download GRN report as Excel (using xlsx)
  - Reuse dropdowns (fetched from backend APIs)
- Responsive UI (Tailwind + Material UI)
- SweetAlert2 for confirmation and success alerts


src/
    |-- api/                      # Axios instance 
    |-- assets/                   # Static assets
    |-- features/                 # All UI pages grouped by module
    │   |-- branches/
    │   |-- categories/
    │   |-- grn/                  
    │   |-- manufacturers/
    │   |-- subcategories/
    │   |-- vendors/
    │   |-- layouts/              # Layouts (shared UI components)
    |-- services/                 # API service files
    │   |-- BranchService.ts
    │   |-- CategoryService.ts
    │   |-- grnApis.ts
    │   |-- ManufacturerService.ts
    │   |-- SubCategoryService.ts
    │   |-- VendorService.ts
    |-- types/                    # TypeScript interfaces (DTOs)
    |-- utils/                    # Helper utilities 
    |-- App.tsx
    |-- main.tsx

