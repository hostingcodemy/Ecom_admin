const { VITE_API_DOMAIN, REACT_APP_API_WEB_DOMAIN } = import.meta.env;

export const API_DOMAIN = VITE_API_DOMAIN + "api/";
// export const API_WEB_DOMAIN = REACT_APP_API_WEB_DOMAIN;

export const API_ADMIN_REGISTER = API_DOMAIN + "admin-register";
export const API_ADMIN_AUTHENTICATE = API_DOMAIN + "authenticate";

//Category
export const API_ADD_CATEGORY = API_DOMAIN + "add-category";
export const API_CATEGORIES = API_DOMAIN + "categories";

//Sub Category
export const API_SUB_CATEGORIES_NAME = API_DOMAIN + "sub-categories-name";

//order
export const API_ALL_CUSTOMERS = API_DOMAIN + "all-customers";
export const API_CUSTOMER_ORDERS = API_DOMAIN + "customer_orders";

//Tax
export const API_TAX_ENTRY = API_DOMAIN + "tax-entry";
export const API_TAX_LIST = API_DOMAIN + "tax-list";

//
export const API_CATEGORIE_NAME = API_DOMAIN + "categorie-name";
export const API_ITEM_NAME = API_DOMAIN + "item-name";


//Royalty
export const API_ADD_ROYALTY = API_DOMAIN + "add-royalty";

//Banding
export const API_ADD_BANDING = API_DOMAIN + "add-banding";







