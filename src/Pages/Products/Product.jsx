import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import styles from "./product.module.css";
import React, { useEffect, useState } from "react";
import { FaShareAlt, FaStar, FaRegStar } from "react-icons/fa";
import { TiStarHalfOutline } from "react-icons/ti";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import SimilarProductSlider from "./SimilarProductSlider";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleProduct = () => {
  const [product, setProduct] = useState(null); // Initialize as null to handle loading state
  const { id } = useParams();
  const [showImg, setShowImg] = useState("");
  const [qty, setQty] = useState(0);
  const [precart, setPrecart] = useState(
    JSON.parse(localStorage.getItem("cartitem")) || []
  );

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products?category=homecare`)
      .then((res) => {
        const foundProduct = res.data.find((prod) => prod._id === id);
        if (foundProduct) {
          setProduct(foundProduct);
          setShowImg(foundProduct.img1);
        } else {
          console.error("Product not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
    setQty(precart.length);
  }, [id, precart.length]);

  const addCartHandler = (product) => {
    const newCart = [...precart, { ...product, qty: 1 }];
    localStorage.setItem("cartitem", JSON.stringify(newCart));
    setPrecart(newCart);
  };

  if (!product) {
    return <Text>Loading...</Text>; // Display loading state while fetching
  }

  return (
    <Box px="40px">
      <Box marginTop="10px">
        <Flex className="content" justify="space-between">
          <div className={styles.leftInd}>
            <Box>
              <Flex className="product" h="340px" justify="space-between">
                <Flex
                  className="img"
                  w="30%"
                  direction="column"
                  justify="space-between"
                  position="relative"
                >
                  <Flex
                    overflow="hidden"
                    h="76%"
                    border="1.5px solid #e5e5e5"
                    borderRadius="md"
                    align="center"
                    justify="center"
                    p="10px"
                    cursor="pointer"
                  >
                    <div className={styles.figure}>
                      {showImg && (
                        <img className={styles.mainimage} src={showImg} alt="Product" />
                      )}
                    </div>
                  </Flex>
                  <Flex h="20%" justify="space-between">
                    {product.img1 && (
                      <Center
                        onMouseOver={() => setShowImg(product.img1)}
                        overflow="hidden"
                        className="img1"
                        border="1.5px solid #e5e5e5"
                        borderRadius="md"
                        w="23%"
                        cursor="pointer"
                      >
                        <Image
                          w="75%"
                          transition="all 0.4s ease"
                          _hover={{ transform: "scale(1.2)" }}
                          src={product.img1}
                        />
                      </Center>
                    )}
                    {product.img2 && (
                      <Center
                        onMouseOver={() => setShowImg(product.img2)}
                        overflow="hidden"
                        className="img2"
                        border="1.5px solid #e5e5e5"
                        borderRadius="md"
                        w="23%"
                        cursor="pointer"
                      >
                        <Image
                          w="75%"
                          transition="all 0.4s ease"
                          _hover={{ transform: "scale(1.2)" }}
                          src={product.img2}
                        />
                      </Center>
                    )}
                    {product.img3 && (
                      <Center
                        onMouseOver={() => setShowImg(product.img3)}
                        overflow="hidden"
                        className="img3"
                        border="1.5px solid #e5e5e5"
                        borderRadius="md"
                        w="23%"
                        cursor="pointer"
                      >
                        <Image
                          w="75%"
                          transition="all 0.4s ease"
                          _hover={{ transform: "scale(1.2)" }}
                          src={product.img3}
                        />
                      </Center>
                    )}
                  </Flex>
                  <IconButton
                    aria-label="Share"
                    isRound="true"
                    position="absolute"
                    size="sm"
                    bottom="90"
                    right="2"
                    icon={<FaShareAlt color="gray" />}
                  />
                </Flex>

                <Box
                  className="description"
                  w="65%"
                  position="relative"
                  textAlign="left"
                  color="#4f585e"
                  py="10px"
                >
                  <Text
                    isTruncated="true"
                    fontSize="20px"
                    fontWeight="700"
                    noOfLines={1}
                    height="30px"
                  >
                    {product.name}
                  </Text>
                  <Text fontSize="14" color="#0f847e" py="6px">
                    Visit {product.storename} Store
                  </Text>
                  <Flex
                    className="rating"
                    paddingBottom="20px"
                    w="35%"
                    justify="space-between"
                    align="center"
                  >
                    <Flex color="#ffd344" fontSize="20px" align="center">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <TiStarHalfOutline fontSize="24px" />
                      <FaRegStar />
                    </Flex>
                    <Text color="#8e9ca7" fontSize="14px">
                      (1180 ratings)
                    </Text>
                  </Flex>
                  <Flex
                    className="price"
                    h="2rem"
                    align="center"
                    w="40%"
                    justify="space-between"
                  >
                    <Text fontSize="20px" fontWeight="700">
                      ₹ {product.offprice}
                    </Text>
                    <Text fontSize="14px" fontWeight="400" color="#8e9ca7">
                      MRP{" "}
                      <span style={{ textDecoration: "line-through" }}>
                        ₹ {product.price}
                      </span>{" "}
                    </Text>
                    <Flex
                      align="center"
                      justify="start"
                      px="6px"
                      color="white"
                      fontSize="11px"
                      fontWeight="600"
                      height="72%"
                      w="36%"
                      bgImage='url("https://assets.pharmeasy.in/web-assets/dist/1602b4ce.svg")'
                    >
                      {product.offpercentage} % OFF
                    </Flex>
                  </Flex>
                  <Text fontSize="10px" color="#8e9ca7">
                    Inclusive of all taxes
                  </Text>
                  <Text py="10px" fontSize="12px">
                    Delivery by{" "}
                    <span style={{ fontWeight: "700" }}>
                      Tomorrow, before 10:00 pm
                    </span>
                  </Text>
                  <Button
                    className="addToStore"
                    position="absolute"
                    variant="#0f847e"
                    bg="#0f847e"
                    color="white"
                    fontWeight="700"
                    fontSize="16px"
                    right="4"
                    top="28"
                    height="2.8rem"
                    w="9rem"
                    onClick={() => addCartHandler(product)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Flex>
            </Box>
            <SimilarProductSlider />
          </div>
          <Box className="right" w="25%" color="#4f585e" textAlign="left">
            <Box className="cartDetails" padding="10px 0">
              <Text fontSize="16" fontWeight="600" py="30px">
                {qty} Items in Cart
              </Text>
              <Link to="/cart">
                <Button
                  className="viewCart"
                  variant="#0f847e"
                  bg="#0f847e"
                  color="white"
                  fontWeight="700"
                  h="3rem"
                  fontSize="16px"
                  transition="all 0.4s ease"
                  borderRadius="md"
                  w="100%"
                  display="flex"
                  align="center"
                  _hover={{ bg: "#075854", transition: "all 0.4s ease" }}
                >
                  View Cart <BiChevronRight fontSize="25px" />
                </Button>
              </Link>
            </Box>
            <Box
              className="offers"
              marginY="50px"
              border="1px dashed pink"
              borderRadius="5px"
              p="15px"
            >
              <Flex justify="space-between" align="center" mb="10px">
                <Text fontSize="14px" fontWeight="700">
                  Offers Just for you
                </Text>
                <Text
                  fontSize="12px"
                  fontWeight="700"
                  color="#0f847e"
                  cursor="pointer"
                >
                  View All
                </Text>
              </Flex>
              <Flex
                align="center"
                fontSize="12px"
                fontWeight="600"
                gap="10px"
                mb="10px"
              >
                <Image
                  src="https://cms-contents.pharmeasy.in/offer/60165886431-ten_per.jpg?dim=32x32&q=75"
                  alt="Offer"
                  width="6"
                  height="6"
                />
                <Text>Get extra 10% Off on Everherb, Liveasy or PharmEasy products</Text>
              </Flex>
              <Flex
                align="center"
                fontSize="12px"
                fontWeight="600"
                gap="10px"
                mb="10px"
              >
                <Image
                  src="https://cms-contents.pharmeasy.in/offer/727244967b6-cred-2.jpg?dim=32x32&q=75"
                  alt="Offer"
                  width='6'
                  height='6'
                />
                <Text>Get Upto ₹250 cashback using CRED pay UPI</Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default SingleProduct;
