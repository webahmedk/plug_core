import StoreHeader from "../components/store/header/store_header";
import StoreFooter from "../components/store/footer/store_footer";


export default function store_layout({ children }) {
  return (
       <>    
<StoreHeader/>
        {children}
        <StoreFooter/>
        </>
  );
}