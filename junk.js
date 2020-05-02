// class CP1Screen extends React.Component {
//     static navigationOptions = {
//     };

//     render() {
//       return (
//         <View style={styles.container}>
//             <Image
//                 style={styles.logo}
//                 source={require('../../assets/favicon.png')}
//             />
//             <Text
//                 style={styles.text}
//             > In this section, you will be asked different questions which help us personalize your experience further
//             </Text>
//         </View>
//       );
//     }
// }

// const CareerProfileStack = createStackNavigator({
//     CareerProfile: CareerProfileScreen
// },{
//     defaultNavigationOptions: {
//       title: 'Career Profile',
//       headerStyle: {
//         backgroundColor: 'darkslategrey'
//       },
//       headerTitleStyle: {
//         fontWeight: "bold",
//         color: "yellow",
//       },
//       headerTitleAlign: 'center'
//     },
// });

<div className='careerprofile__wrapper__header'>
  <span
    style={{ fontSize: "17px", fontWeight: "bolder" }}
    className='careerprofile__wrapper__header__header1'
  >
    In this section, you will be asked different questions which help us
    personalize your experience further.{" "}
    <b>
      Please note that we do not share any of the responses you give in this
      section with the employers
    </b>
    . This section is completely to analyse you for better career planning and
    this section directly impacts the Career Insights Section and all your
    recommendations. Please,
    <b> it is recommended to be honest and answer these questions seriously</b>
  </span>
  <br />
  <ul
    className='careerprofile__wrapper__header__header1'
    style={{ fontSize: "18px", marginLeft: "15px" }}
  >
    <li>There are 4 sections</li>
    <li>
      You won't be able to edit your response later, hence start only when you
      are free.{" "}
    </li>
    <li>
      Total time needed: 25-30 minutes. You can attempt different sections at
      different times.
    </li>
  </ul>
</div>;
<div
  style={{
    display: "flex",
    flex: 1,
    width: "60%",
    marginLeft: "20%",
  }}
>
  {renderTestsStatus(testsStatus)}
</div>;
<button
  className='button'
  onClick={() => startTest(testsStatus)}
  style={{
    display: "flex",
    flex: 1,
    marginTop: "5%",
    width: "60%",
    justifyContent: "center",
    marginLeft: "20%",
  }}
>
  <div className='text'>{pageVisit(testsStatus)}</div>
