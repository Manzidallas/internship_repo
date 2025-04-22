export interface User {
    _id: string;
    username: string;
  }
  
  export interface Product {
    _id: string;
    product_name: string;
  }
  
  export interface StockReport {
    product_name: string;
    stock_remaining: number;
  }
  
  export interface LoginProps {
    onLogin: () => void;
  }