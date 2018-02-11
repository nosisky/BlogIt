import React from 'react';
import ReactHtmlParser, {
	processNodes,
	convertNodeToElement, htmlparser2
} from 'react-html-parser';
import moment from 'moment';
import { Link } from 'react-router-dom';


const ArticleLists = ({ title, content, slug, username, time }) => {
	const newTime = moment(time).format('Do MMMM YYYY');

	return (
		<div className="col s12 m3">

			<div className="card">

				<div className="card-image waves-effect waves-block waves-light">
					<Link to={`/post/${slug}`}><img
						src="http://demo.geekslabs.com/materialize-v1.0/images/img2.jpg" alt="blog-img" />
					</Link>
				</div>
				<div className="card-content">
					<p className="row">
						<span className="left"><a href="">Technology</a></span>
						<span className="right">{newTime}</span>
					</p>
					<h4 className="card-title grey-text text-darken-4"><a href="#" className="grey-text text-darken-4">{title}</a>
					</h4>
					<div className="blog-post-content truncate">{ReactHtmlParser(content)}</div>
					<div className="divider"></div>
					<p></p>
					<div className="row">
						<div className="col s3">
							<img src="http://demo.geekslabs.com/materialize-v1.0/images/avatar.jpg" className="img-blog" />
						</div>
						<div className="col s9"> By <a href="#">{username}</a></div>
					</div>
				</div>
			</div>
		</div>

	);
};

export default ArticleLists;
