const { VITE_API_DOMAIN, REACT_APP_API_WEB_DOMAIN } = import.meta.env;

export const API_DOMAIN = VITE_API_DOMAIN + "api/";
// export const API_WEB_DOMAIN = REACT_APP_API_WEB_DOMAIN;

export const API_ADMIN_REGISTER = API_DOMAIN + "admin-register";
export const API_ADMIN_AUTHENTICATE = API_DOMAIN + "authenticate";

//Category
export const API_ADD_CATEGORY = API_DOMAIN + "add-category";
export const API_CATEGORIES = API_DOMAIN + "categories";

//order
export const API_ALL_CUSTOMERS = API_DOMAIN + "all-customers";
export const API_CUSTOMER_ORDERS = API_DOMAIN + "customer_orders";

//Royalty
export const API_ADD_ROYALTY = API_DOMAIN + "add-royalty";







