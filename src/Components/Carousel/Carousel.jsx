import React, { useRef } from "react";
import { CarouselData } from "./CarouselData";
import { Box, Stack, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Carousel = () => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <Box position="relative" width="100%" overflow="hidden">
      <Stack
        direction="row"
        gap="40px"
        justify="space-between"
        width="95%"
        margin="auto"
        marginTop="50px"
        overflowX="scroll"
        ref={carouselRef}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',  /* Firefox */
        }}
      >
        {CarouselData.map((el, i) => (
          <img
            style={{
              borderRadius: "15px",
              width: "527px",
              height: "227px",
              cursor: "pointer",
            }}
            key={i}
            src={el.img}
            alt=""
          />
        ))}
      </Stack>

      {/* Left Arrow Button */}
      <IconButton
        aria-label="Scroll Left"
        icon={<ChevronLeftIcon />}
        position="absolute"
        top="60%"
        left="10px"
        transform="translateY(-50%)"
        zIndex="1"
        size="sm"
        colorScheme="teal"
        backgroundColor="#30363C"
        color="white"
        borderRadius="50%"
        width="40px"
        height="40px"
        onClick={scrollLeft}
      />

      {/* Right Arrow Button */}
      <IconButton
        aria-label="Scroll Right"
        icon={<ChevronRightIcon />}
        position="absolute"
        top="60%"
        right="10px"
        transform="translateY(-50%)"
        zIndex="1"
        size="sm"
        colorScheme="teal"
        backgroundColor="#30363C"
        color="white"
        borderRadius="50%"
        width="40px"
        height="40px"
        onClick={scrollRight}
      />

      <Box position="absolute" bottom="-30px" left="50px">
        <input type="range" min="1" max="100" />
      </Box>
    </Box>
  );
};

export default Carousel;
