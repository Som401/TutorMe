import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function AddContent({ tutors }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("http://localhost:8080");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "http://localhost:8080",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status == "ok") {
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  };
  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:5000/files/${pdf}`);
  };
  const styleContainer = {
    backgroundColor: "white",
    minHeight: "100vh",
    width: "100%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0",
  };
  const [id, setid] = useState("1");
  const selectedTutor = tutors.find((elt) => elt.id === id);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar tutor={selectedTutor} />
      </div>
      <div style={styleContainer}>
        <form className="formStyle" onSubmit={submitImage}>
          <h4>Upload Pdf in React</h4>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="description"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            type="file"
            class="form-control"
            accept="application/pdf"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <button class="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
       { /*<div className="uploaded">
          <h4>Uploaded PDF:</h4>
          <div className="output-div">
            {allImage == null
              ? ""
              : allImage.map((data) => {
                  return (
                    <div className="inner-div">
                      <h6>Title: {data.title}</h6>
                      <button
                        className="btn btn-primary"
                        onClick={() => showPdf(data.pdf)}
                      >
                        Show Pdf
                      </button>
                    </div>
                  );
                })}
          </div>
        </div>
        <PdfComp pdfFile={pdfFile} />*/}
      </div>
    </div>
  );
}
export default AddContent;
