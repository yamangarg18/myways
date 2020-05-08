import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startAddTests } from "../../actions/test";
// import axios from "axios";
import SkillSet from "./SkillSet";
import WorkOrientation from "./WorkOrientation";
import Expectation from "./Expectation";
import Personality from "./Personality";

const AnalysisPage = (props) => {
  const tests = useSelector((state) => state.test.tests);
  const dispatch = useDispatch();
  const [isTestActive, setIsTestActive] = useState(false);

  useEffect(() => {
    if (!tests) dispatch(startAddTests());
  }, [dispatch, tests]);

  const renderTest = (testName) => {
    switch (testName) {
      case "skill_set":
        return <SkillSet />;
      case "work_orientation":
        return <WorkOrientation />;
      case "expectation":
        return <Expectation />;
      case "personality":
        return <Personality />;
      default:
        return "Invalid test";
    }
  };

  return (
    <div className='testpage'>
      {tests && !isTestActive && renderTestIntructions(props.match.params.name)}
      {tests && isTestActive && renderTest(props.match.params.name)}
    </div>
  );
};

export default AnalysisPage;
