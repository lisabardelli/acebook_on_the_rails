'use strict';

// console.log("hi")

const p = React.createElement;

class PostForm extends React.Component {
  constructor(props) {
    // console.log(props),
    super(props)
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault()
    alert('A message was submitted: ' + this.state.value);
  }

  render() {
    return p(
      'form',
      { onSubmit: this.handleSubmit },
      [
        p("textarea", { value: this.state.value, onChange: this.handleChange }, undefined),
        p('button', undefined, "Submit")
      ]
    )
  }
}


class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
    this.getData()
    }
  // call to API
  getData() {
    const url = '/index_API'
    let postsDiv = document.getElementById('display-posts')

    fetch(url)
    .then(response => response.json())
    .then(result => {
      this.setState({list: result})
    }
    )}



  render() {
    return p(
      "div",
      undefined,
      this.state.list.map((post_data) => {
        console.log(post_data.id)
        return p(
          "div",
          { className: "row mb-4" },
          p(
            "div",
            { className: "col-xs-4 col-xs-offset-4" },
            p(Post, post_data, undefined)
          )
        );
      })
    );
  }
}
class Post extends React.Component {
  // constructor(props) {
  //   super(props);
    // }
    render() {
    return p(
      // React.createElement(
      //   type,
      //   [props],
      //   [...children]
      // )
      'div', //type of element.it can also be react component ----> call this script before PostPage
      { className: "p-3 border border-dark"}, //html tag --> attribute of the tag; react component --> props
      [
        p("p", undefined, this.props.message),
        p("p", undefined, `created at ${this.props.created_at}`),
        p("p", undefined, `created by ${this.props.username}`)
      ///like button --> create another class
      ] // content of the post --> 3 p element children
    );
  }
}

const pageContainer = document.getElementById('posts-page');
ReactDOM.render(p(PostPage), pageContainer);

const formContainer = document.getElementById('post-form');
ReactDOM.render(p(PostForm), formContainer);




// "-------------"
// class Form extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { username: '' }
//   }
//
//   handleChange(event) {}
//
//   render() {
//     return (
//       <form>
//         Username:
//         <input
//           type="text"
//           value={this.state.username}
//           onChange={this.handleChange}
//         />
//       </form>
//     )
//   }
// }
