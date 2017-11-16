import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";
import Layout from './Layout';
import HeroDetails from '../Components/Hero/HeroDetails';


export default class Hero extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    const hero = this.props.navigation.state.params.hero;
    return (
      <Layout navigate={navigate}>
        <HeroDetails hero={hero} navigate={navigate} />
      </Layout>
    );
  }
}
