import React, { Fragment, useEffect } from "react";
// import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Hero from "../Home/Hero";
import HomeService from "../Home/HomeService";
import Homesection1 from "./Homesection1";
import HomeSection2 from "./HomeSection2";
import HomeSection3 from "./HomeSection3";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    
    <Fragment>
      <Hero/>
      <HomeService/>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="RAA Digitizing" />


          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
     <Homesection1/>
     <HomeSection2/>
     <HomeSection3/>

    </Fragment>
  );
};

export default Home;
