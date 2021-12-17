import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  grid-gap: 10px;
`;

const Box = styled(motion.div)`
  background-color: #f599eb;
  border-radius: 10px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled(motion.button)`
  margin-top: 50px;
  width: 70px;
  height: 30px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const boxVariants = {
  hover: { scale: 1.2 },
};

const btnVariants = {
  start: (clicked: boolean) => ({
    color: clicked ? "#2f72ff" : "#f4b182",
    opacity: 0,
    scale: 0,
  }),
  end: (clicked: boolean) => ({
    color: clicked ? "#f4b182" : "#2f72ff",
    opacity: 1,
    scale: 1,
    transiton: {
      duration: 0.3,
    },
  }),
};

function Challenge() {
  const [id, setId] = useState<null | string>(null);
  const [clicked, setClciked] = useState(false);
  const toggleClicked = () => setClciked((prev) => !prev);
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            onClick={() => setId(n)}
            variants={boxVariants}
            whileHover="hover"
            custom={n}
            key={n}
            layoutId={n}
            style={{
              transformOrigin:
                n === "1"
                  ? "bottom right"
                  : n === "2"
                  ? "bottom left"
                  : n === "3"
                  ? "top right"
                  : "top left",
            }}
          >
            {n === "2" && clicked ? <Circle layoutId="circle" /> : null}
            {n === "3" && !clicked ? <Circle layoutId="circle" /> : null}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              style={{ width: 400, height: 300, backgroundColor: "white" }}
            />
          </Overlay>
        ) : null}
        <Btn
          custom={clicked}
          variants={btnVariants}
          initial="start"
          animate="end"
          exit="exit"
          onClick={toggleClicked}
        >
          switch
        </Btn>
      </AnimatePresence>
    </Wrapper>
  );
}

export default Challenge;
