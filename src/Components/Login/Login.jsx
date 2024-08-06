import React, { useRef, useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Image,
  Stack,
  HStack,
  PinInput,
  PinInputField,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [email, setEmail] = useState({ email: "" });
  const [show, setShow] = useState(true);
  const [otp, setOtp] = useState("");
  const [hello, setHello] = useState("Hello, Log in");
  const [changeComp, setChangeComp] = useState(true);
  const backendUrl = process.env.BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
  };

  const handleClick = async () => {
    if (!email.email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.email)) {
      alert("Incorrect Email Id");
      setShow(true);
    } 
    else {
      setShow(false);
      try {
        const res = await axios.post(`${backendUrl}/sendOtp`, email);
        console.log(res);
      } 
      catch (error) {
        console.error("Error sending OTP:", error);
        alert("Failed to send OTP. Please try again.");
      }
    }
  };

  const handleOTP = (value) => {
    setOtp(value);
  };

  const Signup = async () => {
    try {
      const res = await axios.post(`${backendUrl}/verify`, {
        email: email.email,
        otp: otp,
      });
      if (res.data.msg === "Verified successfully") {
        const signup = await axios.post(`${backendUrl}/signup`, { email: email.email });
        if (signup.data[0]?.username) {
          setHello(`Hello ${signup.data[0].username}`);
        } else {
          setHello("Hello user");
        }
        localStorage.setItem('userdetail', JSON.stringify(signup.data[0]));
        onClose();
        setShow(true);
        setChangeComp(false);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userdetail')) || { username: 'Log in' };
    setHello(`Hello ${data.username || 'user'}`);
    if (data.username !== 'Log in') {
      setShow(true);
      setChangeComp(false);
    }
  }, []);

  const logout = () => {
    setChangeComp(true);
    setHello("Hello, Log in");
    localStorage.removeItem('userdetail');
    navigate('/');
  };

  return (
    <div>
      {changeComp ? (
        <div>
          <Button
            ref={btnRef}
            onClick={onOpen}
            variant="ghost"
            color="black"
            _hover={{ bg: "transparent" }}
            fontWeight="500"
            width="100px"
            fontSize="14px"
            colorScheme="gray"
          >
            {hello}
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="sm"
          >
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
              {show ? (
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
                        name="email"
                      />
                      <Button
                        height="50px"
                        bg="#37857e"
                        color="white"
                        fontWeight="700"
                        fontSize="15px"
                        _hover={{ bg: "#2d6a4f" }}
                        onClick={handleClick}
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
              ) : (
                <div>
                  <DrawerHeader fontSize="16px" fontWeight="700">
                    Enter OTP sent to {email.email}
                  </DrawerHeader>
                  <DrawerBody>
                    <Stack gap="10px">
                      <HStack justifyContent="space-between">
                        <PinInput
                          type="alphanumeric"
                          size="lg"
                          onChange={handleOTP}
                          mask
                        >
                          <PinInputField />
                          <PinInputField />
                          <PinInputField />
                          <PinInputField />
                        </PinInput>
                      </HStack>
                      <Button
                        height="50px"
                        bg="#37857e"
                        color="white"
                        fontWeight="700"
                        fontSize="15px"
                        _hover={{ bg: "#2d6a4f" }}
                        onClick={Signup}
                      >
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
              )}
            </DrawerContent>
          </Drawer>
        </div>
      ) : (
        <div>
          <Popover trigger="hover">
            <PopoverTrigger>
              <Button
                marginLeft="5px"
                variant="link"
                fontSize="14px"
                color="gray.600"
                fontWeight="500"
              >
                {hello}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <Button
                  colorScheme="gray"
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                >
                  My Orders
                </Button>
                <Button
                  colorScheme="gray"
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                >
                  Refer & Earn
                </Button>
                <Button
                  colorScheme="gray"
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                >
                  My Refills
                </Button>
                <Button
                  colorScheme="gray"
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                >
                  Medical Records
                </Button>
                <Link to='/account'>
                  <Button
                    colorScheme="gray"
                    variant="ghost"
                    width="100%"
                    justifyContent="flex-start"
                  >
                    My Profile
                  </Button>
                </Link>
                <Button
                  colorScheme="gray"
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                >
                  Wallets
                </Button>
                <Button
                  colorScheme="gray"
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                >
                  Notifications
                </Button>
                <Button
                  fontWeight="400"
                  colorScheme="gray"
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                  onClick={logout}
                >
                  Log Out
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default Login;
