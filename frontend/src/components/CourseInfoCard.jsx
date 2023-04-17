import React from "react";
import {
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
  LinearProgress,
  Button,
} from "@mui/material";
import { Stack } from "@mui/system";

const CourseInfoCard = (props) => {
  const { cname } = props;
  return (
    <Card sx={{ display: "flex", width: "800px" }}>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/19/554c8d156a477690c6f0b81733c11c/intoduction-to-statistics_XFDS112.jpg"
      />
      <Box sx={{ width: "100%" }}>
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>
              <Stack
                direction="column"
                justifyContent="space-between"
                sx={{ height: "100%" }}
              >
                <Typography
                  pb={2}
                  variant="h4"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: "#212121",
                    height: "70px",
                    overflow: "hidden",
                  }}
                >
                  {cname}
                </Typography>

                <Box>
                  <Typography>Complete</Typography>
                  <LinearProgress variant="determinate" />
                </Box>
              </Stack>
            </Box>

            <Box
              p={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack spacing={2}>
                {/* <Button variant="contained">Enroll</Button> */}
                <Button variant="contained">Continue</Button>
                <Button variant="contained">View Certificate</Button>
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CourseInfoCard;