</button>;
// import { createBrowserHistory } from "history";
// import Landing from '../components/Landing';
// import StudentInfo from '../components/userDetails/StudentInfo'
// import EmployerInfo from "../components/userDetails/EmployerInfo";
// import PrivateRoute from "./PrivateRoute";
// import PublicRoute from "./PublicRoute";
// import LoginForm from "../components/LoginForm";
// import RegisterForm from "../components/RegisterForm";
// import RegisterForm2 from "../components/RegistrationForm2";
// import Main from "../components/StudentDashboard/Main";
// import StudentSkills from '../components/userDetails/StudentSkills';
// import Loader from "../components/Loader";
// import Courses from "../components/StudentDashboard/Pages/Courses/Courses";
// import NewCourses from "../components/StudentDashboard/Pages/Courses/NewCourses";
// import AboutInternshipPage from "../components/StudentDashboard/Pages/Internships/AboutInternshipPage";
// import Sent from "../components/StudentDashboard/Pages/Sent";
// import StudentForm from "../components/userDetails/StudentForm";
// import Internships from "../components/StudentDashboard/Pages/Internships/Internships";
// import Notifications from "../components/StudentDashboard/Pages/Notifications/Notifications";
// import Applied from "../components/StudentDashboard/Pages/Internships/Applied";
// import InternshipForm from "../components/RecruiterDashboard/InternshipForm";
// import CareerOptions from "../components/CareerOptions/careerOptions.component";
// import DashboardPage from "../components/tests/DashboardPage";
// import TestInfo from "../components/tests/TestInfo";
// import TestPage from "../components/tests/TestPage";
// import ApplyInternship from "../components/StudentDashboard/applyInternship/main";
// import CreatedInternships from "../components/RecruiterDashboard/createdInternships/main";
// import ApplicantsTab from "../components/Applicants/Applicants.component";
// import EditStudentProfile from "../components/userDetails/EditStudentProfile";
// import TrackApplicants from '../components/TrackApplicants/track'
// import TrackApplicants from "../components/TrackApplicants/trackApplicants.component";
// import ApplicantsProfile from "../components/ApplicantsProfile/applicantsProfile.component";
// // import Cashback from "../components/StudentDashboard/Pages/Cashback/Cashback";
// import Dash from "../components/Admin/Dash";
// import AdminInternship from "../components/Admin/AdminInternship";
// import AdminInternshipOne from "../components/Admin/AdminInternshipOne";
// import Rsupport from "../components/Support/Rsupport";
// import Ssupport from "../components/Support/Ssupport";
// import Forgotmain from "../components/forget/Main";
// import ForgetPassword from "../components/forget/ForgetPassword";
// import TermsAndConditions from "../components/termsandconditions";
// import PrivacyPolicy from "../components/privacyPolicy";
// import AspirationalCourse from "../components/StudentDashboard/Pages/Courses/AspirationalCourse";
// import {
// 	// BrowserView,
// 	MobileView,
// 	// isBrowser,
// 	// isMobile,
// } from "react-device-detect";
// import Applications from "../components/Applicatioins/Applications";
// import SkillTest from "../components/SkillTest/SkillTest";
// import CovidReport from "../components/StudentDashboard/Pages/Courses/CovidReport";
// import CovidReportPublic from "../components/StudentDashboard/Pages/Courses/CovidReportPublic";
// import CovidReportForm from "../components/StudentDashboard/Pages/Courses/CovidReportForm";
// import CoursesNew from "../components/StudentDashboard/Pages/Courses/CoursesNew";
// import PricingPage from "../components/Pricing/PricingPage";
// import StudentResume from "../components/Resume/StudentResume";
(
  <MobileView>
    {pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/register/employer" ||
    pathname === "/admin/dash" ? null : (
      <div
        style={{
          position: "absolute",
          zIndex: 200,
          left: "0px",
          right: "0px",
          top: "0px",
          backgroundColor: "black",
          justifyContent: "center",
          display: "flex",
          height: "50px",
        }}
      >
        <h1 style={{ color: "white" }}> Site works best on desktop </h1>
      </div>
    )}
  </MobileView>
),
  (
    <PrivateRoute
      exact
      path='/dashboard'
      component={Main}
      scope={["student", "recruiter", "admin"]}
    />
  ),
  (
    <PrivateRoute
      exact
      path='/courses'
      component={() => <CoursesNew />}
      scope={["student"]}
    />
  ),
  (<Route path='/pricing' component={PricingPage} exact={true} />),
  (<PublicRoute exact path='/covid' component={() => <CovidReportForm />} />),
  (
    <PublicRoute
      exact
      path='/covid-report'
      component={() => <CovidReportPublic />}
    />
  ),
  (
    <PrivateRoute
      exact
      path='/student/covid-report'
      component={() => <CovidReport />}
      scope={["student"]}
    />
  ),
  (
    <PrivateRoute
      exact
      path='/aspirational_course'
      component={() => <AspirationalCourse />}
      scope={["student"]}
    />
  ),
  (<PrivateRoute exact path='/newcourses' component={() => <NewCourses />} />);
<PrivateRoute
  exact
  path='/internships/careerOptions'
  component={CareerOptions}
  scope={["student"]}
/>;
<PrivateRoute
  exact
  path='/internship/add'
  component={InternshipForm}
  scope={["recruiter"]}
