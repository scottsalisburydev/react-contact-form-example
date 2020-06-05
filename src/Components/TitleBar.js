import React from 'react';


export default class TitleBar extends React.Component {

    constructor(props) {
        super(props)

    }

    showMainList = (e) => {
        this.props.showMainList(e);
    }

    render() {

        return (

            <div className={"titlebar"}>

                <div></div>
                <div className={"title"}>Contacts</div>
                <div> <button className={"addcontact"} onClick={e => this.showMainList(e)}>+</button></div>

            </div>
        );


    }
}
