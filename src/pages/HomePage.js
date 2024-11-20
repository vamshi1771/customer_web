import React, { useEffect } from "react";
import Forms from "../Forms/Forms";
import Location from "../components/Location";
import DateAndLocation from "../components/DateAndLocation";
import { MercerLogo } from "../variables-urls/ImageUrls";
import Productbox from "../products/productbox";
import BasicModal from "../products/AddProductModal";
import MuiPagination from "../components/Pagination";
import "../App.css";
import "./Homepage.css";
import "../styles/HomePage.css";

// style={{
// 			'font-weight': '500', 'font-size': 'large', 'display': 'grid',
// 			'grid-template-columns': '1fr 1fr', 'padding': '30px', 'gap': '40px'}}
function Home() {
  const [modalStatus, setModalStatus] = React.useState(false);
  const [productsData, setProductData] = React.useState([]);
  const [modalData,setModalData] = React.useState({});
  
  const [productspageData,setProductsPageData] = React.useState({
    pageCount : "",
    pageIndex : 0,

  })

  const handleToggle = (element=null) => {
    setModalStatus(!modalStatus);
   if(!modalStatus) setModalData(element);
   else {
    setModalStatus(false);
   }
  };

  const getAllProducts = async (pageIndex = 0) => {
    const body = {
      method: "GET",
      headers: { "Content-type": "Application/Json" },
    };
    try {
      const res = await fetch(
        `http://localhost:8090/getAllProducts/${pageIndex}/${12}`,
        body
      );
      const response = await res.json();
      console.log("res", response.content);
      setProductData(response.content);
      setProductsPageData({
        ...productspageData,
        ["pageCount"] : response.totalPages,
        ["pageIndex"] : response.pageable.pageNumber
    })
    } catch (err) {
      console.log(err);
    }
  };
  const handlePageChange = (event,pageIndex) =>{
    if(event-1 != productspageData.pageIndex ) getAllProducts(event-1);
  } 
  React.useEffect(() => {
    getAllProducts();
  }, [modalStatus]);

  const loadProducts = productsData?.map((element, index) => (
    <Productbox key={index} data={element} handleToggle ={()=>handleToggle(element)} />
  ));

  return (
    <div className="mt-4 cm-products ">
      <div className="mb-4">
        <span onClick={handleToggle} className="cm-add-product">
          + Add Product
        </span>
      </div>  
      <BasicModal modalStatus={modalStatus} modalData = {modalData} setModalStatus={handleToggle} />
     { productsData &&  <div className="products-dashboard mb-4 ">{loadProducts}</div>}
      <div className="cm-products-footer ">
        <MuiPagination pageCount={productspageData.pageCount} pageIndex = {productspageData.pageIndex+1} onChange = {(event,pagenumber) => handlePageChange(event,pagenumber)}/>
      </div>
    </div>
  );
}

export default Home;
