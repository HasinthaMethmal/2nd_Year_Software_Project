import React from 'react'

import {Link} from "react-router-dom"
import{
    Col,
    Row,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardImg,
    CardText,
    CardHeader,
    CardImgOverlay,
    CardFooter,
    CardDeck,
    Container,
  } from "reactstrap";

  import "./dashboard.scss"
  

function Cards(props) {
  return (
    <React.Fragment>
         
         <Card style={{marginLeft: "10px", marginRight:"10px" ,marginTop:"40px ",}}>
                <CardImg top className="img-fluid" src={props.img} alt="img" style={{height:"200px"}} />
                <CardBody>
                  <CardTitle className="mt-0">{props.icon}  {props.user}</CardTitle>
                  <CardText>
                    {props.count}
                  </CardText>
                  <Link
                    to={props.link}
                    className="btn btn-primary"
                  >
                    see {props.user} controls
                  </Link>
                </CardBody>
              </Card>
        
    </React.Fragment>
  )
}

export default Cards