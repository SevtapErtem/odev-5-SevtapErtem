import React, { Component } from "react";
import { Header } from "../container";
import { TweetForm } from "../component/tweetForm";
import { TweetList } from "../component/tweetList";
import user from "../view/login";

class Home extends Component {
  constructor() {
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

  onChangeTweetForm(event) {
    this.setState({ tweetText: event.target.value });
  }

  handleTweetSubmit() {
    const newTweets = [...this.state.tweets];

    newTweets.unshift({
      id: "svt-svt-svt",
      username: user.username,
      //username tanımının yapılması gerektiğini biliyorum.
      // Ancak login fonksiyonunu çalıştıramadığım için tweet atamıyorum.
      //Bu sebeple bu satırı yoruma aldım.
      replyCount: 20,
      retweetCount: 300,
      likeCount: 200,
      tweetContent: this.state.tweetText,
      dateTime: "4 hours ago",
    });
    this.setState({ tweets: newTweets });
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
