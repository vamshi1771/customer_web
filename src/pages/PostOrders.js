import React from 'react';

import OrdersForms from '../Forms/OrdersForm';

function PostOrders(){
    return(
        <div className="container mt-5" >
        <h1>Enter Order Details</h1>
        <OrdersForms></OrdersForms>
	</div>
    );
}
export default PostOrders;