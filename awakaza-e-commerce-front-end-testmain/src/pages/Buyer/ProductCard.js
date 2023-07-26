import React from 'react'

const ProductCard = () => {
  return (
    <React.Fragment>
        <div>
        <Col xl={4} sm={6} key={"_col_" + key}>
                      <Card
                        onClick={() =>
                          navigate(
                            `/ecommerce-product-detail/${data.productid}`
                          )
                        }
                      >
                        <CardBody>
                          <div className="product-img position-relative">
                            

                            <img
                              src={data.images}
                              alt=""
                              className="img-fluid mx-auto d-block"
                            />
                          </div>
                          <div className="mt-4 text-center">
                            <h5 className="mb-3 text-truncate">
                              <Link
                                to={"/ecommerce-product-detail/" + data.productid}
                                className="text-dark"
                              >
                                {data.productname}{" "}
                              </Link>
                            </h5>
                            <div className="text-muted mb-3">
                              <StarRatings
                                rating='3'
                                starRatedColor="#F1B44C"
                                starEmptyColor="#74788d"
                                numberOfStars={5}
                                name="rating"
                                starDimension="14px"
                                starSpacing="1px"
                              />
                            </div>
                            <h5 className="my-0">
                              
                              <b>${data.price}</b>
                            </h5>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>








                    <Col mg={6} xl={3} key={key} >
              <Card style={{width:"350px"}}>
                <CardImg top className="img-fixed" src={data.images} alt="product" style={{height:"200px"}} />
                <CardBody>
                <CardTitle className="mt-0"><Link>{data.productname}</Link></CardTitle>
                  <CardText>
                    Price: Rs.{data.price}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
        </div>
    </React.Fragment>
    
  )
}

export default ProductCard