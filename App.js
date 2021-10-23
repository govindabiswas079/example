import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import QrcodeDecoder from 'qrcode-decoder';
import swal from 'sweetalert';

function App() {
  const [inputText, setInputText] = useState({
    Name: '',
    Email: '',
    Mobile: ''
  });
  const [qrCodeText, setQRCodeText] = useState('');
  const [imagePreview, setImagePreview] = useState("");
  const [user, setUser] = useState("");

  const [username, setUsername] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [confrimpassword, setConfrimpassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [userData, setUseData] = useState({
    username: '',
    email: '',
    password: '',
    confrimpassword: '',

    isValidUser: true,
    isValidPassword: true,
    isValidConfrimpassword: true,
  });
  const [show, setShow] = useState(false);
  const showPassword = () => setShow(!show);

  const usernameInput = (e) => {
    if (e.target.value.trim().length >= 6) {
      setUseData({
        ...userData,
        username: e.target.value,
        isValidUser: true
      });
    } else {
      setUseData({
        ...userData,
        username: e.target.value,
        isValidUser: false
      });
      setUsername(false);
    };
  };


  let handleOnChange = () => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // let re = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

    if (re.test(userData.email)) {
      setIsValidEmail(false)
    }
    else {
      setIsValidEmail(true)
    }
  };

  const emailInput = (e) => {
    if (e.target.value.trim().length >= 0) {
      setUseData({
        ...userData,
        email: e.target.value
      });

      setEmail(false);
      handleOnChange();
    } else {
      setUseData({
        ...userData,
        Email: e.target.value,
      });
    }
  };

  const passwordInput = (e) => {
    if (e.target.value.trim().length >= 8) {
      setUseData({
        ...userData,
        password: e.target.value,
        isValidPassword: true
      });
    } else {
      setUseData({
        ...userData,
        password: e.target.value,
        isValidPassword: false,
      });
      setPassword(false)
    };
  };

  const confrimpasswordInput = (e) => {
    if (e.target.value !== userData.password) {
      setUseData({
        ...userData,
        confrimpassword: e.target.value,
        isValidConfrimpassword: false
      });
      setConfrimpassword(false)
    } else {
      setUseData({
        ...userData,
        confrimpassword: e.target.value,
        isValidConfrimpassword: true
      });
    };
  };


  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    }
  };

  var validation = '';
  const validatee = () => {
    if (checkStringNullEmpty(userData.username)) {
      setUsername(true)
    }
    if (checkStringNullEmpty(userData.email)) {
      setEmail(true)
    }
    if (checkStringNullEmpty(userData.password)) {
      setPassword(true)
    }
    if (checkStringNullEmpty(userData.confrimpassword)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setConfrimpassword(true)
    }
    if (validation !== '') {
      return null;
    }
    else {

    }
  };

  var finalData = JSON.stringify({
    data: {
      UserName: userData.username,
      Email: userData.email,
      Password: userData.password,
      CPassword: userData.confrimpassword
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    validatee();
    if (validation === '') {
      swal("done")
      console.log("finalData", finalData)
    } else {
      return null;
    }
  }

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
        sessionStorage.setItem("data", data)
        setUser(data)
        //alert(data);
      } else {
        alert('res.data')
      }
    });
  }

  useEffect(() => {
    qrdecode()
  })

  const QRINFO = JSON.stringify({
    Info: {
      Name: inputText.Name,
      Email: inputText.Email,
      Mobile: inputText.Mobile
    }
  });

  const generateQRCode = () => {
    setQRCodeText(QRINFO);
  }


  const namee = 'Prem_BiswasQRCode';
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
          <input type="name" placeholder="Enter Name" name="Name" value={inputText.Name} onChange={(e) => setInputText({ ...inputText, Name: e.target.value })} />
          <input type="text" placeholder="Enter Email" name="Email" value={inputText.Email} onChange={(e) => setInputText({ ...inputText, Email: e.target.value })} />
          <input type="text" placeholder="Enter Mobile" name="Mobile" value={inputText.Mobile} onChange={(e) => setInputText({ ...inputText, Mobile: e.target.value })} />
          <input type="button" value="Generate" onClick={generateQRCode} />
        </div>
        <br />
        <br />
        <QRCode id="qrCodeEl" size={150} value={qrCodeText} />
        <br />
        <br />
        <input type="button" className="download-btn" value="Download" onClick={downloadQRCode} />
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
              : 'Not Selected Yet'
            }
          </div>
        </div>
      </div>

      <div>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">User</label>
            <input type="email" className="form-control" name="username" value={userData.username} onChange={(e) => usernameInput(e)} />
            <div>
              {userData.isValidUser ? null : <p style={{ color: 'red' }}>Username must be 6 characters long.</p>}
            </div>
            <div>
              {username ? <p style={{ color: 'red' }}>User Name is Required</p> : null}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={userData.email} onChange={(e) => emailInput(e)} />
            <div>
              {isValidEmail ? <p style={{ color: 'red' }}>Enter Valide Email.</p> : null}
            </div>
            <div>
              {email ? <p style={{ color: 'red' }}>Email is Required</p> : null}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type={show ? "text" : "password"} className="form-control" name="password" value={userData.password} onChange={(e) => passwordInput(e)} />
            <div>
              {userData.isValidPassword ? null : <p style={{ color: 'red' }}>Password must be 8 characters long.</p>}
            </div>
            <div>
              {password ? <p style={{ color: 'red' }}>Password is Required</p> : null}
            </div>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(e) => showPassword(e)} />
            <label className="form-check-label" htmlFor="exampleCheck1">{show ? "Hide Password" : "Show Password"}</label>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Confrim Password</label>
            <input type="password" className="form-control" name="confrimpassword" value={userData.confrimpassword} onChange={(e) => confrimpasswordInput(e)} />
            <div>
              {userData.isValidConfrimpassword ? null : <p style={{ color: 'red' }}>Confirm Password and Password not same.</p>}
            </div>
            <div>
              {confrimpassword ? <p style={{ color: 'red' }}>Confrim Password is Required</p> : null}
            </div>
          </div>
          <button type="submit" className="btn btn-primary" onClick={(e) => onSubmit(e)}>Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
