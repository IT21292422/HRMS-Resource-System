import { useState } from "react";
import {
  Box,
  FormControl,
  TextField,
  MenuItem,
  Chip,
  FormGroup,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Button,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AlertBox } from "./index.mjs";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import createCourse from "../../utils/createCourse";

const types = [
  { value: "GE", label: "GE" },
  { value: "IT", label: "IT" },
  { value: "HR", label: "HR" },
  { value: "PD", label: "PD" },
  { value: "AC", label: "AC" },
];

const dept = [
  { value: "GE", label: "GE" },
  { value: "HR", label: "HR Dept" },
  { value: "LAW", label: "LAW Dept" },
  { value: "AC", label: "AC" },
];

const CreateNew = () => {
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });
  const [tags, setTags] = useState([]);

  const [fields, setFields] = useState({
    cname: "",
    category: "GE",
    img: "",
    nid: "",
    ETC: "",
    requireTo: [],
    description: "",
    skills: [],
  });

  const mutation = useMutation(createCourse, {
    onError: (error) => {
      console.log("Error Creating Course", error);
      setNotification({
        type: "error",
        message:
          "combination course id already exist course creation failed!!!",
      });
    },
    onSuccess: (data) => {
      console.log("Course Created Successfully", data);
      setNotification({
        type: "success",
        message: "course created successfully",
      });
      setFields({
        nid: "",
        category: "",
        img: "",
        cname: "",
        ETC: "",
        requireTo: [],
        description: "",
        skills: [],
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await mutation.mutateAsync(fields);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Shift") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag !== "") {
        setTags([...tags, newTag]);
        e.target.value = "";
      }
    }

    setFields((prev) => ({
      ...prev,
      skills: [...tags],
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFields((prev) => {
        const requireTo = [...prev.requireTo];

        if (checked) {
          requireTo.push(name);
        } else {
          const index = requireTo.indexOf(name);
          if (index !== -1) {
            requireTo.splice(index, 1);
          }
        }

        return {
          ...prev,
          requireTo,
        };
      });
    } else {
      setFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <Box>
      {notification.type && (
        <AlertBox type={notification.type} message={notification.message} />
      )}
      <form onSubmit={handleSubmit}>
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
            required
            label="Course Name"
            onChange={handleChange}
            value={fields.cname}
          />
          <Box>
            <TextField
              id="outlined-select-category"
              select
              name="category"
              value={fields.category}
              defaultValue="GE"
              sx={{ width: "200px" }}
              label="Course Category"
              onChange={handleChange}
              helperText="select course category"
            >
              {types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              name="nid"
              required
              sx={{ marginLeft: "15px" }}
              onChange={handleChange}
              label="Course ID"
              value={fields.nid}
              helperText="numbers only"
            />
          </Box>

          <TextField
            name="description"
            onChange={handleChange}
            value={fields.description}
            required
            label="Description"
            rows={6}
            multiline
          />

          <Box>
            <TextField
              onKeyDown={handleKeyDown}
              label="Skills"
              placeholder="Enter Skills Separted By Shift Key"
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

          <CloudinaryUploadWidget setFields={setFields} />

          <Box>
            <FormLabel component="legend">
              Select Which Department Of Employees This Course For
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={handleChange} name="HR" />}
                label="HR Departemnet"
                style={{ color: "black" }}
              />
              <FormControlLabel
                control={<Checkbox onChange={handleChange} name="IT" />}
                label="IT Support"
                style={{ color: "black" }}
              />
              <FormControlLabel
                control={<Checkbox onChange={handleChange} name="LAW" />}
                label="LAW Department"
                style={{ color: "black" }}
              />
            </FormGroup>
            <FormHelperText>select one or more</FormHelperText>
          </Box>

          <TextField
            name="ETC"
            onChange={handleChange}
            value={fields.ETC}
            required
            label="Time To Complete"
            helperText="string only"
            sx={{ width: "200px" }}
          />

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default CreateNew;
