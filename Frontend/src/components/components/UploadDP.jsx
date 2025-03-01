import { useState } from "react";
import axios from "axios";

export default function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return alert("Please select a file!");
    const formData = new FormData();
    formData.append("file", file);
    try {
        const response = await axios.post("http://localhost:3000/file/profile", formData);
        alert("File uploaded successfully!");
        console.log(response.data);
    } catch (error) {
        console.error("Upload error:", error);
        alert("Upload failed!");
    }
};
  return (
    <div>
      <input type="file" name="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}
