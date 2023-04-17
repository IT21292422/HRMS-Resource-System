import React from "react";
import { Stack } from "@mui/system";
import { CourseInfoCard } from "./index.mjs";

const Ongoing = (props) => {
  const { content } = props;
  console.log(content);

  const ongoing = content.map((course) => (
    <CourseInfoCard key={course._id} cname={course.cname} />
  ));
  return <Stack gap={5}>{ongoing}</Stack>;
};

export default Ongoing;
