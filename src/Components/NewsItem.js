import React from "react";

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="my-4">
        <div className="card">
          <img
            src={
              !imageUrl
                ? "https://www.arabnews.pk/sites/default/files/2024/09/30/4529508-1359180841.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: '0',
            }}
          >
            <span class="badge rounded-pill bg-danger">{source}</span>
          </div>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} at{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;