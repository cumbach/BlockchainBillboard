import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

class CommentLinkField extends React.Component {
  render() {
    return (
      <div className='comment-link-field'>
        <strong>CommentLinkField</strong>
        <input className='comment'
               value={this.props.commentLink[0]}
               onChange={this.props.updateCommentLink}
               placeholder='Comment'/>

        <input className='link'
               value={this.props.commentLink[1]}
               onChange={this.props.updateCommentLink}
               placeholder='Link'/>
      </div>
    );
  }
}

export default CommentLinkField;
