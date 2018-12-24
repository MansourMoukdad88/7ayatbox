import React, { Component } from "react";
import $ from "jquery";
import Home from "../Components/Home/Home";
import Nav from "../Components/Home/NavBar/Nav";
import Footer from "../Components/Home/Footer/Footer";
import Categories from "../Components/Categories/Categories";
import SignIn from "../Components/SignIn/SignIn";
import Budget from "../Components/Categories/Budget/Budget";
import BudgetResult from "../Components/Categories/BudgetResult/BudgetResult";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  componentDidMount() {
    $.ajax({
      url: "/user/login",
      type: "POST",
      data: { email: "mahmoud@gmail.com", password: "123456", name: "mahmoud" },
      success: data => {
        //alert("Hi");
        console.log("success");
        this.setState({ text: data.express });
      },
      error: err => {
        console.log("ERROR");
      }
    });
  }
  render() {
    return (
      <div>
        <Nav />

        <BrowserRouter>
          <Switch>
            <Route exact path="/SignIn" component={SignIn} />
            <Route exact path="/" component={Home} />
            <Route exact path="/Categories" component={Categories} />
            <Route exact path="/budget" component={Budget} />
            <Route exact path="/budgetresult" component={BudgetResult} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
