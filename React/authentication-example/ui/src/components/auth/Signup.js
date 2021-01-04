import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class Signup extends Component {
    render() {
        return (
            <form action="">
                <fieldset>
                    <label htmlFor="">Email</label>
                    <Field name="email" type="text" component="input" autoComplete="none"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="">Password</label>
                    <Field name="password" type="password" component="input" autoComplete="none"/>
                </fieldset>
            </form>
        );
    }
}

export default reduxForm({ form: 'signup' })(Signup);