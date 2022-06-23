import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popper from 'popper.js';
// import  { Carousel }  from 'react-bootstrap';
import  Carousel  from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.css";
import * as jQuery from 'jquery';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import styles from './GetlistitemsReact.module.scss';
import './Style.css';
import { IGetlistitemsReactProps } from './IGetlistitemsReactProps';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp, { Items } from 'sp-pnp-js';
import { ClassCustomer } from './ClassCustomer';
import {ISPListCustomerItem} from './ICustomers';
import { ClassImage } from './ClassImage';
import ReactHtmlParser from 'react-html-parser';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default class GetlistitemsReact extends React.Component<IGetlistitemsReactProps, any> {
  
  public constructor(props:IGetlistitemsReactProps, any)
  {
    super(props);
    this.state={
      items:[]
    }
  }
  
  public render(): React.ReactElement<IGetlistitemsReactProps> {
    return (
      <Slider>
        {  
          this.state.items.map(item => {
            return (
              <div className={"ms-Grid-col ms-sm6 ms-md6 ms-lg4"}> 
                <div className="card mb-3">
                  <div className="box">
                    <div className="heading">
                      <h2>{item.Title}</h2>
                    </div>
                    <img src={JSON.parse(item.RollupImage).serverRelativeUrl}></img>
                    <div className='text'>
                      <div className="scroll-bg">
                        <div className="scroll-div">
                            <div className="scroll-object">
                              {ReactHtmlParser(item.Content_EN)}
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
          }
      </Slider>
      // <div className={ styles.getlistitemsReact }>
      //   {
      //     this.state.items.map(function(item:ISPListCustomerItem){
      //       return(
      //         <div className={"ms-Grid-col ms-sm6 ms-md6 ms-lg4"}> 
      //           <div className="card mb-3">
      //             <div className="box">
      //               <div className="heading">
      //                 <h2>{item.Title}</h2>
      //               </div>
      //               <img src={JSON.parse(item.RollupImage).serverRelativeUrl}></img>
      //               <div className='text'>
      //                 <div className="scroll-bg">
      //                   <div className="scroll-div">
      //                       <div className="scroll-object">
      //                         {ReactHtmlParser(item.Content_EN)}
      //                       </div>
      //                   </div>
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       );
      //     }.bind(this))
      //   }
      // </div>
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
