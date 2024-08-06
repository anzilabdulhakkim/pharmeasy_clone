import React, { useRef, useState, useEffect } from "react";
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Button, Input, Image, Stack, HStack, PinInput, PinInputField, Popover, PopoverTrigger, PopoverContent, PopoverBody,} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [email, setEmail] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [helloMessage, setHelloMessage] = useState("Hello, Log in");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const backendUrl = process.env.BACKEND_URL;

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendOtp = async () => {
    if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert("Incorrect Email Id");
      return;
    }
    try {
      const res = await axios.post(`${backendUrl}/otp/sendOtp`, { email });
      if (res.data.msg === 'OTP sent successfully') {
        setShowOtpInput(true);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(`${backendUrl}/otp/verify`, { email, otp });
      if (res.data.msg === "Verified Successfully") {
        const signupRes = await axios.post(`${backendUrl}/users/signup`, { email });
        if (signupRes.data.username) {
          setHelloMessage(`Hello ${signupRes.data.username}`);
        } else {
          setHelloMessage("Hello user");
        }
        localStorage.setItem('userdetail', JSON.stringify(signupRes.data));
        onClose();
        setShowOtpInput(false);
        setIsLoggedIn(true);
      } else {
        alert("Incorrect OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Failed to verify OTP. Please try again.");
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userdetail'));
    if (data?.username) {
      setHelloMessage(`Hello ${data.username}`);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userdetail');
    setHelloMessage("Hello, Log in");
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Popover trigger="hover">
            <PopoverTrigger>
              <Button variant="link" fontSize="14px" color="gray.600" fontWeight="500">
                {helloMessage}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <Link to='/orders'>
                  <Button colorScheme="gray" variant="ghost" width="100%" justifyContent="flex-start">
                    My Orders
                  </Button>
                </Link>
                <Link to='/refer'>
                  <Button colorScheme="gray" variant="ghost" width="100%" justifyContent="flex-start">
                    Refer & Earn
                  </Button>
                </Link>
                <Link to='/refills'>
                  <Button colorScheme="gray" variant="ghost" width="100%" justifyContent="flex-start">
                    My Refills
                  </Button>
                </Link>
                <Link to='/medical-records'>
                  <Button colorScheme="gray" variant="ghost" width="100%" justifyContent="flex-start">
                    Medical Records
                  </Button>
                </Link>
                <Link to='/account'>
                  <Button colorScheme="gray" variant="ghost" width="100%" justifyContent="flex-start">
                    My Profile
                  </Button>
                </Link>
                <Link to='/wallets'>
                  <Button colorScheme="gray" variant="ghost" width="100%" justifyContent="flex-start">
                    Wallets
                  </Button>
                </Link>
                <Link to='/notifications'>
                  <Button colorScheme="gray" variant="ghost" width="100%" justifyContent="flex-start">
                    Notifications
                  </Button>
                </Link>
                <Button colorScheme="gray" variant="ghost" width="100%" justifyContent="flex-start" onClick={handleLogout}>
                  Log Out
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div>
          <Button ref={btnRef} onClick={onOpen} variant="ghost" color="black" _hover={{ bg: "transparent" }} fontWeight="500" width="100px" fontSize="14px" colorScheme="gray">
            {helloMessage}
          </Button>
          <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size="sm">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton
                marginRight="436px"
                style={{
                  backgroundColor: "#10847E",
                  padding: "30px",
                  border: "none",
                  color: "white",
                  marginTop: "20px",
                  borderRadius: "0px",
                }}
              />
              <Image src="https://i.postimg.cc/x1dpN9GZ/Screenshot-2022-07-21-at-7-20-12-PM.png" />
              {showOtpInput ? (
                <div>
                  <DrawerHeader fontSize="16px" fontWeight="700">
                    Enter OTP sent to {email}
                  </DrawerHeader>
                  <DrawerBody>
                    <Stack gap="10px">
                      <HStack justifyContent="space-between">
                        <PinInput type="alphanumeric" size="lg" onChange={setOtp} mask>
                          <PinInputField />
                          <PinInputField />
                          <PinInputField />
                          <PinInputField />
                        </PinInput>
                      </HStack>
                      <Button height="50px" bg="#37857e" color="white" fontWeight="700" fontSize="15px" _hover={{ bg: "#2d6a4f" }} onClick={handleVerifyOtp}>
                        Continue
                      </Button>
                      <p style={{ fontSize: "13px" }}>
                        By clicking continue, you agree with our
                        <span style={{ color: "#37857e", fontWeight: "600" }}>
                          {" "}
                          Privacy Policy
                        </span>
                      </p>
                    </Stack>
                  </DrawerBody>
                </div>
              ) : (
                <div>
                  <DrawerHeader fontSize="16px" fontWeight="700">
                    Quick Login / Register
                  </DrawerHeader>
                  <DrawerBody>
                    <Stack gap="10px">
                      <Input
                        borderRadius="8px"
                        height="50px"
                        borderColor="#767676"
                        _hover={{ borderColor: "#767676" }}
                        type="email"
                        placeholder="Enter your email address"
                        onChange={handleChange}
                        value={email}
                      />
                      <Button
                        height="50px"
                        bg="#37857e"
                        color="white"
                        fontWeight="700"
                        fontSize="15px"
                        _hover={{ bg: "#2d6a4f" }}
                        onClick={handleSendOtp}
                      >
                        Send OTP
                      </Button>
                      <p style={{ fontSize: "13px" }}>
                        By clicking continue, you agree with our
                        <span style={{ color: "#37857e", fontWeight: "600" }}>
                          {" "}
                          Privacy Policy
                        </span>
                      </p>
                    </Stack>
                  </DrawerBody>
                </div>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </div>
  );
};

export default Login;
