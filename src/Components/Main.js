import React from 'react';


import Contact from "./Contact";
import TitleBar from "./TitleBar";
import ContactList from "./ContactList";

let contacts = [
    {
        "firstName": "Scott",
        "lastName": "Salisbury",
        "phone": "6155555555",
        "avatar": "avatars/icons8-dog-100.png",
        "company": "",
        "id": '1'
    },
    {
        "firstName": "Tyler",
        "lastName": "Jamison",
        "phone": "+1 (615)-555-5555",
        "avatar": "avatars/icons8-polar-bear-100.png",
        "company": "Costco",
        "id": '2'
    },
    {
        "firstName": "Michael",
        "lastName": "Escobar",
        "phone": "+1 (615)-555-5555",
        "avatar": "avatars/icons8-bear-100.png",
        "company": "",
        "id": '3'
    },

];

export default class Main extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            contacts: [],
            currentContact: [],
            new: null,
            edit: false,
            title: null
        };

        this.mainInnerRef = React.createRef();
    }

    sortContacts(c) {

        const contacts = c.sort(function (a, b) {
            a = a.lastName.toLowerCase();
            b = b.lastName.toLowerCase();

            return a < b ? -1 : a > b ? 1 : 0;
        });
        this.setState({
            contacts: contacts
        })
    }


    flipIt = (e, c) => {

        if (e.target.className == 'addcontact') {
            this.setState({
                new: true,
                edit: false,
                title: 'Add Contact'
            });
        }

        if (e.target.className == 'listitem') {
            this.setState({
                new: false,
                edit: false,
                currentContact: c,
                title: null
            });
        }

        const main = this.mainInnerRef.current;
        main.classList.toggle('maininner-flipped');
    }


    editIt = () => {

        this.setState({
            edit: true,
            new: true,
            title: 'Edit Contact'
        });

    }
    saveIt = (e, c, a) => {

        if (this.state.edit) {
            this.setState({
                new: false,
                edit: false,
                currentContact: a,
                title: null
            });
        } else {
            this.flipIt(e);
        }

        this.sortContacts(c);
    }

    deleteIt = (e, c) => {
        this.setState({
            new: false,
            edit: false,
            title: null
        });
        this.flipIt(e);
        this.sortContacts(c);
    }
    componentDidMount() {
        this.sortContacts(contacts);
      
    }



    render() {

        return (


            <div ref={this.mainInnerRef} className="maininner">
                <div className="mainfront">

                    <TitleBar showMainList={this.flipIt} />
                    <ContactList contacts={this.state.contacts} showContact={this.flipIt} />

                </div>
                <div className="mainback">

                    <Contact title={this.state.title} edit={this.state.edit} new={this.state.new} contacts={this.state.contacts} currentContact={this.state.currentContact} showMainList={this.flipIt} editContact={this.editIt} saveContact={this.saveIt} deleteContact={this.deleteIt} />

                </div>
            </div>



        );


    }
}
