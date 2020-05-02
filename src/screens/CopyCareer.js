// import React, { useState, useEffect } from "react"; //+++++++++++++++++++++++++++++
// import "./CareerProfile.styles.scss";
// import Layout from "../StudentDashboard/Layout";
// import StudentSkills from "../userDetails/StudentSkills"; //+++++++++++++++++++++++++++
// import ComingSoon from "../common/ComingSoon"; //+++++++++++++++++++++++++++
// import { List, Icon } from "semantic-ui-react";
import { history } from "../../routers/AppRouter";
// import axios from "axios";

const CareerProfile = () => {
  // const [testsStatus, setTestsStatus] = useState([
  //   {
  //     id: 1,
  //     testName: "Skill Set analysis",
  //     isCompleted: false,
  //     link: "/analysis/skill_set",
  //     field: "skill_set",
  //   },
  //   {
  //     id: 2,
  //     testName: "Expectation Analysis",
  //     isCompleted: false,
  //     link: "/analysis/expectation",
  //     field: "expectation",
  //   },
  //   {
  //     id: 3,
  //     testName: "Work Orientation Analysis",
  //     isCompleted: false,
  //     link: "/analysis/work_orientation",
  //     field: "work_orientation",
  //   },
  //   {
  //     id: 4,
  //     testName: "Career Values and Personality Analysis",
  //     isCompleted: false,
  //     link: "/analysis/personality",
  //     field: "personality",
  //   },
  // ]);
  // const [dataFetched, setDataFetched] = useState(false);

  // useEffect(() => {
  //   const getTestsStatus = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `${process.env.REACT_APP_BASE_URL}/api/user/getTestsStatus`
  //       );
  //       let newTestsStatus = [...testsStatus];
  //       newTestsStatus = newTestsStatus.map((test) => {
  //         test.isCompleted = data.response[test.field].status ? true : false;
  //         return test;
  //       });

  //       setDataFetched(true);
  //       setTestsStatus(newTestsStatus);
  //     } catch (error) {
  //       if (error.response === undefined) {
  //         console.log(error.message);
  //       } else {
  //         console.log(error.response.data.message);
  //       }
  //     }
  //   };
  //   if (!dataFetched) getTestsStatus();
  // }, [testsStatus, dataFetched]);

  // const renderTestsStatus = (testsStatus) => {
  //   return (
  //     <List verticalAlign='middle' style={{ flex: 1 }}>
  //       {testsStatus.map((test, index) => {
  //         const [iconName, iconColor, title] = test.isCompleted
  //           ? ["check circle", "green", "completed"]
  //           : ["exclamation", "yellow", "pending"];
  //         return (
  //           <List.Item key={index}>
  //             <List.Content floated='right'>
  //               <div>
  //                 <Icon
  //                   className='iconName'
  //                   name={iconName}
  //                   color={iconColor}
  //                   size={"small"}
  //                   title={title}
  //                 />
  //               </div>
  //             </List.Content>
  //             <List.Content>{test.testName}</List.Content>
  //           </List.Item>
  //         );
  //       })}
  //     </List>
  //   );
  // };

  // const startTest = (testsStatus) => {
  //   if (!testsStatus[0].isCompleted) {
  //     history.push(`${testsStatus[0].link}`);
  //   } else if (!testsStatus[1].isCompleted) {
  //     history.push(`${testsStatus[1].link}`);
  //   } else if (!testsStatus[2].isCompleted) {
  //     history.push(`${testsStatus[2].link}`);
  //   } else if (!testsStatus[3].isCompleted) {
  //     history.push(`${testsStatus[3].link}`);
  //   } else {
  //     history.push("/internships/careerOptions");
  //   }
  // };

  // const pageVisit = (testsStatus) => {
  //   if (
  //     testsStatus[0].isCompleted &&
  //     testsStatus[1].isCompleted &&
  //     testsStatus[2].isCompleted &&
  //     testsStatus[3].isCompleted
  //   ) {
  //     return "Explore Career Insights";
  //   } else {
  //     return "Start Analyzing";
  //   }
  // };

  return (
    <Layout>
      <div className='careerprofile__wrapper'>
        {/* <button className="button mt-2 mb-1" onClick = {() => alert("Hello")}>
                <div className="text">Getting Started</div>
            </button>
            {/* <StudentSkills nextStep={() => {}} prevStep={() => {}} onChange={() => alert("onChange")} values={{skills:[]}} errors={""} /> */}
        {/* <h1>Comming Soon....</h1> */}
        {/* <ComingSoon/> */}
      </div>
    </Layout>
  );
};

export default CareerProfile;
