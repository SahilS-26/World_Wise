import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

/*
// -- bundle size Without splitting code bundles --
dist/index.html                   0.49 kB │ gzip:   0.32 kB
dist/assets/index-DEFdrJtV.css   30.47 kB │ gzip:   5.05 kB
dist/assets/index-BVxZzxPG.js   550.03 kB │ gzip: 160.87 kB
*/

/*
// -- bundle size after splitting code bundles --
dist/index.html                           0.49 kB │ gzip:   0.31 kB
dist/assets/Logo-BYigXoGP.css             0.03 kB │ gzip:   0.05 kB
dist/assets/Login-B5O0XBJ4.css            0.35 kB │ gzip:   0.22 kB
dist/assets/Product-ftt4lYil.css          0.47 kB │ gzip:   0.27 kB
dist/assets/Homepage-DU-CjQIG.css         0.50 kB │ gzip:   0.30 kB
dist/assets/PageNav-CcPXYRy9.css          0.51 kB │ gzip:   0.28 kB
dist/assets/AppLayout-Dm7aGF6B.css        1.91 kB │ gzip:   0.70 kB
dist/assets/index-Co0lGtkH.css           26.81 kB │ gzip:   4.40 kB
dist/assets/Product.module-Be8LLB42.js    0.06 kB │ gzip:   0.07 kB
dist/assets/PageNotFound-BCbUBp_2.js      0.15 kB │ gzip:   0.15 kB
dist/assets/Logo-CGtZ7OY5.js              0.21 kB │ gzip:   0.20 kB
dist/assets/PageNav-BXDjSkqo.js           0.49 kB │ gzip:   0.28 kB
dist/assets/Pricing-BRmUyC6Q.js           0.65 kB │ gzip:   0.42 kB
dist/assets/Homepage-DmKzVvxt.js          0.66 kB │ gzip:   0.42 kB
dist/assets/Product-BTztga8K.js           0.85 kB │ gzip:   0.49 kB
dist/assets/Login-BR_xsuzp.js             1.00 kB │ gzip:   0.54 kB
dist/assets/AppLayout-DZDsb2mq.js       156.75 kB │ gzip:  46.15 kB
dist/assets/index-C6wGVurq.js           391.63 kB │ gzip: 114.16 kB
*/

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
