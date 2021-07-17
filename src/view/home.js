import React, { Component } from "react";
import { Header } from "../container";
import { TweetForm } from "../component/tweetForm";
import { TweetList } from "../component/tweetList";
//import user from "../view/login";

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      tweetText: "",
      tweets: [],
    };
    this.onChangeTweetForm = this.onChangeTweetForm.bind(this);
    this.handleTweetSubmit = this.handleTweetSubmit.bind(this);
  }

  componentDidMount() {
    fetch("tweetData.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ tweets: data });
      })
      .catch((err) => console.log(err));
  }
  componentWillMount() {
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    console.log(userData);
    console.log(isLoggedIn);
  }
  onChangeTweetForm(event) {
    this.setState({ tweetText: event.target.value });
  }

  handleTweetSubmit() {
    let newTweets = this.state.tweets;
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    let now = new Date();

    newTweets.unshift({
      id: "123",
      name: userData.name,
      username: userData.username,
      tweetContent: this.state.tweetText,
      likeCount: 0,
      retweetCount: 0,
      replyCount: 0,
      dateTime: now,
    });
    debugger;
    this.setState({
      tweets: [...newTweets],
    });
  }

  render() {
    const { tweetText, tweets } = this.state;

    return (
      <div className="latestTweets">
        <Header title="Home" />
        <TweetForm
          tweetText={tweetText}
          onChangeTweetForm={this.onChangeTweetForm}
          handleTweetSubmit={this.handleTweetSubmit}
        />
        <div className="latestTweets__divisor" />
        {tweets.length > 0 ? (
          <TweetList tweets={tweets} />
        ) : (
          <span>Loading...</span>
        )}
      </div>
    );
  }
}

export default Home;
