import React from 'react';

class PostCode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postcode: ''
    };
  }

  handleChange(e) {
    this.setState({postcode: e.target.value})
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.onSearch(this.state.postcode);
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Enter Postcode" onChange={this.handleChange.bind(this)}/>
          <button onClick={this.handleSearch.bind(this)}>Find Stops</button>
        </form>
      </div>
    )
  }
}

export default PostCode;
