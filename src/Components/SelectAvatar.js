import React from 'react';


export default class SelectAvatar extends React.Component {

    constructor(props) {
        super(props)

        this.modalRef = React.createRef();

    }

    showAvatarPop(e) {
        this.modalRef.current.style.display = "block";
        this.closeModal(e)
    }

    closeModal() {
        //close modal when clicking outside of the modal
        const modal = this.modalRef.current;
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }

    selectAvatar(e) {
        //pass the function up to be called in Contact.js
        this.props.selectAvatar(e);

        //hide the modal on selection of avatar
        this.modalRef.current.style = "none";
    }



    render() {

        return (
            <div>
                <div><button className={"addavatar"} onClick={e => this.showAvatarPop(e)}>Avatar</button></div>

                <span ref={this.modalRef} className={"tooltipModal"}>
                    <span className={"tooltip"}>

                        <div className="row">
                            <div className="column">

                                <img onClick={e => this.selectAvatar(e)} className={"avatarimg"} alt="" src="avatars/icons8-bear-100.png" />

                            </div>

                            <div className="column">

                                <img onClick={e => this.selectAvatar(e)} className={"avatarimg"} alt="" src="avatars/icons8-cat-100.png" />

                            </div>

                            <div className="column">

                                <img onClick={e => this.selectAvatar(e)} className={"avatarimg"} alt="" src="avatars/icons8-dog-100.png" />

                            </div>

                            <div className="column">

                                <img onClick={e => this.selectAvatar(e)} className={"avatarimg"} alt="" src="avatars/icons8-gorilla-100.png" />

                            </div>
                            <div className="column">

                                <img onClick={e => this.selectAvatar(e)} className={"avatarimg"} alt="" src="avatars/icons8-monkey-100.png" />

                            </div>
                            <div className="column">

                                <img onClick={e => this.selectAvatar(e)} className={"avatarimg"} alt="" src="avatars/icons8-polar-bear-100.png" />

                            </div>
                        </div>
                    </span>
                </span>


            </div>

        );


    }
}
