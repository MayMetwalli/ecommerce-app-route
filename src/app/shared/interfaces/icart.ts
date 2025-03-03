export interface ICart {
products: any;
totalCartPrice: any;
    count:   number;
    _id:     string;
    product: Product;
    price:   number;
}

export interface Product {
    subcategory:    Brand[];
    _id:            string;
    title:          string;
    quantity:       number;
    imageCover:     string;
    category:       Brand;
    brand:          Brand;
    ratingsAverage: number;
    id:             string;
}

export interface Brand {
    _id:       string;
    name:      string;
    slug:      string;
    image?:    string;
    category?: string;
}




