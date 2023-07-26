import {useState,React} from 'react'
import { useParams } from 'react-router-dom'
import { Card,
        CardBody, 
        Row} from 'reactstrap'
import NewOrders from './NewOrders';
import CancelledOrders from './CancelledOrders';
import ReadyOrders from './ReadyOrders'

export const SellerOrders = () => {
    const{id} =useParams();
    const[onclick,setOnclick] = useState(0)
    const update = () =>{
        setOnclick(onclick+1)
    }

  return (
    <div style={{marginTop:"75px"}}>
      <Row>
        <Card>
          <CardBody>
            <NewOrders id ={id} update={update}/>
          </CardBody>
        </Card>
      </Row>"

      <Row>
        <Card>
          <CardBody>
            <CancelledOrders id ={id}/>
          </CardBody>
        </Card>
      </Row>
      <Row>
        <Card>
          <CardBody>
            <ReadyOrders id = {id} onclick = {onclick}/>
          </CardBody>
        </Card>
      </Row>
    </div>
  )
}
