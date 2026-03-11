import { useEffect, useRef, useState } from "react";
import style from "./Counter_template.module.css";

// Section component responsible for a single counter item
const Section = ({ data, counter_ref }) => {
  // Flag to ensure the counter runs only once
  const is_counter_done = useRef(false);

  // Flag to ensure scroll event is attached only once
  const animation_done = useRef(false);

  // State to store the current counter value
  const [count, set_count] = useState(0);

  // Function that handles the counter animation logic
  const counter_func = () => {
    is_counter_done.current = true;

    // Target number to reach
    const target = +data.count;

    // Total animation duration (ms)
    const time = 3000;

    // Interval time between updates (ms)
    const frame = 40;

    // Number of steps based on duration and frame
    const step = time / frame;

    // Increment value per step
    const increment = target / step;

    let counter = 0;

    // Timer to animate the counter
    const timer = setInterval(() => {
      counter += increment;

      // Update state with floored value to avoid decimals
      set_count(Math.floor(counter));

      // Stop animation when target is reached
      if (counter >= target) {
        clearInterval(timer);
      }
    }, frame);
  };

  // Scroll handler to trigger counter when section becomes visible
  const handle_event = () => {
    if (
      window.scrollY >= counter_ref.current.offsetTop - 400 &&
      !is_counter_done.current
    ) {
      counter_func();
    }
  };

  // Attach scroll event listener once
  useEffect(() => {
    // Make the animation play once
    animation_done.current = true;

    window.addEventListener("scroll", handle_event);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("scroll", handle_event);
  }, []);

  return (
    <div className={style.section}>
      <h2>+ {count}</h2>
      <p>{data.title}</p>
    </div>
  );
};

// Main component that renders all counter sections
const Counter_template = ({ counter_data }) => {
  // Reference to the counter container
  const counter_ref = useRef();

  return (
    <div ref={counter_ref} className={style.couter_template}>
      {counter_data.map((data, index) => {
        // Pass shared ref to each section
        return <Section key={index} data={data} counter_ref={counter_ref} />;
      })}
    </div>
  );
};

export default Counter_template;
