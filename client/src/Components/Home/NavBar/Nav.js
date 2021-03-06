import React ,{Component} from 'react'
import "./Nav.css"
import $ from "jquery"
import {Redirect} from 'react-router-dom'





class Nav extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
      name:""
    }
  }
  handleSubmit = (event) => {
    var obj = {
      email: this.state.email,
      password: this.state.password
    }
    console.log("my obj in nav",obj)
    $.ajax({
      type: "POST",
      url: '/provider/login',
      data: {
        email: obj.email,
        password: obj.password
      },
      success: (res) => {
        console.log(res)
      console.log("res sucsee",res)
        if (res) {
          
          this.setState({
            isLoggedIn: true,
            name:res.name
          })
        }
      }
    });

    event.preventDefault();
  }

  render() {
    if (this.state.isLoggedIn) {
    //   return <Redirect to={{
    //     pathname: '/Budget',
    //   }} />
    // }}
    }
    return (
      <div>

        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li className="parent"><a href="#">Categotires</a>
              <ul className="child">
                <li><a href="/ViewCategories">Wedding Halls</a></li>
             
                <li><a href="/ViewCategories">Dj</a></li>
                <li><a href="/ViewCategories">Beauty Center</a></li>
                <li><a href="/ViewCategories">Flowers</a></li>
                <li>{this.state.name}</li>
              </ul>
            </li>

            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#" data-toggle="modal" data-target="#signIn">Provider Sign In</a></li>
            <li><a href="#" data-toggle="modal" data-target="#signIn">User Sign In</a></li>
          </ul>
        </nav>


        <div className="modal fade" id="signIn" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLongTitle">Provider Sign In </h3>



              </div>
              <div class="modal-body">
              <div className="wrapper">
    <form className="form-signin" onSubmit={this.handleSubmit}>       
      <h2 className="form-signin-heading">Event Manager login</h2>
      <input type="text" className="form-control" name="email" placeholder="Email Address" required="" autofocus="" value={this.state.email} onChange={e=>this.setState({email:e.target.value})} />
      <input type="password" className="form-control" name="password" placeholder="Password" required="" value={this.state.password} onChange={e=>this.setState({password:e.target.value})}/>      
      <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>   
    </form>
  </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-target="planmodal" data-dismiss="modal">Close</button>


          
              </div>
            </div>
          </div>
        </div>

      </div>

    )
  }
}




export default Nav
