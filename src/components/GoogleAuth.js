import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount () {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init(
                {
                    clientId: '617978713841-35u2vk8m0ns6q6otug9g1n57j3rfk457.apps.googleusercontent.com',
                    scope: 'email'
                }).then( () => {
                    this.google_auth = window.gapi.auth2.getAuthInstance();
                    
                    this.onAuthChange(this.google_auth.isSignedIn.get());
                    this.google_auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.google_auth.currentUser.get().getId());
        }
        else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.google_auth.signIn();
    }

    onSignOutClick = () => {
        this.google_auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
           return null;
        }
        else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        }
        else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In
                </button>
            );
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );  
    }
}

// function to map reducer state to properties
const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);