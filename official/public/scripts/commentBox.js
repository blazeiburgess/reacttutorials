var data = [
  {id: 1, author: "Pete Hunt", text: "This is a comment"},
  {id: 2, author: "Jordan Walke", text: "This is another comment"}
];

var CommentBox = React.createClass({
  render: function () {
    return (
      <div className="commentBox">
	<h1>Comments</h1>
	<CommentList data={this.props.data} />
	<CommentForm />
      </div>
    )
  }
});

var CommentList = React.createClass({
  render: function () {
    // this variable is rendered in the top functions return statement as a 
    // variable being passed through
    var commentNodes = this.props.data.map(function(comment) {
      return (
	<Comment author={comment.author} key={comment.id}>
	  {comment.text}
	</Comment> 
      )
    });
    // this bit actually gets rendered
    return (
	<div className="commentList">
	  {commentNodes}
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
  <CommentBox data={data} />,
  document.getElementById('content')
);
