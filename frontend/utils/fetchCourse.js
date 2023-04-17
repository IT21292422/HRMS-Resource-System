import axios from "axios";

const fetchCourse = async ({ queryKey }) => {
  const id = queryKey[1];
  const type = queryKey[2];

  const response = await axios.get(
    `http://localhost:8080/api/learn/course/${id}/${type}`
  );
  console.log(response.data);
  return response.data;
};

export default fetchCourse;
