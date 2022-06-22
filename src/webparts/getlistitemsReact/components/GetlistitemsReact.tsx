import * as React from 'react';
import styles from './GetlistitemsReact.module.scss';
import { IGetlistitemsReactProps } from './IGetlistitemsReactProps';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp from 'sp-pnp-js';
import { ClassCustomer } from './ClassCustomer';
import {ISPListCustomerItem} from './ICustomers';

export default class GetlistitemsReact extends React.Component<IGetlistitemsReactProps, any> {
  
  public constructor(props:IGetlistitemsReactProps,any)
  {
    super(props);
    this.state={
      items:[]
    }
  }
  
  public render(): React.ReactElement<IGetlistitemsReactProps> {
    
    return (
      <div className={ styles.getlistitemsReact }>
        {
          this.state.items.map(function(item:ISPListCustomerItem){
            return(
              <div className={"ms-Grid-col ms-sm6 ms-md6 ms-lg4"}>               
                <label className="ms-Label ms-font-xxl">{item.CustomerID}</label>
                <label className="ms-Label">{item.CustomerName}</label>
                <label className="ms-Label">{item.CustomerType}</label>
                <label className="ms-Label">{item.CustomerAddress}</label>                              
              </div>
            );
          })
        }
      </div>
    );
  }

  public componentDidMount() 
  {
    debugger;
    this._getListCustomerData();
  }

  private _getListCustomerData():void
  {
    pnp.sp.web.lists.getByTitle('Customers').items.getAll().then
    ((Response)=>{
      let customerCollection = Response.map(item=>new ClassCustomer(item));
      this.setState({items:customerCollection});
    }
    )
  }
}
