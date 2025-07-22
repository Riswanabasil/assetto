import { BrowserRouter, Routes, Route } from "react-router-dom";


import './App.css'
import MainLayout from "./layouts/MainLayout";
import CategoryListPage from "./features/categories/CategoryListPage";
import SubcategoryListPage from "./features/subcategories/SubcategoryListPage";
import BranchListPage from "./features/branches/BranchListPage";
import VendorListPage from "./features/vendors/VendorListPage";
import ManufacturerListPage from "./features/manufacturers/ManufacturerListPage";
import GRNListPage from "./features/grn/GRNListPage";
import GRNFormPage from "./features/grn/GRNFormPage";

function App() {
 

  return (
    <>
     <BrowserRouter>
      <Routes>
       <Route element={<MainLayout />}>
         <Route path="/" element={<CategoryListPage />} />
         <Route path="/subcategories" element={<SubcategoryListPage />} />
         <Route path="/branches" element={<BranchListPage />} />
         <Route path="/vendors" element={<VendorListPage />} />
         <Route path="/manufacturers" element={<ManufacturerListPage />} />
         <Route path="/grn" element={<GRNListPage />} />
         <Route path="/grns/create" element={<GRNFormPage/>} />
<Route path="/grns/edit/:id" element={<GRNFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
