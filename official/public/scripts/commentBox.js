var CommentBox = React.createClass({
  render: function () {
    return (
      <div className="commentBox">
	<h1>Comments</h1>
	<CommentList />
	<CommentForm />
      </div>
    )
  }
});

var CommentList = React.createClass({
  render: function () {
    return (
      <div className="commentList">
	<Comment author="Pete Hunt">This is the first comment</Comment>
	<Comment author="Jordan Walke">This is another comment</Comment>
      </div>
    )
  }
});

var CommentForm = React.createClass({
  render: function () {
    return (
      <div className="commentForm">
	Hello, world! I am a CommentForm.
      </div>
    )
  }
});

var Comment = React.createClass({
  rawMarkup: function () {
    // this function replaces the line:
    //   { md.render(this.props.children.toString()) }
    // which incorrectly renders html as text
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return {__html: rawMarkup };
  },
  render: function () { 
    return (
      <div className="comment">
        <h2 className="commentAuthor">
	  { this.props.author }
	</h2>
	<span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    )
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
