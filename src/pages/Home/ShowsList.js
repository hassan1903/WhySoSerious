import React from "react";
import PropTypes from 'prop-types';
import "./ShowsList.css";

class ShowsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: ''
    };
  }

  handleClick(e) {
    this.setState({ id: e.target.id })
  }

  render() {
    let showingPost = this.props.showsList.filter((item) => this.state.id == item.show.id);
    
    return (
      <div className="showslist">
        <div className="header">
          <strong>Batman TV Shows</strong>
        </div>
        <ul>
          {this.props.showsList &&
            this.props.showsList.map(post =>
              <li key={post.show.id}>
                <a id={post.show.id} onClick={this.handleClick.bind(this)} href="#">
                  {post.show.name}
                </a>
              </li>
            )}
        </ul>
        {
          this.state.id &&
          <div className="body">
            <strong>Descriptions</strong>
          </div>
        }

        {
          this.state.id && this.props.showsList &&
          <article>
            <div>
              <aside id="main-image">
                <img src={showingPost.map(item => item.show.image ? item.show.image.medium : null)} alt={showingPost.map(item => item.show.name)} />
              </aside>
              <article>
                {showingPost.map(item => item.show.summary)}
              </article>
            </div>
          </article>
        }
      </div >
    );
  }
}

ShowsList.propTypes = {
  showsList: PropTypes.any,
};

export default ShowsList;
