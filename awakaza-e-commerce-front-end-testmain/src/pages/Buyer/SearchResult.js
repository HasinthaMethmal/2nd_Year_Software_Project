import React, { useEffect, useState } from 'react'
import{
    Col,
    Row,
    Card,
    CardBody,
    CardTitle,
    CardImg,
    CardText,
    Input,
    Button,
    Container
    
  } from "reactstrap";
  import {Link, useNavigate, useParams} from "react-router-dom"
  import  Axios  from 'axios';

const SearchResult = () => {
    const [products,setProducts] = useState([]);
    const[newSearch,setSearch] = useState()
    const {search}= useParams();
    const navigate =useNavigate();
    useEffect(() =>{
        // get product data from backend
        Axios.get("http://localhost:5000/seller/searchproducts",{
            params:{
                search:search
              }
        })
    .then(
      (response) => {
         setProducts(response.data.data)
        
      }
    ).catch((error) =>{
      console.log(error)
    })
    },[search])
    const searchProduct = () =>{
      navigate(`/products/search/${newSearch}`)
  }
  

  return (
    <React.Fragment>
        
        <div style={{margin:"75px"}}>
        <Container fluid>
            <Row style={{alignSelf:"center"}}>
            <Col sm={4} >
            <form className="app-search d-none d-lg-block" onSubmit={searchProduct}>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  onChange={(e) =>{setSearch(e.target.value)}}
                  defaultValue={search}
                />
                <span className="bx bx-search-alt" />
              </div>
            </form>
             </Col>
             <Col  >
             <Button color="primary" className="btn-rounded" style={{marginTop:"17px"}} onClick={searchProduct} >
                            Search
            </Button>
             </Col>
            </Row>
            <Row>
                {
                  products.map((data,key)=>{
                    return(
                        <Col mg={6} xl={3} key={key} >
              <Card style={{width:"280px"}}>
                <CardImg top className="img-fixed" src={data.images} alt="product" style={{height:"200px"}} />
                <CardBody>
                <CardTitle className="mt-0"><Link to={`/products/view/${data.productid}`}>{data.productname}</Link></CardTitle>
                  <CardText>
                    Price: Rs.{data.price}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
                    )
                  })
                }
            </Row>
            </Container>
        </div>
       
    </React.Fragment>
  )
}

export default SearchResult