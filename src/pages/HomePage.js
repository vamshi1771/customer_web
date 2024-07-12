import React from "react";
import Forms from "../Forms/Forms";
import Location from "../components/Location";
import DateAndLocation from "../components/DateAndLocation";
import { MercerLogo } from "../variables-urls/ImageUrls";
import Productbox from "../products/productbox";
import BasicModal from "../products/AddProductModal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
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
  };

  const getAllProducts = async (pageIndex = 0) => {
    const body = {
      method: "GET",
      headers: { "Content-type": "Application/Json" },
    };
    try {
      const res = await fetch(
        `http://localhost:8080/getAllProducts/${pageIndex}/${20}`,
        body
      );
      const response = await res.json();
      console.log("res", response.content);
      setProductData(response.content);
      setProductsPageData({
        ...productspageData,
        pageCount : response.totalPages,
        pageIndex : response.pageable.pageNumber
    })
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (e,pageIndex) =>{
    console.log("pageNumber",pageIndex)
    if(pageIndex-1 != productspageData.pageIndex ) getAllProducts(pageIndex-1);
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
        <span onClick={handleToggle} className="new-product">
          + Add Product
        </span>
      </div>  
      <BasicModal modalStatus={modalStatus} modalData = {modalData} setModalStatus={handleToggle} />
     { productsData &&  <div className="products-dashboard mb-4 ">{loadProducts}</div>}
      <div className="cm-products-footer ">
        <Stack spacing={2}>
          <Pagination count={productspageData.pageCount}  page={productspageData.pageIndex+1} onChange={(event, pageNumber) => handlePageChange(event, pageNumber)} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </div>

    // <div className="container" id='HomeMaindiv' style={{
    // 		'font-weight': '500', 'font-size': 'large', 'display': 'grid',
    // 			'grid-template-columns': '1fr 1fr', 'padding': '30px', 'gap': '40px'}}
    // >
    // 	{/* <Forms id="forms" ></Forms> */}
    // 	<div className="abc">
    // 		{/* <img className="mercerLogo" src={`${MercerLogo}`} alt='This is image' style={{ height: '40vh', margin: '0px', 'padding-top': '0px', width: '100vh', opacity: 0.5, }} /> */}
    // 		{/* <div className="LocationAndTime" style={{ 'grid-area': 'footer', display: 'flex', 'margin-top': '50px', 'margin-left': '200px', alignSelf: 'end', gap: '70px', color: 'white', position: 'relative' }}>
    // 			<Location id="location" />
    // 			<DateAndLocation id="date" />
    // 		</div> */}
    // 	</div>
    // </div>
  );
}

export default Home;

{
  /* <div className="container" style={{
			'font-weight': '500', 'font-size': 'large', 'display': 'grid', 'grid-template-rows': 'auto 1fr',
			'grid-template-columns': '1fr 1fr', 'grid-temolate-areas': "left right footer footer"
		}}>
			<Forms id="forms" style={{ 'display': 'inline', 'grid-area': 'left' }}></Forms>
			<div>
				<img src='https://assetsprelogin.mettl.com/_next/image/?url=%2Fassets%2Flogo%2FMercer-Mettl.svg&w=640&q=75' alt='This is image' style={{ height: '70vh', width: '80vh', 'position': 'absolute', opacity: 0.5, 'grid-area': 'top', 'margin-bottom': '0', 'margin-left': 650 }} />
			<div style={{ 'grid-area': 'footer', display: 'flex', gap: '70px', color: 'white', position: 'relative' }}>
				<Location id="location" />
				<DateAndLocation id="date" />
			</div>
			</div>


		</div> */
}
