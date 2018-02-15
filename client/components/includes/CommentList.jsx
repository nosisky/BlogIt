import React from 'react';

const CommentList = ( { comment, author, time } ) => {
  return (
    <div>
      <div className="row">
        <div className="col s12 l9 m9" style={ { textTransform: 'Capitalize' } }>
          By: <a href="#">{ author }</a>
        </div>

        <div className="col s12 l3 m3 time">
          { time }
        </div>
      </div>
      <div className="row">
        <div className="col s12 l9 m9">
          { comment }
        </div>
        
      </div>
    </div>
  );
};

export default CommentList;

