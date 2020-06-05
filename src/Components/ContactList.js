import React from 'react';


export default class ContactList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            contact:[]
        };
    }

    showContact= (e, c) => {
       // const contact = this.state.contact;
        this.props.showContact(e,c);
    }

    componentDidMount() {

    }


    render() {

        return (

            <ul className={"contactlist"}>
                {this.props.contacts.map((value, index) => {
                   
                        const contact = value;
                   

                    return (
                    <li key={index} className={"listitem"} onClick={e=> this.showContact(e, contact) }>{value.firstName} {value.lastName}</li>
                    );

                })}
               
               
            </ul>
        );


    }
}
