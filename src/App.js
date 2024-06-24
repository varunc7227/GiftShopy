import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import HomePage from './components/app-homepage/Homepage';
import ItemDetails from './components/ItemDetails';
import Checkout from './checkout/Checkout';
import Confirmation from './checkout/Confirmation';
import Collections from './components/Collections';
import Ticket from './components/Ticket';
import ProductCategory from './components/ProductCategory';
import SearchResults from './components/searchResults';
import SearchResult from './components/app-searchResult/SearchResult';
import FaqPage from './components/FaqPage';
import ProductDisplay from './components/app-product-display/productDisplay';
import SiteMap from './components/SiteMap';
import CopyrightTrademarkComponent from './components/CopyrightTrademarkComponent';
import TermsOfUseComponent from './components/TermsOfUseComponent';
import CookiePolicy from './components/CookiePolicy';
import ThanksPage from './components/app-thanks-page/ThanksPage';
import SharedLayout from './sharedLayout';

function App() {
  return (
    <div>
      <div className="App">
        <BrowserRouter basename="/giftshop">
          <SnackbarProvider
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant={'success'}
            autoHideDuration={1000}
            style={{ top: "4rem !important" }}
          />
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<HomePage />} />
              <Route path="item/:itemId" element={<ItemDetails />} />
              <Route path="category/:catName" element={<ProductCategory />} />
              <Route path="collection/:collectionId" element={<Collections />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="thank" element={<ThanksPage />} />
              {/* <Route path="thanks" element={<Thank />} /> Thank you page */}
              <Route path="checkout/success" element={<Confirmation />} />
              <Route path="coupon" element={<Ticket />} />
              {/* <Route path="search1" element={<SearchResult />} /> */}
              <Route path="search" element={<SearchResults />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="product-details/:itemId" element={<ProductDisplay />} />
              <Route path="sitemap" element={<SiteMap />} />
              <Route path="terms-of-use" element={<TermsOfUseComponent />} />
              <Route path="copyright-and-trademark" element={<CopyrightTrademarkComponent />} />
              <Route path="cookie-policy" element={<CookiePolicy />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
