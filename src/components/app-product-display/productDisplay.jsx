import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavMenu from "../NavMenu";
import axios from "axios";
import {
  ProductDescriptionSection,
  ProductItemdetailsSection,
  SimilarProductsSection,
  ProductTopSection,
} from "./components";
import { ApiDataPostType } from "../../api/Api";

function ProductDisplay() {
  const params = useParams();
  const [productData, setProductData] = useState({
    data: null,
    displayImage: "",
    itemDetails: {},
  });
  const tabView = useMediaQuery("(max-width:800px)");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductDetailById(params.itemId);
  }, [params.itemId]);

  const getProductDetailById = async (id) => {
    setLoading(true);
    ApiDataPostType(`/customer/product/${id}`)
      .then((response) => {
        const product = response.data.response;
        console.log(product);
        if (product) {
          setProductData({
            data: product,
            displayImage: product.images?.[0]?.src ?? "",
            itemDetails: setItemDetails(product),
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setItemDetails = (product) => {
    return {
      "Product Id": product.id,
      Vendor: product.vendor,
      Handle: product.handle,
      Tags: product.tags.join(", "),
      Barcode: product.variants[0].barcode,
      Weight: product.variants[0].weight + " " + product.variants[0].weightUnit,
    };
  };

  return (
    <Box>
      <ProductTopSection
        productData={productData}
        tabView={tabView}
        setProductData={setProductData}
        loading={loading}
      />
      <ProductDescriptionSection productData={productData} tabView={tabView} loading={loading}/>
      <ProductItemdetailsSection productData={productData} tabView={tabView}/>
      <SimilarProductsSection tabView={tabView}/>
    </Box>
  );
}

export default ProductDisplay;
