import {Fragment, useEffect} from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {useSelector} from "react-redux";
import CurrencyFormat from 'react-currency-format';
import {
    selectPurchaseChart, selectPurchaseTotal,
} from "../../redux/state-slice/dashboardSlice";
import {PurchaseSummary} from "../../ApiServices/SummaryAPIRequest";
const Dashboard = () => {

    useEffect(()=>{
        (async () => {
            await PurchaseSummary()
        })();
    },[])


    let PurchaseChart = useSelector(selectPurchaseChart);
    let PurchaseTotal = useSelector(selectPurchaseTotal);

    return (
           <Fragment>
               <div className="container-fluid">
                   <div className="row">
                       <div className="col-md-3 p-2">
                           <div className="card">
                               <div className="card-body">
                               <span className="h5">
                                    <CurrencyFormat value={PurchaseTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </span>
                                   <p>Total Purchase</p>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-6 p-2">
                           <div className="card">
                               <div className="card-body">
                                   <span className="h6">Purchase Last 30 Days</span>
                                   <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                       <AreaChart width={500} height={200} data={PurchaseChart} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                           <CartesianGrid strokeDasharray="3 3" />
                                           <XAxis dataKey="_id" />
                                           <YAxis />
                                           <Tooltip />
                                           <Area type="monotone" dataKey="TotalAmount" stroke="#00A884" fill="#00A884" />
                                       </AreaChart>
                                   </ResponsiveContainer>
                               </div>
                           </div>
                       </div>

                   </div>
               </div>
           </Fragment>
    );
};
export default Dashboard;