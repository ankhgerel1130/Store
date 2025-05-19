export interface Billboard{
    id: string;
    label: string;
    imageUrl: string;
};
export interface Category {
    id: string;
    storeId: string;
    billboardId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }; 
export interface Product{
    id: string;
    category: Category;
    name: string;
    price: string;
    isFeatured: boolean;
    size: Size;
    color: Color;
    description?: string;  // Add this (optional field)
    quality?: number;  
    images: Image[];
    

};

export interface Image{
    id: string;
    url: string;

}
export interface Size{
id: string;
name: string;
value: string;
}
export interface Color{
    id: string;
    name: string;
    value: string;
    }

  