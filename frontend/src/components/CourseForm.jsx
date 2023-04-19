import { useState } from "react";
import {
  TextField,
  Box,
  FormControl,
  Chip,
  Button,
  Typography,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import updateCourse from "../../utils/updateCourse";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const CourseForm = (props) => {
  const { formData } = props;

  const [notification, setNotification] = useState(false);

  const [data, setFields] = useState({
    ...formData,
  });

  console.log(data.required);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFields((prev) => {
      if (type === "checkbox") {
        const required = [...prev.required];

        if (checked) {
          required.push(name);
        } else {
          const index = required.indexOf(name);
          if (index !== -1) {
            required.splice(index, 1);
          }
        }
        return {
          ...prev,
          required,
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  console.log(data);
  const mutation = useMutation(updateCourse, {
    onError: (error) => {
      console.log("error updating course", error);
    },
    onSuccess: (data) => {
      console.log("course successfully updated", data);
    },
  });

  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Shift") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag !== "") {
        setTags([...tags, newTag]);
        e.target.value = "";
      }
    }
  };

  const updateSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await mutation.mutateAsync(data);
    } catch (error) {
      console.error("error updating module:", error);
    }
  };

  return (
    <Box noValidate autoComplete="off">
      <Typography
        variant="h4"
        sx={{
          fontSize: "2rem",
          color: "#1769aa",
          fontWeight: "500",
          marginBottom: "25px",
        }}
      >
        Update Course
      </Typography>
      <form onSubmit={updateSubmit}>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            width: "800px",
          }}
        >
          <TextField
            name="cname"
            onChange={handleChange}
            required
            label="Course Name"
            value={data.cname}
          />

          <TextField
            name="description"
            required
            label="Description"
            helperText="Incorrect entry."
            onChange={handleChange}
            value={data.description}
            rows={6}
            multiline
          />

          <CloudinaryUploadWidget setFields={setFields} />

          <Box>
            <TextField
              onKeyDown={handleKeyDown}
              label="Skills"
              placeholder="Enter Skills Separted By Shift Key"
              helperText="Incorrect entry."
              onChange={handleChange}
              fullWidth
            />
            <>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  style={{ margin: "10px 8px 10px 0" }}
                />
              ))}
            </>
          </Box>

          <Box>
            <FormLabel component="legend">
              Select Which Department Of Employees This Course For
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    checked={data.required.includes("HR")}
                    name="HR"
                  />
                }
                label="HR Departemnet"
                style={{ color: "black" }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    checked={data.required.includes("IT")}
                    name="IT"
                  />
                }
                label="IT Support"
                style={{ color: "black" }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    checked={data.required.includes("LAW")}
                    name="LAW"
                  />
                }
                label="LAW Department"
                style={{ color: "black" }}
              />
            </FormGroup>
            <FormHelperText>select one or more</FormHelperText>
          </Box>

          <TextField
            name="ETC"
            required
            label="Time To Complete"
            onChange={handleChange}
            helperText="string only"
            sx={{ width: "200px" }}
            value={data.ETC}
          />
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default CourseForm;
