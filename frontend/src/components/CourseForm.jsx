import { useState } from "react";
import {
  TextField,
  Box,
  FormControl,
  Chip,
  Button,
  Typography,
} from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import updateCourse from "../../utils/updateCourse";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const CourseForm = (props) => {
  const { formData } = props;

  const [notification, setNotification] = useState(false);

  const [data, setData] = useState({
    ...formData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
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
      <Typography variant="h4">Update Form</Typography>
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
            error
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
            error
          />

          <CloudinaryUploadWidget />

          <Box>
            <TextField
              onKeyDown={handleKeyDown}
              label="Skills"
              placeholder="Enter Skills Separted By Shift Key"
              helperText="Incorrect entry."
              onChange={handleChange}
              fullWidth
              error
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

          <TextField
            name="ETC"
            required
            label="Time To Complete"
            onChange={handleChange}
            helperText="string only"
            sx={{ width: "200px" }}
            value={data.ETC}
            error
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
