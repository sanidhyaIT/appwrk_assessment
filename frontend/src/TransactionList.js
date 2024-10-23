import React, {useState, useEffect} from 'react'
import axios from "axios";
import moment from "moment";

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState([])
    const [credit, setCredit] = useState(0)
    const [debit, setDebit] = useState(0)

    useEffect(()=>{
        axios.get("http://localhost:3001/api/transactions")
        .then((response)=>{
            setTransactions(response.data)
        })
        .catch((error)=>{
            console.log("Error Fetching Transaction", error)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransaction = {
            description, 
            credit: credit, 
            debit: debit,

        };
        console.log(newTransaction)
        axios.post("http://localhost:3001/api/transactions", newTransaction)
        .then((response)=>{
            setTransactions([response.data.transaction, ...transactions])

            setDescription("")
            setCredit(0)
            setDebit(0)
        }).catch((error)=>{
            console.log("Error adding transaction", error)
        })
    }
  return (
    <div>
        <form onSubmit={handleSubmit} style={{width: "100%"}}>
            <input
                type="text"
                placeholder='Description'
                value={description}
                onChange={(e)=>{
                    setDescription(e.target.value)
                }}
            />
            <input
                type="number"
                placeholder='Credit'
                value={credit}
                onChange={(e)=>{
                    setCredit(e.target.value)
                }}
            />
            <input
                type="number"
                placeholder='Debit'
                value={debit}
                onChange={(e)=>{
                    setDebit(e.target.value)
                }}
            />
            <button type="submit">Add Transaction</button>
            </form>
             <table style={{borderCollapse: "collapse", width: "100%", backgroundColor: "cornflowerblue"}}>
                <thead>
                    <tr>
                        <th style={{border: "2px dotted royalblue", padding: "12px"}}>Date</th>
                        <th style={{border: "2px dotted royalblue", padding: "12px"}}>Description</th>
                        <th style={{border: "2px dotted royalblue", padding: "12px"}}>Credit</th>
                        <th style={{border: "2px dotted royalblue", padding: "12px"}}>Debit</th>
                        <th style={{border: "2px dotted royalblue", padding: "12px"}}>Running Balance</th>

                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index)=>(
                        <tr key={index}>
                            <td style={{border: "2px dotted blue", padding: "8px"}}>
                                {moment(transaction.date).format("DD/MM/YYYY")}
                            </td>
                            <td style={{border: "2px dotted blue", padding: "8px"}}>
                                {transaction.description}
                            </td>
                            <td style={{border: "2px dotted blue", padding: "8px"}}>
                                {transaction.credit}
                            </td>
                            <td style={{border: "2px dotted blue", padding: "8px"}}>
                                {transaction.debit}
                            </td>
                            <td style={{border: "2px dotted blue", padding: "8px"}}>
                                {transaction.running_balance}
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>
    </div>
  )
}

export default TransactionList