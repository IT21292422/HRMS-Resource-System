import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import fetchCourse from "../../../utils/fetchCourse";
import enrollEmployee from "../../../utils/enrollEmployee";
import background from "../../assets/coursebg.jpg";
import { useParams } from "react-router-dom";
import { border, borderRadius, height, padding, positions } from "@mui/system";
import { Link } from "react-router-dom";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

const CoursePage = () => {
  const { id } = useParams();

  const [enroll, setEnroll] = useState(false);

  const { mutateAsync } = useMutation(enrollEmployee, {
    onSuccess: (data) => {
      setEnroll(true);
    },
    onError: (error) => {
      console.log(`Error Occured ${error}`);
    },
  });

  const handeEnrolled = async () => {
    try {
      const result = await mutateAsync({ username, cid: id });
    } catch (err) {
      console.error(err);
    }
  };

  const username = localStorage.getItem("username");
  console.log(username);

  const { data, isLoading } = useQuery(
    ["details", id, "employee", username],
    fetchCourse,
    {
      onSuccess: (data) => {
        console.log("course successfully load");
        setEnroll(data.isEnrolled);
      },
      onError: (error) => {
        console.log(`Error Occured ${error}`);
      },
    }
  );

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  const { cid, description, cname, skills, updatedAt, ETC, createdAt } = data;
  console.log(data);

  const skiilSet = skills.map((skill) => (
    <span
      style={{
        backgroundColor: "#eeeeee",
        fontSize: "1rem",
        fontWeight: "600",
        color: "#616161",
        padding: "5px 12px",
        marginRight: "10px",
        borderRadius: "100px",
      }}
    >
      {skill}
    </span>
  ));

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "100vh",
        position: "relative",
        backgroundSize: "cover",
        overflow: "hidden",
      }}
    >
      <Box
        pl={10}
        pr={15}
        pt={10}
        pb={5}
        sx={{
          backgroundImage: "rgb(9,108,121)",
          color: "white",
          background:
            "linear-gradient(135deg, rgba(9,108,121,0.5375140765765766) 22%, rgba(23,105,170,0.9068834459459459) 85%)",
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack spacing={2} sx={{ width: "80vw" }}>
          <Typography variant="h3" fontWeight="500">
            {cname} ({cid})
          </Typography>
          <Typography variant="body2">{`${description.slice(
            0,
            500
          )}...`}</Typography>
          <Stack
            pt={3}
            pb={3}
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Typography fontWeight="600" variant="h5">
              ETC {ETC}
              <QueryBuilderIcon />
            </Typography>
            <Typography fontWeight="600" variant="h5">
              Get Credited
              <WorkspacePremiumIcon />
            </Typography>
            <Typography fontWeight="600" variant="h5">
              No Enrolls +100
              <InsertEmoticonIcon />
            </Typography>
          </Stack>

          {!enroll && (
            <Button
              variant="contained"
              size="large"
              component={Link}
              onClick={handeEnrolled}
              sx={{ width: "200px" }}
            >
              Enroll
            </Button>
          )}

          {enroll && (
            <Button
              variant="contained"
              size="large"
              component={Link}
              onClick={handeEnrolled}
              to={`/learning/courses/${cid}/module/0`}
              sx={{ width: "200px" }}
            >
              Visit
            </Button>
          )}

          <Stack direction="row" pt={2}>
            {skiilSet}
          </Stack>
          <Stack direction="row" pb={10} spacing={15}>
            <Typography variant="subtitle1">
              Published In: {createdAt.split("T")[0]}
            </Typography>
            <Typography variant="subtitle1">
              Lsat Updated In: {updatedAt.split("T")[0]}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default CoursePage;
