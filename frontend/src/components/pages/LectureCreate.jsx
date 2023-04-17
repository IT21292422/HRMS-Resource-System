import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Editor } from "../index.mjs";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AlertBox } from "../index.mjs";
import createModule from "../../../utils/createModule";

const LectureCreate = () => {
  const { cid } = useParams();

  const [content, setContent] = useState({
    id: cid,
    page: {
      header: "",
      body: "",
    },
  });

  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const mutation = useMutation(createModule, {
    onError: (error) => {
      console.log("Error Creating Module", error);
      setNotification({
        type: "error",
        message: "module creation failed",
      });
    },
    onSuccess: (data) => {
      console.log("Course Created Successfully", data);
      setNotification({
        type: "success",
        message: "module successfully created",
      });

      setContent({
        id: cid,
        page: {
          header: "",
          body: "",
        },
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await mutation.mutateAsync(content);
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  const handleContentChange = (data) => {
    if (typeof data === "string") {
      setContent((prev) => ({
        ...prev,
        page: {
          ...prev.page,
          body: data,
        },
      }));
    } else {
      setContent((prev) => ({
        ...prev,
        page: {
          ...prev.page,
          header: data.target.value,
        },
      }));
    }
  };

  console.log(content);

  return (
    <Box sx={{ backgroundColor: "#ffff", color: "black", marginTop: "100px" }}>
      <Box sx={{ marginBottom: "20px", padding: "0 10vw" }}>
        {notification.type && (
          <AlertBox type={notification.type} message={notification.message} />
        )}
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{ marginBottom: "20px", textAlign: "right", padding: "0 10vw" }}
        >
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Box>
        <Editor handleContent={handleContentChange} content={content} />
      </form>
    </Box>
  );
};

export default LectureCreate;
