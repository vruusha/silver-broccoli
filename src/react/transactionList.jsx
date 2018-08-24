import React from "react"
import {observer} from "mobx-react";

export const TransactionView = observer(({transaction}) => (
    <div className="row">
        <div className="filter"></div>

        <div className="col">
            <a href="/web/transaction"> {transaction.account}</a>
        </div>
        <div className="col">
            {transaction.accountName}
        </div>
        <div className="col">
            {transaction.currencyCode}
        </div>
        <div className="col">
            {transaction.amount}
        </div>
        <div className="col">
            {transaction.transactionType}
        </div>

    </div>
));

@observer
export class Transaction extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {transactions} = this.props.store;
        return <div>

            <div className="row">
                <div className="filter"></div>
                <div className="col">
                    Account Number
                </div>
                <div className="col">
                    Account Name
                </div>
                <div className="col">
                    Currency
                </div>
                <div className="col">
                    Amount
                </div>
                <div className="col">
                    Transaction Type
                </div>
            </div>

            {transactions.slice().map(transaction => {
                return (<TransactionView transaction={transaction}/>);
            })}

        </div>;
    }

}