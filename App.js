import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import QrcodeDecoder from 'qrcode-decoder';


function App() {
  const [inputText, setInputText] = useState('');
  const [qrCodeText, setQRCodeText] = useState('');
  const [imagePreview, setImagePreview] = useState("");
  const [user, setUser] = useState("");
  console.log(user)
  //const [user] = useState(JSON.parse(sessionStorage.getItem("data")));


  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file);
    }
  }

  /*  */ /*  */

  const qr = new QrcodeDecoder();

  const qrdecode = async () => {
    qr.decodeFromImage(imagePreview).then((res) => {
      const data = res.data;
      if (data === res.data) {
        //sessionStorage.setItem("data", data)
        setUser(data)
        alert(data);
        //window.location.reload("");
      } else {
        alert('res.data')
      }
    });
  }

  useEffect(() => {
    qrdecode()
  })

  const generateQRCode = () => {
    setQRCodeText(inputText);
  }


  const namee = 'Prem_Biswas-QRCode';
  const downloadQRCode = () => {
    const qrCodeURL = document.getElementById('qrCodeEl')
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    //aEl.download = "QR_Code.png";
    aEl.download = `${namee}.png`;
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }


  return (
    <>
      <br />
      <br />
      <div style={{ margin: '0 auto', maxWidth: '1040px' }} className="App">
        <div className="qr-input">
          <input
            type="text"
            placeholder="Enter input"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          />
          <input
            type="button"
            value="Generate"
            onClick={generateQRCode}
          />
        </div>
        <br />
        <br />
        <QRCode
          id="qrCodeEl"
          size={150}
          value={qrCodeText}
        />
        <br />
        <br />
        <input
          type="button"
          className="download-btn"
          value="Download"
          onClick={downloadQRCode}
        />
        <br />
        <br />
        <br />
        <br />
        <div style={{ display: 'flex' }}>
          <div><label htmlFor="files" className="btn btn-light">Uplead form gallery</label></div>
          <input id="files" style={{ visibility: "hidden" }} type="file" name="avatar" onChange={photoUpload} accept=".jpef, .png, .jpg" />
          <div style={{ borderRadius: "50%", height: "64px", width: "64px" }}>
            {user
              ? <img style={{ borderRadius: "50%", height: "100%", width: "100%" }} src={imagePreview} alt="" />
              : 'Not Selected'
            }
            {/* <img style={{ borderRadius: "50%", height: "100%", width: "100%" }} src={imagePreview} alt="" /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;