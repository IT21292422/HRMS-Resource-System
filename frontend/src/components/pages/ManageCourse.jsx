import { useState } from "react";
import { resolvePath, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import fetchCourse from "../../../utils/fetchCourse";
import deleteModule from "../../../utils/deleteModule";
import BarChart from "../BarChart";
import { CourseForm } from "../index.mjs";
import UserTable from "../userTable";
import {
  Box,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  ListItemAvatar,
  Avatar,
  CardActionArea,
  Card,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SchoolIcon from "@mui/icons-material/School";

const ManageCourse = () => {
  const { id } = useParams();

  const [form, setForm] = useState(false);
  // const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // setFormData((prev) => {
    //   return {
    //     ...prev,
    //     [name]: value,
    //   };
    // });
  };

  const { data, isLoading } = useQuery(["details", id, "admin"], fetchCourse, {
    onError: (error) => {
      console.log(`Error Occured ${error}`);
    },
    onSuccess: (data) => {
      console.log("Course Successfully Load");
      // const { cid, img, cname, description, ETC, skills } = data;

      // setFormData({
      //   cid,
      //   img,
      //   cname,
      //   description,
      //   ETC,
      //   skills,
      // });
    },
  });

  const mutation = useMutation(deleteModule);

  const handleModuleDelete = async (cid, mid) => {
    const moduleObj = {
      cid,
      mid,
    };

    try {
      console.log(cid, mid);
      const result = await mutation.mutateAsync(moduleObj);
    } catch (error) {
      console.error("error updating module:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const {
    _id,
    img,
    cid,
    cname,
    description,
    deptCounts,
    enrollers,
    skills,
    createdAt,
    updatedAt,
    modules,
    ETC,
  } = data;

  const lessons =
    modules &&
    modules.map((lesson) => {
      const { _id, header } = lesson;
      return (
        <ListItem
          sx={{ width: "400px", color: "black", backgroundColor: "#d2e8f9" }}
        >
          <ListItemAvatar>
            <Avatar>
              <SchoolIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={header} secondary="Secondary text" />
          <IconButton aria-label="edit" onClick={() => handleUpdateModule(_id)}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon onClick={() => handleModuleDelete(id, _id)} />
          </IconButton>
        </ListItem>
      );
    });

  const handleCreateModule = () => {
    window.open(`http://localhost:5173/learning/admin/course/${id}/editor`);
  };

  const handleUpdateModule = (mid) => {
    console.log(mid);
    window.open(
      `http://localhost:5173/learning/admin/course/${id}/module/${mid}/editor`
    );
  };

  return (
    <Box sx={{ backgroundColor: "#ffff" }}>
      <Box p={10} sx={{ display: "flex", backgroundColor: "#1D9BF0" }}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "400px",
              height: "200px",
              flexGrow: 1,
            }}
          >
            <img src={img} />
          </Box>
        </Box>
        <Box sx={{ flexGrow: 4, color: "#fff" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "600" }}
          >{`${cname}-(${cid})`}</Typography>

          <Typography>{description}</Typography>

          <Button onClick={() => setForm((prev) => !prev)}>Edt</Button>
        </Box>
      </Box>

      {form && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "4rem",
          }}
        >
          <CourseForm
            formData={{ cid, img, cname, description, ETC, skills }}
          />
        </Box>
      )}

      <Box sx={{ margin: "2rem" }}>
        <Card
          sx={{
            width: "300px",
            height: "180px",
            backgroundColor: "#E8F3FD",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            color: "black",
          }}
        >
          <CardActionArea
            sx={{
              color: "#595959",
              width: "300px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={handleCreateModule}
          >
            <Typography variant="h6">Add New Module</Typography>
            <Box>
              <AddCircleOutlineIcon size="large" />
            </Box>
          </CardActionArea>
        </Card>
      </Box>

      <Box sx={{ margin: "2rem" }}>
        <Typography
          mb={2}
          sx={{
            color: "#595959",
            fontSize: "1.2rem",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Modules
        </Typography>
        {modules && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              alignItems: "center",
              justifyItems: "center",
              rowGap: "5px",
            }}
          >
            {lessons}
          </Box>
        )}
      </Box>

      <Box sx={{ backgroundColor: "#E8F5FE", paddingTop: "20px" }}>
        <Typography
          mt={2}
          mb={5}
          sx={{
            color: "#595959",
            fontSize: "1.2rem",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          No Of Enrollments According To Department
        </Typography>
        <BarChart data={deptCounts} />
      </Box>

      <Box sx={{ padding: "2rem" }}>
        <Typography
          mb={5}
          mt={2}
          sx={{
            color: "#595959",
            fontSize: "1.2rem",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Employee Course Completion
        </Typography>
        <UserTable users={enrollers} mCount={modules.length} cid={_id} />
      </Box>
    </Box>
  );
};

export default ManageCourse;
