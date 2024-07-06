import React from "react";
import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { withTranslation } from "react-i18next";
import Title from "../Title";

class Header extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
    };
    this.resizeHandler = this.resizeHandler.bind(this);
  }

  resizeHandler() {
    const height = this.header.clientHeight;
    this.setState({ height });
    this.props.onHeightChange(height);
  }

  componentDidMount() {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  logoutHandler = () => {
    // console.log("logging out from header");
    this.context.logout();
  };

  render() {
    let { isLoggedIn, userName } = this.context;
    const { t, i18n } = this.props;

    return (
      <Container
        fluid
        className="fixed-top bg-info mb-2 border-bottom text-center  boxShadow"
        ref={(header) => {
          this.header = header;
        }}
      >
        <Navbar bg="white m-2 fs-5 bg-info" expand="sm">
          <Container fluid className="p-2 bg-info ">
            <Navbar.Brand to="/" as={NavLink}>
              <Button className="fs-5">{t("home")}</Button>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                        

              {isLoggedIn && (
                <Nav className="d-flex w-100 ">
                  <Link
                    className="bg-secondary m-2 shadow text-white fs-5 me-auto button btn btn-outline-secondary ms-1 my-2 text-decoration-none"
                    to="/new-post"
                    as={NavLink}
                  >
                    {t("New Article")}
                  </Link>
                  <div
                    className="btn bg-primary m-2 shadow text-white fs-5 align-self-center text-secondary"
                    style={{ cursor: "default" }}
                  >
                    <span>{`${t("")}  ${userName}`}</span>
                  </div>
                  <Link
                    className="button bg-danger fs-5 shadow text-white btn btn-outline-secondary me-1 my-2 text-decoration-none"
                    to="/"
                    as={NavLink}
                    onClick={this.logoutHandler}
                  >
                    {t("logout")}
                  </Link>
                </Nav>
              )}

              {!isLoggedIn && (
                <Nav className="d-flex  w-100 justify-content-end">
                  <Link
                    className="fs-5 bg-success border text-white button btn btn-outline-secondary me-1 my-1 text-decoration-none"
                    to="/login"
                    as={NavLink}
                  >
                    {t("login")}
                  </Link>
                  <Link
                    className="fs-5 button border bg-warning text-white  btn btn-outline-secondary me-1 my-1 text-decoration-none"
                    to="/register"
                    as={NavLink}
                  >
                    {t("register")}
                  </Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Title />
      </Container>
    );
  }
}

export default withTranslation()(Header);
