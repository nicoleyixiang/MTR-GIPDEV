import { ClassImage } from "./ClassImage";
import { ISPListCustomerItem } from "./ICustomers";
import { IImageItem } from "./IImage";

export class ClassCustomer{
    public Title:string;
    public Content_EN:string;
    public imageServerURL:string;
    public imageRelativeURL:number; 
    public RollupImage:string;

    // item parameter is the actual object (entry) being retrieved from the list 
    // item.(fieldname) is how we get each of the fields 
    constructor(item: ISPListCustomerItem) {
        this.Title = item.Title;
        this.Content_EN = item.Content_EN;
        this.RollupImage = item.RollupImage;
        // this.RollupImage = new ClassImage(item.RollupImage);
    }
}