
import './App.css';
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import useResize from "./Resize";
import html2canvas from "html2canvas";

function App() {

  const [image1, setImage1] = useState<File>();
  const [image2, setImage2] = useState<File>();
  const [deg1, setDeg1] = useState<number>(0);
  const [deg2, setDeg2] = useState<number>(0);

  const [directionRow, setDirectionRow] = useState<boolean>(true);
  const { width, height } = useResize();

  useEffect(() => {
    if (width < 1120) {
      setDirectionRow(false);
    } else {
      setDirectionRow(true);
    }
  }, [width]);

  const handleChangeImage1 = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      setImage1(files[0]);
    }
  };

  const handleChangeImage2 = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      setImage2(files[0]);
    }
  };

  const rotateImage1 = () => {
    setDeg1((cur) => {
      return (cur + 90) % 360;
    });
  };

  const rotateImage2 = () => {
    setDeg2((cur) => {
      return (cur + 90) % 360;
    });
  };

  const swapImages = () => {
    if (image1 && image2) {
      const temp = image1;
      setImage1(image2);
      setImage2(temp);
    }
  };

  const downloadImage = async () => {
    if (!(image1 && image2)) {
      alert("Upload images");
      return;
    }
    const element = document.getElementById("diptych_preview");
    if (element) {
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/jpg");
      const link = document.createElement("a");

      link.href = data;
      link.download = "diptych-image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="app">
          <div className="diptych">
      <div className={directionRow ? "diptych_top_row" : "diptych_top_column"}>
        <div className={directionRow ? "diptych_info_row" : "diptych_info_column"}>
          <div className="diptych_title vollkorn_font">
            Turn <span className="green_font">pictures</span>
            <br /> into <span className="pink_font">diptych</span>
          </div>
          <div className="diptych_description lato_font">
            <p>Diptych photography adds a story to the picture. </p>
            <p>Commonly used technique for half-frame camera as the film is separated vertically.</p>
            <p>Now in the digital era, why don't we apply this technique to digital images?</p>
          </div>
        </div>
        <div className={directionRow ? "diptych_upload_row" : "diptych_upload_column"}>
          <div className="diptych_upload_header">Upload images</div>
          <div className="diptych_upload_body">
            <div className="diptych_upload_requirement">
              <p>Requirements</p>
              <li>File formats: .png .jpg .jpeg .HEIC</li>
            </div>
            <div className="diptych_upload_buttons">
              <div className="diptych_upload_button">
                <label className="diptych_upload_button">
                  <input type="file" id="image1-upload" onChange={handleChangeImage1} accept="image/jpeg, image/png, image/jpg, image/HEIC" />
                  1st 🖼️
                </label>
              </div>
              <div className={`diptych_upload_button_rotate ${image1 ? "diptych_upload_button_clickable" : "diptych_upload_button_not_clickable"}`} onClick={rotateImage1}>
                🔄
              </div>
              <div className={`diptych_upload_button_swap ${image1 && image2 ? "diptych_upload_button_clickable" : "diptych_upload_button_not_clickable"}`} onClick={swapImages}>
                ↔
              </div>
              <div className="diptych_upload_button">
                <label className="diptych_upload_button">
                  <input type="file" id="image1-upload" onChange={handleChangeImage2} accept="image/jpeg, image/png, image/jpg, image/HEIC" />
                  2nd 🖼️
                </label>
              </div>
              <div className={`diptych_upload_button_rotate ${image2 ? "diptych_upload_button_clickable" : "diptych_upload_button_not_clickable"}`} onClick={rotateImage2}>
                🔄
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="diptych_upload_download">
        <div className="diptych_upload_download_button" onClick={downloadImage}>
          Download
        </div>
      </div>
      <div className="diptych_preview" id="diptych_preview">
        {image1 ? (
          <div className="diptych_preview_image" style={{ transform: `rotate(${deg1}deg)` }}>
            <img alt="preview image" src={URL.createObjectURL(image1)} />
          </div>
        ) : (
          <div className="diptych_preview_dummy">
            <p>🌞</p>
          </div>
        )}
        <div className="diptych_preview_middle"></div>
        {image2 ? (
          <div className="diptych_preview_image" style={{ transform: `rotate(${deg2}deg)` }}>
            <img alt="preview image" src={URL.createObjectURL(image2)} />
          </div>
        ) : (
          <div className="diptych_preview_dummy">
            <p>🌚</p>
          </div>
        )}
      </div>

    </div>
    </div>
  );
}

export default App;
