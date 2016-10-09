var CommentBox = React.createClass({
  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,	
      dataType: 'json', 
      success: function (data, textStatus, jqXHR) {
	this.setState({data: data});
      }.bind(this),
      error: function (jqXHR, textStatus, errorThrown) {
	console.error(this.props.url, textStatus, errorThrown.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function (comment) {
    return;
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function () {
    return (
      <div className="commentBox">
	<h1>Comments</h1>
	<CommentList data={this.state.data} />
	<CommentForm onCommentSubmit={this.handleCommentSubmit} />
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
  getInitialState: function () {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function (e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''})
  },
  render: function () {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
	<input 
	  type="text"  
	  placeholder="You name" 
	  value={this.state.author} 
	  onChange={this.hndleAuthorChange} 
	/>
	<input 
	  type="text" 
	  placeholder="Say something..." 
	  value={this.state.text}
	  onChange={this.handleTextChange}
	/>
	<input type="submit" value="Post" /> 
      </form>
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
    <CommentBox url='/api/comments' pollInterval={2000} />,
    document.getElementById('content')
    );
