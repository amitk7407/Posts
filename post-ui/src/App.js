import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import APIConnect from './api-connect';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import dateformat from 'dateformat';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }

    this.addNewPost = this.addNewPost.bind(this);
    this.handleAddNewPost = this.handleAddNewPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { result: { content, error, isFetching, method, success } = {} } = nextProps;

    if (success && !isFetching) {
      if (method !== 'get') {
        this.props.dispatch(APIConnect.get());
      }
      else {
        this.setState({ data: content, showInput: false });
      }
    }
    else if (error) {
      this.setState({ data: [], showInput: false });
    }
  }

  componentDidMount() {
    this.props.dispatch(APIConnect.get());
  }

  handleAddNewPost() {
    this.setState({ showInput: true });
  }

  addNewPost() {
    this.props.dispatch(APIConnect.post({ name: 'Amit kumar', text: this.state.text }));
  }

  upvotePost(post) {
    this.props.dispatch(APIConnect.upvote(post.id, { upvotes: parseInt(post.upvotes) + 1 }));
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    const { data, showInput } = this.state
    const { error, isFetching, success } = this.props.result

    return (
      <div className="container">
        {(isFetching || !success) &&
          <div id="overlay">
            <i className="fa fa-spinner fa-spin fa-5x pageCenter"></i>
            {!isFetching && !success && alert("Error: " + JSON.stringify(error))}
          </div>
        }
        <h2>POSTS: </h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Post</th>
              <th>CreatedOn</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => {
              return (
                <tr key={i}>
                  <td>{d.name}</td>
                  <td>{d.text}</td>
                  <td>{dateformat(new Date(d.createdOn), 'mmm dd, yyyy, hh:MM tt')}</td>
                  <td>
                    {`${d.upvotes} ${d.upvotes > 1 ? 'upvotes' : 'upvote'}`}
                    <Button bsStyle='link' onClick={this.upvotePost.bind(this, d)}>
                      <i className="fa fa-thumbs-up">+1</i>
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {
          !showInput ?
            <Button bsStyle='primary' onClick={this.handleAddNewPost}>Add New Post</Button> :
            <div style={{ "display": "flex" }}>
              <textarea className="form-control" onChange={this.handleChange} rows="3"></textarea>
              <Button bsStyle='primary' style={{ "margin": "20px" }} onClick={this.addNewPost}>Add</Button>
            </div>
        }
      </div >
    )
  }
};

const mapStateToProps = (state) => {
  const { result } = state

  return { result };
};


export default connect(mapStateToProps)(App);
