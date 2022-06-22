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
                <label className="ms-Label ms-font-xxl">{item.Title}</label>
                <label className="ms-Label">{item.Content_EN}</label>
                <label className="ms-Label">{item.RollupImage}</label>
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
    pnp.sp.web.lists.getByTitle('Publication').items.getAll().then
    ((Response)=>{
      let customerCollection = Response.map(item=>new ClassCustomer(item));
      this.setState({items:customerCollection});
    }
    )
  }
}
