// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Table from 'react-bootstrap/Table';

// export default function DonorDetail() {
//     const { id } = useParams();
//     const [apiData, setApiData] = useState([]);
//     const [loading, setLoading] = useState(false);


//     async function getApiData() {
//         try {
//             setLoading(true)
//             const response = await axios.get('https://67593f4e60576a194d140021.mockapi.io/donner')
//             setApiData(response.data)
//             setLoading(false)
//         } catch (error) {
//             alert(error)
//         }
//     }
//     console.log(apiData);



//     useEffect(() => {
//         getApiData()
//     }, [])
//     const donorData = apiData.filter(item => item.id == id)
//     console.log(donorData);
//     return (
//         <>
//             {donorData && donorData.length != 0 ?
//                 <div className="d-flex">
//                     <div>
//                         <div>name : {donorData[0].userName}</div>
//                         <div>Donor Id : {donorData[0].donnerid}</div>
//                         <div>Number : {donorData[0].userNumber}</div>
//                         <div>Blood group : {donorData[0].bgroup}</div>


//                     </div>
//                 </div>


//                 :
//                 <>no data</>
//             }
//         </>
//     )
// }

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Table from 'react-bootstrap/Table';

export default function DonorDetail() {
    const { id } = useParams();
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getApiData() {
        try {
            setLoading(true);
            const response = await axios.get('https://67593f4e60576a194d140021.mockapi.io/donner');
            setApiData(response.data);
            setLoading(false);
        } catch (error) {
            alert(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getApiData();
    }, []);

    const donorData = apiData.filter(item => item.id == id);

    return (
        <>
            {loading && <div>Loading...</div>}
            {donorData && donorData.length !== 0 ? (
                <div className="d-flex">
                    {/* <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Donor ID</th>
                                <th>Number</th>
                                <th>Blood Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={donorData[0].id}>
                                <td>{donorData[0].userName}</td>
                                <td>{donorData[0].donnerid}</td>
                                <td>{donorData[0].userNumber}</td>
                                <td>{donorData[0].bgroup}</td>
                            </tr>
                        </tbody>
                    </Table> */}
                    <div className="d-flex">
                        <div>
                            <div>name : {donorData[0].userName}</div>
                            <div>Donor Id : {donorData[0].donnerid}</div>
                            <div>Number : {donorData[0].userNumber}</div>
                            <div>Blood group : {donorData[0].bgroup}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>No data available for the selected donor.</div>
            )}
        </>
    );
}
