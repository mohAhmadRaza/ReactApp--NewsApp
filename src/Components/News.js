import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState("");
  const [totalArticles, setTotalArticles] = useState(0);
  const [pages, setPages] = useState([]);

  const Capitalizing = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const updateNewsStart = async () => {
    props.setProgress(10)

    let url = `https://newsdata.io/api/1/latest?apikey=${props.apikey}&q=${props.category}&country=${props.country}`;

    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.results);
    setNextPage(parsedData.nextPage || "");
    setPages([...pages, nextPage]);
    setTotalArticles(parsedData.totalResult || 0);
    props.setProgress(100);
  }

  useEffect(() => {
    updateNewsStart();
  }, [])

  const NextButton = async () => {
    let url = `https://newsdata.io/api/1/latest?apikey=${props.apikey}&q=${props.category}&country=${props.country}&page=${nextPage}`;
    
    props.setProgress(20);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.results)
    setNextPage(parsedData.nextPage || "");
    setPages([...pages, nextPage]);
    setTotalArticles(parsedData.totalResult || 0);
    props.setProgress(100);
  }

  const PrevButton = async () => {

    if (pages.length > 1){
      const newPages = [...pages];
      newPages.pop();

      const PrevPage = newPages[newPages.length - 1];

      let url = `https://newsdata.io/api/1/latest?apikey=${props.apikey}&q=${props.category}&country=${props.country}&page=${PrevPage}`;
      
      props.setProgress(20)
      let data = await fetch(url);
      props.setProgress(50)
      let parsedData = await data.json();
      props.setProgress(70)
      setArticles(parsedData.results)
      setNextPage(parsedData.nextPage);
      setPages(newPages);
      setTotalArticles(parsedData.totalResult || 0);
      props.setProgress(100);
    }
  }

    return (
      <div className="container my-3">
        <h1 className="text-center">
          MonkeyNews -Top Headlines From{" "}
          {Capitalizing(props.category)}
        </h1>
        {loading && <Spinner/>}
        <div className="row">
          {(articles || []).map((element) => {
            return (
              <div className="col-md-4" key={element.article_id}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.image_url}
                  newsUrl={element.link}
                  author={element.creator}
                  date={element.pubDate}
                  source={element.source_id}
                />
              </div>
            );
          })}
        </div>
        <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
          <button className="btn btn-primary" onClick={PrevButton} disabled={pages.length <= 1}>Back</button>
          <button className="btn btn-primary" onClick={NextButton}>Next</button>
      </div>
      </div>
    );
}

export default News;