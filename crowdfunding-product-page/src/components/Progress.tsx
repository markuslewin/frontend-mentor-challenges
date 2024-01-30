import { Root, Indicator } from "@radix-ui/react-progress";
import { useState } from "preact/hooks";

type Props = {
  current: number;
  goal: number;
};

const Progress = ({ current: initialCurrent, goal }: Props) => {
  const [current, setCurrent] = useState(initialCurrent);

  const value = (current / goal) * 100;

  return (
    <Root className="progress" value={value}>
      <Indicator
        className="progress__indicator"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </Root>
  );
};

export default Progress;
