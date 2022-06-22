import { ISPListCustomerItem } from "./ICustomers";

export class ClassCustomer{
    public Title:string;
    public Content_EN:string;
    public RollupImage:File

    constructor(item: ISPListCustomerItem) {
        this.Title = item.Title;
        this.Content_EN = item.Content_EN;
        this.RollupImage = item.RollupImage;
    }
}