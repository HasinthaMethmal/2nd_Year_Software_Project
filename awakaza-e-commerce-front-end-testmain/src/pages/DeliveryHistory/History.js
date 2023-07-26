import HistoryTable from 'pages/DeliveryTables/HistoryTable'
import React from 'react'

const History = () => {
  //meta title
  document.title = "History | Awakaza Delivery"
  return (
    <div>
      <HistoryTable />
    </div>
  )
}

export default History