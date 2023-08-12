import React, { Fragment, useEffect, useState } from "react";
import "./newCustomOrder.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createCustomOrder } from "../../actions/customOrderAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_CUSTOM_ORDER_RESET } from "../../constants/customOrderConstants";

const NewCustomOrder = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newCustomOrder);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [software, setsoftware] = useState("");
  const [logoNumber, setLogoNumber] = useState("0");
  const [logoName, setLogoName] = useState("")
  const [format, setFormat] = useState("")
  const [dimensions , setDimensions] = useState("")
  const [requiredColors , setRequiredColors] = useState("")
  const [numberOfColors , setNumberOfColors] = useState("0")
  const [centerPoint , setCenterPoint] = useState("")
  const [remarks , setRemarks] = useState("");
  
  // const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // const categories = [
  //   "Embroidery Digitizing",
  //   "Embroidery Patches",
  //   "Vector Art",
  //   "Pu Labels"
  // ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("CustomOrder Created Successfully");
      history.push("/");
      dispatch({ type: NEW_CUSTOM_ORDER_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createCustomOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("description", description);
    myForm.set("phone", phone);
    // myForm.set("category", category);
    myForm.set("software", software);
    myForm.set("logoNumber", logoNumber);
    myForm.set("logoName", logoName);
    myForm.set("format", format);
    myForm.set("dimensions", dimensions);
    myForm.set("requiredColors", requiredColors);
    myForm.set("numberOfColors", numberOfColors);
    myForm.set("centerPoint", centerPoint);
    myForm.set("remarks", remarks);
    
    // myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createCustomOrder(myForm));
  };

  const createCustomOrderImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create CustomOrder" />
      <div className="class-for-margin-top">
      <div className="dashboard">
        <SideBar />
        <div className="newCustomOrderContainer">
          <form
            className="createCustomOrderForm"
            encType="multipart/form-data"
            onSubmit={createCustomOrderSubmitHandler}
          >
            <h1>Create CustomOrder</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="CustomOrder Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="CustomOrder Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            
            {/* <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div> */}
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Phone"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Software"
                required
                onChange={(e) => setsoftware(e.target.value)}
              />
            </div>
            {/* <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div> */}
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Logo Number"
                required
                onChange={(e) => setLogoNumber(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Logo Name"
                required
                onChange={(e) => setLogoName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Format"
                required
                onChange={(e) => setFormat(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Dimentions"
                required
                onChange={(e) => setDimensions(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Required Colors "
                required
                onChange={(e) => setRequiredColors(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Number Of Colors"
                required
                onChange={(e) => setNumberOfColors(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Center Point"
                required
                onChange={(e) => setCenterPoint(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Comments"
                required
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            {/* <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div> */}

            {/* <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div> */}
             <p className="upload-image-text">Upload Custom Order Images</p>
            <div id="createCustomOrderFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createCustomOrderImagesChange}
                multiple
              />
            </div>

            <div id="createCustomOrderFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="CustomOrder Preview" />
              ))}
            </div>

            <Button
              id="createCustomOrderBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
      </div>
    </Fragment>
  );
};

export default NewCustomOrder;
