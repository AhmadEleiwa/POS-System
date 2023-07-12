interface Category {
  categoryName: string;
}
interface UnitOfMeasure {
  unitOfMeasureName: string;
  baseUnitOfMeasure: string;
  conversionFactor: number;
}
interface Product {
  id: string;
  title: string;
  media: string;
  price: number;
  category: Category;
  unitOfMeasure: UnitOfMeasure;
}
interface CartCeil extends Product{
  qty:number;
}
interface Cart {
  cartId: string;
  description: string;
  tax: number;
  discount: number;
  products: CartCeil[];
}
interface Action{
    type:string;
    data?:any;
}
interface User{
  username:string;
  password:string;
  admin:boolean;
}
interface ResponseResult {
  message: string;
  status: number;
}