/>;
(<PrivateRoute exact path='/notifications' component={Notifications} />),
  (<PrivateRoute path='/loader' component={Loader} />),
  {
    /* <PrivateRoute
					exact
					path="/student/expertise"
					component={StudentExperiance}
					scope={["student"]}
				/> */
  },
  (
    <PrivateRoute
      path='/student/profile'
      component={StudentForm}
      exact={true}
      scope={["student"]}
    />
  ),
  {
    /* <PrivateRoute
					path="/student/editprofile"
					component={EditStudentProfile}
					exact={true}
					scope={["student"]}
				/> */
  },
  (
    <PrivateRoute
      path='/recruiter/profile'
      component={EmployerInfo}
      exact={true}
      scope={["recruiter"]}
    />
  ),
  {
    /* <PrivateRoute
					path="/test"
					component={DashboardPage}
					exact={true}
					scope={["student"]}
				/> */
  },
  {
    /* <PrivateRoute
					path="/test/:name"
					component={TestPage}
					scope={["student"]}
				/> */
  },
  {
    /* <PrivateRoute
					path="/testInfo/:name"
					component={TestInfo}
					scope={["student"]}
				/> */
  },
  (<PrivateRoute path='/sent' component={Sent} exact={true} />),
  (
    <PrivateRoute
      exact
      path='/support/recruiter'
      component={Rsupport}
      scope={["recruiter", "student"]}
    />
  ),
  (
    <PrivateRoute
      exact
      path='/support/student'
      component={Ssupport}
      scope={["recruiter", "student"]}
    />
  ),
  (<PublicRoute exact path='/forget' component={Forgotmain} />),
  (<PublicRoute exact path='/passwordchange/:id' component={ForgetPassword} />),
  (<PublicRoute exact path='/terms' component={TermsAndConditions} />),
  (<PublicRoute exact path='/privacy_policy' component={PrivacyPolicy} />),
  {
    /* Admin Routes */
  },
  (
    <PrivateRoute exact path='/admin/dash' component={Dash} scope={["admin"]} />
  ),
  (
    <PrivateRoute
      exact
      path='/admin/internships'
      component={AdminInternship}
      scope={["admin"]}
    />
  ),
  (
    <PrivateRoute
      exact
      path='/admin/internship/:id'
      component={AdminInternshipOne}
      scope={["admin"]}
    />
  ),
  {
    /* --------------- AUTH ROUTES ------------- */
  },
  (<PublicRoute path='/login' component={LoginForm} exact={true} />),
  (<PublicRoute exact path='/' component={LoginForm} exact={true} />),
  (<PublicRoute path='/register' component={RegisterForm} exact={true} />),
  (<PublicRoute exact path='/register/employer' component={RegisterForm2} />),
  {
    /*----------------------- ADMIN ROUTE ------------------------*/
  },
  {
    /* <PrivateRoute exact path="/passcode" component={Cashback}/> */
  },
  {
    /* --------------- INTERNSHIP STUDENT ROUTES ------------- */
  },
  (
    <Route
      exact
      path='/internships'
      component={Internships}
      // scope={["student"]}
    />
  ),
  {
    /* <PrivateRoute exact path="/internships/applied" component={Applied} /> */
  },
  (
    <Route
      path='/about/internship/:id'
      component={AboutInternshipPage}
      exact={true}
      // scope={["student"]}
    />
  ),
  (
    <PrivateRoute
      path='/applicants/:internshipId'
      component={TrackApplicants}
      exact={true}
      scope={["recruiter"]}
    />
  ),
  (
    <Route
      exact
      path='/apply/:id'
      component={ApplyInternship}
      // scope={["student"]}
    />
  ),
  {
    /* --------------- RECRUITER INTERNSHIP ------------------ */
  },
  (
    <PrivateRoute
      exact
      path='/internships/created'
      component={CreatedInternships}
      scope={["recruiter"]}
    />
  ),
  (
    <PrivateRoute
      path='/internships/applicants'
      component={ApplicantsTab}
      exact={true}
      scope={["recruiter"]}
    />
  ),
  (
    <PrivateRoute
      path='/internships/applications'
      component={Applications}
      exact={true}
      scope={["recruiter"]}
    />
  ),
  {
    /* <PrivateRoute exact path="/track/applicants" component={TrackApplicants} /> */
  },
  (
    <PrivateRoute
      path='/internships/applicantsProfile'
      component={ApplicantsProfile}
      exact={true}
      scope={["recruiter"]}
    />
  ),
  (
    <PrivateRoute
      path='/student/resume'
      component={StudentResume}
      exact={true}
      scope={["student"]}
    />
  );
