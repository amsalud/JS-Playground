import React, { Component } from 'react';

class SearchBar extends Component{
    state = { term: '' };

    onFormSubmit = (e) =>{
        e.preventDefault();
        this.props.onFormSubmit(this.state.term);
    }
 
    render(){
        return (
            <div className="search-bar ui segment">
                <form className="ui form" action="" onSubmit={this.onFormSubmit}>
                    <div className="field">
                        <label htmlFor="">Video Search</label>
                        <input type="text" value={this.state.term} onChange={(e)=> this.setState({term: e.target.value})}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;