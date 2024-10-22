import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Widget } from "./Item";
import "./style.css";

export const Widgets = ({ weather, removeWidget }) => {
  return (
    <TransitionGroup className="widget-wrapper">
      {weather?.map((data, index) => {
        const { nodeRef, id, weather, main, name } = data || {};

        return (
          <CSSTransition
            key={id}
            timeout={500}
            classNames={{
              enter: "item-enter",
              enterActive: "item-enter-active",
              exitActive: "item-exit-active",
              exit: "item-exit",
            }}
          >
            <Widget
              condition={weather?.[0].main}
              icon={weather?.[0]?.icon}
              name={name || "City"}
              temp={main?.temp}
              removeWidget={() => removeWidget(index, nodeRef)}
            />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};
