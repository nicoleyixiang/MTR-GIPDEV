import { IImageItem } from "./IImage";

export class ClassImage{
    public type: string;

    constructor(item: IImageItem) {
        this.type = item.type;
    }
}