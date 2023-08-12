import React,{useState,useEffect} from 'react';
import "./CustomOrder.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createCustomOrder } from "../../../actions/customOrderAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
// import SideBar from "./Sidebar";
import { NEW_CUSTOM_ORDER_RESET } from "../../../constants/customOrderConstants";
import quoteimg from "../../../images/quote.jpg";
const Customorder = ({ history }) => {
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
    <>
     <MetaData title="Create CustomOrder" />
    <div className='customorder-main-container container-fluid m-0 p-0'>
        <div className="custom-order-header">
            <h1>CUSTOM ORDER</h1>
            <p>Welcome to our custom orders page, where you can bring your creative vision to life! Whether you need embroidery digitizing or art digitizing services, we're here to transform your ideas into stunning, high-quality designs. Place a custom order today and let our skilled team of professionals handle the rest.</p>
        </div>
       <div className='custom-order-content p-4'>
       <div className='custom-order-page-image'>
        <img src={quoteimg} className='animated-image'/>
       </div>
       <div className='custom-order-form-section'>
       <form onSubmit={createCustomOrderSubmitHandler}>
          <div className='input-field name-field'>
            <div className='field-icon'>
            <i class="fa-solid fa-user fa-2x pt-2"></i>
            </div>
            <input
            className="form-control-lg w-100"
            type="text"
            placeholder="CustomOrder Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          /> 
          </div>
          <div className='input-field email-field'>
            <div className='field-icon'>
            <i class="fa-solid fa-envelope fa-2x pt-2"></i>
            </div>
            <input
            className="form-control-lg w-100"
            type="text"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          /> 
          </div>
          <div className='input-field phone-field'>
            <div className='field-icon'>
            <i class="fa-solid fa-phone fa-2x pt-2"></i>
            </div>
            <input
            className="form-control-lg w-100"
            type="text"
            placeholder="Phone"
            required
            onChange={(e) => setPhone(e.target.value)}
          /> 
          </div>
          <div className='input-flex'>
          <input
            className="form-control-lg"
            type="text"
            placeholder="Logo Name"
            required
            onChange={(e) => setLogoName(e.target.value)}
          /> 
          <input
            className="form-control-lg"
            type="text"
            placeholder="Format"
            required
            onChange={(e) => setFormat(e.target.value)}
          /> 
          </div>
          <div className='input-flex'>
          <input
            className="form-control-lg"
            type="text"
            placeholder="Software"
            required
            onChange={(e) => setsoftware(e.target.value)}
          /> 
          <input
            className="form-control-lg"
            type="text"
                placeholder="Dimentions"
                required
                onChange={(e) => setDimensions(e.target.value)}
          /> 
          </div>
          <div className='input-flex'>
          <input
            className="form-control-lg"
            type="text"
                placeholder="Required Colors "
                required
                onChange={(e) => setRequiredColors(e.target.value)}
          /> 
          <select className="form-select-lg" 
          
          onChange={(e) => setNumberOfColors(e.target.value)}
          >
          <option selected>Number of Colors</option>
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
           <option value="6">6</option>
           <option value="7">7</option>
           <option value="8">8</option>
           <option value="9">9</option>
           <option value="10">10</option>

           </select>
          </div>
          <select className="form-select-lg w-100 center-point-select"
          required
          placeholder="Center Point"
          onChange={(e) => setCenterPoint(e.target.value)}
          >
          <option selected> Center Point (choose)</option>
           <option value="Top Center">Top Center</option>
           <option value="Top Left">Top Left</option>
           <option value="Top Right">Top Right</option>
           <option value="Center Left">Center Left</option>
           <option value="Center">Center</option>
           <option value="Center Right">Center Right</option>
           <option value="Bottom Left">Bottom Left</option>
           <option value="Bottom Center">Bottom Center</option>
           <option value="Bottom Right">Bottom Right</option>
           </select>
           <div className='input-field name-field'>
            <div className='field-icon'>
            <i class="fa-solid fa-comment fa-2x pt-2"></i>
            </div>
            <input
            className="form-control-lg w-100"
            type="text"
            placeholder="Comments"
            required
            onChange={(e) => setRemarks(e.target.value)}
          /> 
          </div>
         <textarea
         rows={5}
         className='text-area-field form-control-lg w-100'
         type='text'
         placeholder='Remarks' 
         required
         onChange={(e) => setDescription(e.target.value)}
         ></textarea>
        <div className='choose-file-section'>
        <p>Upload Art Work</p>
        <input
        required
        className='w-100'
          id="fileInput"
           type="file"
         onChange={createCustomOrderImagesChange}
          />
        </div>

        <div className="message">
      <button type="submit"  disabled={loading ? true : false} className="btn btn-lg contact-us-form-button">
       create
      </button>
      <div>
      {status.message && (
          <div className="message-notofication alert alert-dark">
            <p className={status.success === false ? "danger" : "success"}>
              {status.message}
            </p>
          </div>
          
        )}
        </div>
        </div>
     </form>
       </div>
       </div>
        </div>
     
        </>

  )
}

export default Customorder





