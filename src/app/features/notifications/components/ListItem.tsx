import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Transition } from "react-transition-group";
import moment from "moment";
import { type NotificationProps } from "../Notifications.types";
import { actions } from "../notifications.slice";
import { Button } from "../../../components";

const ListItem = ({ date, id, message }: NotificationProps) => {
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();

  const nodeRef = useRef(null);

  useEffect(() => setIsActive(true), []);

  return (
    <Transition
      in={isActive}
      key={id}
      nodeRef={nodeRef}
      onExited={() => dispatch(actions.remove(id))}
      timeout={300}
    >
      {(state: string) => (
        <li data-animation-state={state} data-test={5000} ref={nodeRef}>
          <div>
            <span>{message}</span>
            <time>{moment(date).fromNow()}</time>
          </div>
          <Button
            onClick={() => setIsActive(false)}
            title="Remove Notification"
            variant="text"
          >
            <svg
              height="16px"
              width="16px"
              version="1.1"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <g>
                  <polygon
                    points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 
                512,452.922 315.076,256"
                  />
                </g>
              </g>
            </svg>
          </Button>
        </li>
      )}
    </Transition>
  );
};

export default ListItem;
