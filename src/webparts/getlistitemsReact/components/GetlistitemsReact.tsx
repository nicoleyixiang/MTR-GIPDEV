import * as React from 'react';
import styles from './GetlistitemsReact.module.scss';
import { IGetlistitemsReactProps } from './IGetlistitemsReactProps';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp from 'sp-pnp-js';
import { ClassCustomer } from './ClassCustomer';
import {ISPListCustomerItem} from './ICustomers';
import { ClassImage } from './ClassImage';

export default class GetlistitemsReact extends React.Component<IGetlistitemsReactProps, any> {
  
  public constructor(props:IGetlistitemsReactProps, any)
  {
    super(props);
    this.state={
      items:[],
      imageitems:[]
    }
  }
  
  public render(): React.ReactElement<IGetlistitemsReactProps> {
    return (
      <div className={ styles.getlistitemsReact }>
        {
          // this.state.items is an array (which was initialized above)
          // the map function applies the function to each element in 
          // the array and returns the resulting new array 
          this.state.items.map(function(item:ISPListCustomerItem){
            const imageJSON = JSON.parse(item.RollupImage);
            return(
              <div className={"ms-Grid-col ms-sm6 ms-md6 ms-lg4"}>               
                <label className="ms-Label ms-font-xxl">{item.Title}</label>
                <img src={imageJSON.serverRelativeUrl}></img>
              </div> 
            );
          }.bind(this))
        }
      </div>
    );
  }

  // Function is called when the React component is mounted  
  public componentDidMount() 
  {
    debugger;
    this._getListCustomerData();
  }

  // This function retrieves data from the list called "Publication" belonging to the webpage linked 
  // in the serve.json file 
  private _getListCustomerData():void
  {
    pnp.sp.web.lists.getByTitle('Publication').items.getAll().then
    ((Response)=>{
      // Creates new array of ClassCustomer that stores each of 
      // the items from the Response (publication list)
      let customerCollection = Response.map(item=>new ClassCustomer(item));
      // updates the items variable to this new array
      this.setState({items:customerCollection});
    }
    )
  }

}
