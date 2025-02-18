import { Navigate } from 'react-router-dom';

/// Dashboard
import Home from "../../components/Dashboard/Home";

//product
import CategoryForm from '../../pages/productDetails/CategoryForm';
import SubCategoryForm from '../../pages/productDetails/SubCategoryForm';
import ItemForm from '../../pages/productDetails/ItemForm';

//order
import OrderDetails from '../../pages/orders/OrderDetails';

//Royalty
import Royalty from '../../pages/Royalty/Royalty';
import TaxMaster from '../../pages/Tax/TaxMaster';
import TaxSetup from '../../pages/Tax/TaxSetup';
import BandingForm from '../../pages/productDetails/BandingForm';

const AllRoutes = (props) => {

    return [
        {
            url: "dashboard",
            component: <Home {...props} />
        },
        {
            url: "add-category",
            component: <CategoryForm {...props} />
        },
        {
            url: "add-subCategory",
            component: <SubCategoryForm {...props} />
        },
        {
            url: "add-item",
            component: <ItemForm {...props} />
        },
        {
            url: "add-banding",
            component: <BandingForm {...props} />
        },
        {
            url: "all-order",
            component: <OrderDetails {...props} />
        },
        {
            url: "tax-master",
            component: <TaxMaster {...props} />
        },
        {
            url: "tax-setup",
            component: <TaxSetup {...props} />
        },
        {
            url: "royalty",
            component: <Royalty {...props} />
        },
        {
            url: "/",
            component: <Navigate to="/dashboard" replace />
        },
    ];
};

export default AllRoutes;