import React from 'react';

import SelectAvatar from "./SelectAvatar";
export default class Contact extends React.Component {

    constructor(props) {
        super(props)

        this.avatarRef = React.createRef();
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.companyRef = React.createRef();
        this.phoneRef = React.createRef();

    }

    handleChange(event) {

        //if first name field has been highlighted red, return to grey
        if (event.target.style.borderBottom === "1px solid red") {
            event.target.style.borderBottom = "1px solid #999";
        }
    }

    saveContact = (e) => {

        //dont allow the contact to be saved if the first name field is empty
        if (this.firstNameRef.current.value === "") {
            this.firstNameRef.current.style.borderBottom = "1px solid red";
            return
        }

        //our contact list array
        const contacts = this.props.contacts;

        if (this.props.edit) {
            //if saving an edited contact

            //Remove old contact from array before replacing with edited contact
            const id = this.props.currentContact.id;
            const index = contacts.findIndex(x => x.id === id);
            contacts.splice(index, 1);


        } else {

            //if saving a new contact
            this.clearForm();

        }

        //our new or edited contact to be addded to our contacts array
        const array = {
            "firstName": this.firstNameRef.current.value,
            "lastName": this.lastNameRef.current.value,
            "phone": this.phoneRef.current.value,
            "avatar": this.avatarRef.current.src,
            "company": this.companyRef.current.value,
            "id": contacts.length + 1
        };

        //add new or edited contact to contacts array
        contacts[contacts.length] = array

        //pass the function up to be called in Main.js
        this.props.saveContact(e, contacts, array);

    }

    clearForm() {

        //if first name field has been highlighted red, return to grey
        if (this.firstNameRef.current.style.borderBottom === "1px solid red") {
            this.firstNameRef.current.style.borderBottom = "1px solid #999";
        }

        //set timeout so that the fields clear after they are out of view
        const t = this;
        setTimeout(function () {
            t.avatarRef.current.src = "avatars/placeholder.png";
            t.firstNameRef.current.value = "";
            t.lastNameRef.current.value = "";
            t.companyRef.current.value = "";
            t.phoneRef.current.value = "";
        }, 650)

    }

    pickAvatar = (e) => {

        //set the avatar image
        this.avatarRef.current.src = e.target.src;

    }

    deleteContact(e) {
        //our contact list array
        const contacts = this.props.contacts;


        //if saving an edited contact

        //Remove old contact from array before replacing with edited contact
        const id = this.props.currentContact.id;
        const index = contacts.findIndex(x => x.id === id);
        contacts.splice(index, 1);

        //pass the function up to be called in Main.js
        this.props.deleteContact(e, contacts);

    }

    showMainList = (e) => {

        //show main contact list
        if (this.props.edit || this.props.new) {
            //if in new or edit contact mode then clear the 
            //fields before returning to the main list
            this.clearForm();
        }

        //pass the function up to be called in Main.js
        this.props.showMainList(e);
    }
    editContact = (e) => {

        //pass the function up to be called in Main.js
        this.props.editContact(e);

    }
    checkEditMode(c) {
        //if in edit mode then set field values to current contact
        if (this.props.edit) {
            //current contact selected from list
            const contact = this.props.currentContact;

            this.avatarRef.current.src = contact.avatar;
            this.firstNameRef.current.value = contact.firstName;
            this.lastNameRef.current.value = contact.lastName;
            this.companyRef.current.value = contact.company;
            this.phoneRef.current.value = contact.phone;
        }
    }
    formatPhoneNumber(phoneNumberString) {
        //format phone number
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            const intlCode = (match[1] ? '+1 ' : '')
          return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return cleaned
      }
    componentDidUpdate() {
        //check if we are editing a current contact
        this.checkEditMode();
    }
    render() {
        const newContact = this.props.new;
        const editMode = this.props.edit;

        return (
            <div className={"contact"}>
                <div className={"titlebar"}>

                    <div>
                        {editMode ?

                            <button className={"back"} onClick={e => this.saveContact(e)}>cancel</button>

                            :

                            <button className={"back"} onClick={e => this.showMainList(e)}>back</button>

                        }

                    </div>

                    <div>
                        <div className={"title"}>{this.props.title}</div>
                    </div>

                    <div>
                        {newContact ?

                            <button className={"done"} onClick={e => this.saveContact(e)}>save</button>

                            :

                            <button className={"done"} onClick={e => this.editContact(e)}>edit</button>

                        }

                    </div>
                </div>

                {!newContact ?

                    <div className={"contactinfo"}>

                        <img className={"contactimg"} alt="" src={this.props.currentContact.avatar} />

                        <div className={"contactname"}>{this.props.currentContact.firstName} {this.props.currentContact.lastName}</div>

                        <div className={"contacttext"}>
                            {this.props.currentContact.company !== "" ? "Company: " + this.props.currentContact.company : null}
                        </div>

                        <div className={"contacttext"}>
                            {this.props.currentContact.compphoneany !== "" ? "Phone:  " + this.formatPhoneNumber(this.props.currentContact.phone) : null}
                        </div>

                    </div>

                    :

                    <div className={"inputform"} >

                        <img ref={this.avatarRef} className={"contactimg"} alt="" src="avatars/placeholder.png" />

                        <SelectAvatar selectAvatar={this.pickAvatar} />

                        <div><input ref={this.firstNameRef} placeholder={"First name"} onChange={e => this.handleChange(e)}></input></div>
                        <div><input ref={this.lastNameRef} placeholder={"Last name"} /></div>
                        <div><input ref={this.companyRef} placeholder={"Company"} /></div>
                        <div><input ref={this.phoneRef} placeholder={"Phone"} /></div>
                        {editMode ?
                            <div>
                                <button className={"deletecontact"} onClick={e => this.deleteContact(e)}>Delete Contact</button>
                            </div>
                            :
                            null
                        }
                    </div>

                }

            </div>
        );


    }
}
