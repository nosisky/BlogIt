import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';

const	getFirstImage = (content) => {
  const elem = document.createElement('div');
  elem.style.display = 'none';
  document.body.appendChild(elem);
  elem.innerHTML = content;

  if(!elem.querySelector('img')){
    return '/img/blogit.png'
  } else {
    return elem.querySelector('img').src;
  }
}

const ArticleLists = ({ title, content, slug, username, time }) => {
  const newTime = moment(time).format('Do MMMM YYYY');

  return (
    <div className="col s12 m3">
      <div className="card">
        <div className="card-image">
          <Link to={`/post/${slug}`}><img
            src={getFirstImage(content)} 
            height="319px"
            width="319px"
            alt="blog-img" />
          <span className="card-title">{title}</span>
          </Link>
        </div>
        <div className="card-content">
          <TextTruncate
            line={3}
            truncateText="…"
            text={(content.replace(/<(?:.|\n)*?>|&nbsp;/gm, ''))}
          />
        </div>
        <div className="card-action">
          <div className="row">
            <div className="col s3">
              <img src="/img/avatar.jpg" 
                className="img-blog" />
            </div>
            <div className="col s9"> By <a href="#">{username}</a></div>
            <span className="right time">{newTime}</span>
          </div>
		
        </div>
      </div>
    </div>
  );
};

export default ArticleLists;


{/* <div className="col s12 m3">

<div className="card">

	<div className="card-image waves-effect waves-block waves-light">
		<Link to={`/post/${slug}`}><img
			src="/img/blogit.png" alt="blog-img" />
		</Link>
	</div>
	<div className="card-content">
		<p className="row">
			<span className="left"><a href="">Technology</a></span>
			<span className="right">{newTime}</span>
		</p>
		<h4 className="card-title grey-text text-darken-4"><a href="#" 
			className="grey-text text-darken-4">{title}</a>
		</h4>
		<div className="blog-post-content">
			<TextTruncate
				line={1}
				truncateText="…"
				text={(content.replace(/<(?:.|\n)*?>/gm, ''))}
				textTruncateChild={<Link to={`/post/${slug}`}>
					Read more
				</Link>}
			/>	</div>

		<div className="row">
			<div className="col s3">
				<img src="/img/avatar.jpg" 
					className="img-blog" />
			</div>
			<div className="col s9"> By <a href="#">{username}</a></div>
		</div>
		
	</div>
</div>
</div> */}
