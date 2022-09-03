import React, { useMemo } from "react";
import { ColumnFilter } from "./ColumnFilter";
const screenSize = window.screen.width;

export const Columns=[
  {
    Header: "ID",
    accessor:"id",
    Filter: ColumnFilter,
    show: false
  },
  
{
  Header: "Name",
  accessor:"name",
  Filter: ColumnFilter,
  show: true,
  
},
{
  Header: "Shop Name",
  accessor:"shop_name",
  Filter: ColumnFilter,
  show: true,
  
},
{
  Header: "Language",
  accessor:"language",
  Filter: ColumnFilter,
  show:true,
  // show: (window.screen.width > 568),
  
},
{
  Header: "Type",
  accessor:"type",
  Filter: ColumnFilter,
  show: true,
  
},
{
  Header: "Email",
  accessor:"mail",
  Filter: ColumnFilter,
  show:true,
  // show: window.screen.width>760,
 
},
{
  Header: "Country",
  accessor:"country",
  Filter: ColumnFilter,
  show:true,
  // show: window.screen.width>760,

},
{
  Header: "City",
  accessor:"city",
  Filter: ColumnFilter,
  show:true,
  // show: window.screen.width>760,

},
{
  Header: "Street",
  accessor:"street",
  Filter: ColumnFilter,
  show:true,
  // show: window.screen.width>992,

},
{
  Header: "Street No",
  accessor:"street_no",
  Filter: ColumnFilter,
  show:true,
  // show: window.screen.width>992,

},
{
  Header: "Post code",
  accessor:"post_code",
  Filter: ColumnFilter,
  show:true,
  // show: window.screen.width>992,
  // Filter:()=>(
  //   <input placeholder="Search"/>
  // )
}

]
