import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Title, Tab, Tabs, TabHeading } from "native-base";
import Layout from '../Layout';

export default class MatchList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matchList: []
    };

    fetch('http://188.226.147.71:3000/matches')
      .then((res) => res.json())
      .then((res) => {
        this.setState((prev) => {
          prev.matchList = res;
          return prev;
        })
      });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Layout navigate={navigate}>
        <Header>
          <Left onPress={() => {}}>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Matches</Title>
          </Body>
          <Right />
        </Header>
        {this.state.matchList.length ? matchesView(navigate)(this.state.matchList) : <Spinner />}
      </Layout>
    );
  }
}

const matchesView = (navigate) => (matches) => {
  let liveMatches = matches.filter(match => match.isLive);
  let futureMatches = matches.filter(match => match.isFuture);
  let pastMatches = matches.filter(match => match.isPast);

  let liveMatchesView = liveMatches.map(matchView(navigate));
  let futureMatchesView = futureMatches.map(futureMatchView(navigate));
  let pastMatchesView = pastMatches.map(pastMatchView(navigate));

  return (
    <Tabs>
      <Tab heading={ <TabHeading><Text>Live</Text></TabHeading>}>
        {liveMatchesView}
      </Tab>
      <Tab heading={ <TabHeading><Text>Future</Text></TabHeading>}>
        {futureMatchesView}
      </Tab>
      <Tab heading={ <TabHeading><Text>Recent</Text></TabHeading>}>
        {pastMatchesView}
      </Tab>
    </Tabs>
  );
};

const matchView = (navigate) => (match) => {
  return (
    <ListItem ket={match.matchPage} style={{marginLeft: 0}} onPress={() => {navigate("MatchOverview", {matchPage: match.matchPage})}}>

      <Body>
        <Text>{match.firstTeamTag} vs. {match.secondTeamTag}</Text>
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  );
};


const futureMatchView = (navigate) => (match) => {
  return (
    <ListItem ket={match.matchPage} style={{marginLeft: 0}}>

      <Body>
      <Text>{match.firstTeamTag} vs. {match.secondTeamTag}</Text>
      </Body>
      <Right>
        <Text>{match.timeTOStart}</Text>
      </Right>
    </ListItem>
  );
};


const pastMatchView = (navigate) => (match) => {
  return (
    <ListItem ket={match.matchPage} style={{marginLeft: 0}} >

      <Body>
      <Text>{match.firstTeamTag} vs. {match.secondTeamTag}</Text>
      </Body>
      <Right>
        <Text>{match.firstTeamScore} : {match.secondTeamScore}</Text>
      </Right>
    </ListItem>
  );
};
