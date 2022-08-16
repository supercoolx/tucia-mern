import React from "react";
import { Switch, Route } from "react-router-dom";
import Test from "../Test";
import Home from "../home/Home";
import BottomNav from "../Bottom navigation/BottomNav";
import SignInSide from "../LoginAndSignUp/SignInSide";
import { useMediaQuery } from "react-responsive";
import Signup2 from "../LoginAndSignUp/Signup2";
import Checkout from "../order/Checkout";
import UserDashboard from "../userDashboard/UserDashboard";
import AllOrders from "../orders/AllOrders";
import Pricing from "../pricing/Pricing";
import Footer from "../footer/Footer";
import OrderSequence from "../orderSequence/OrderSequence";
import Order2 from "../orderSequence/Order2";
import UserDashboard2 from "../userDashboard/UserDashboard2";
import AdminTabs from "../admin/AdminTabs";
import UserTabs from "../user/UserTabs";
import MediaCard from "../faq/MediaCard";
import FAQ from "../faq/FAQ";
import Questions from "../faq/Questions";
import FaqAdminPanel from "../faq/FaqAdminPanel";
import ForgotPassword from "../LoginAndSignUp/ForgotPassword";
import ForgotPasswordTemplate from "../LoginAndSignUp/ForgotPasswordTemplate";
const Routes = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-device-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 700px)",
  });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignInSide} />
        <Route path="/signup" exact component={Signup2} />
        <Route path="/order" exact component={Order2} />
        <Route path="/userdashboard" exact component={UserTabs} />
        <Route path="/admindashboard" exact component={AdminTabs} />
        <Route path="/pricing" exact component={Pricing} />
        <Route path="/faq" exact component={FAQ} />
        <Route path="/questions/:id" exact component={Questions} />
        <Route path="/faqadminpanel" exact component={FaqAdminPanel} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
        {/* <Route
          path="/users/confirmEmail/:id/:key"
          exact
          component={ForgotPasswordTemplate}
        /> */}
      </Switch>
      <Footer />
      {isTabletOrMobileDevice ? (
        <div style={{ marginTop: "80px" }}></div>
      ) : (
        <></>
      )}
      {isTabletOrMobileDevice ? <BottomNav /> : <></>}
    </div>
  );
};
export default Routes;
