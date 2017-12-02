import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Title } from "native-base";
import {Image} from 'react-native';

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);

    const { navigate } = this.props.navigation;

    this.state = {
      selectedModule: 'NewsModule',
      navigate: navigate
    };

    this.setModule = this.setModule.bind(this);
  }

  setModule(module) {
    this.state.navigate(module);
    this.setState((prev) => {
      prev.selectedModule = module;
      return prev;
    });
  }

  render() {
    return (
      <View>
        <Header style={{backgroundColor: 'white'}}>
          <Left>
            <Image source={require("../logo.png")} style={{width: 76, height: 74}} />
          </Left>
          <Body />
        </Header>
        <List>
          <ListItem itemDivider={this.state.selectedModule === 'NewsModule'} button noBorder onPress={() => this.setModule('NewsModule')}>
            <Left>
              <Icon name="paper" />
              <Body>
              <Text>News</Text>
              </Body>
            </Left>
          </ListItem>

          <ListItem itemDivider={this.state.selectedModule === 'PlayerModule'} button noBorder onPress={() => this.setModule('PlayerModule')}>
            <Left>
              <Icon name="ios-people" />
              <Body>
                <Text>Players</Text>
              </Body>
            </Left>
          </ListItem>

          <ListItem itemDivider={this.state.selectedModule === 'StreamModule'} button noBorder onPress={() => this.setModule('StreamModule')}>
            <Left>
              <Icon name="easel" />
              <Body>
                <Text>Streams</Text>
              </Body>
            </Left>
          </ListItem>

          <ListItem itemDivider={this.state.selectedModule === 'LiveModule'} button noBorder onPress={() => this.setModule('LiveModule')}>
            <Left>
              <Icon name="easel" />
              <Body>
                <Text>Live matches</Text>
              </Body>
            </Left>
          </ListItem>

          <ListItem button noBorder />

          {/*<ListItem itemDivider={this.state.selectedModule === 'SettingsModule'} button noBorder onPress={() => this.setModule('SettingsModule')}>*/}
            {/*<Left>*/}
              {/*<Icon name="settings" />*/}
              {/*<Body>*/}
              {/*<Text>Settings</Text>*/}
              {/*</Body>*/}
            {/*</Left>*/}
          {/*</ListItem>*/}
          <ListItem itemDivider={this.state.selectedModule === 'FeedbackModule'} button noBorder onPress={() => this.setModule('FeedbackModule')}>
            <Left>
              <Icon name="chatboxes" />
              <Body>
              <Text>Feedback</Text>
              </Body>
            </Left>
          </ListItem>
          <ListItem itemDivider={this.state.selectedModule === 'AboutModule'} button noBorder onPress={() => this.setModule('AboutModule')}>
            <Left>
              <Icon name="help" />
              <Body>
              <Text>About</Text>
              </Body>
            </Left>
          </ListItem>
        </List>
      </View>
    );
  }
}
