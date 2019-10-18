import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'
import APIConnect from './api-connect'
import dateformat from 'dateformat'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: []
    }

    this.handleAddNewPost = this.handleAddNewPost.bind(this)
    this.addNewPost = this.addNewPost.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { result: { success, isFetching, content, method } = {} } = nextProps

    if (success && !isFetching) {
      if (method !== 'get') {
        this.props.dispatch(APIConnect.get())
      }
      else {
        this.setState({ data: content, showInput: false })
      }
    }
    else {
      this.setState({ data: [], showInput: false })
    }
  }

  componentDidMount() {
    this.props.dispatch(APIConnect.get())
  }

  handleAddNewPost() {
    this.setState({ showInput: true })
  }

  addNewPost() {
    this.props.dispatch(APIConnect.post({ name: 'Amit kumar', text: this.state.text }))
  }

  upvotePost(post) {
    this.props.dispatch(APIConnect.upvote(post.id, { upvotes: parseInt(post.upvotes) + 1 }))
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  render() {
    if (this.props.result.isFetching) {
      return 'Loading...'
    }

    if (this.props.result.error) {
      return 'Error...'
    }

    return (
      <div>
        <div>POSTS:</div>
        <div>
          {this.state.data.map((d, i) => {
            return (
              <div key={i}>
                <span>{d.name}</span>
                <span>{d.text}</span>
                <span>
                  {dateformat(new Date(d.createdOn), 'mmm dd, yyyy, hh:MM tt')}
                </span>
                <Button bsStyle='link' onClick={this.upvotePost.bind(this, d)}>
                  {`${d.upvotes} Upvotes`}
                </Button>
              </div>
            )
          })}
        </div>
        {!this.state.showInput ?
          (<Button bsStyle='link' onClick={this.handleAddNewPost}>Add</Button>) :
          [<input key={0} onChange={this.handleChange} type='text'></input>,
          <Button bsStyle='link' key={1} onClick={this.addNewPost}>Add Post</Button>]
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    result: state.result
  };
}


export default connect(mapStateToProps)(App);
