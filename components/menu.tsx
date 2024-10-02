import { useContext } from "react";
import MobileMenu from "./mobileMenu";
import { SwipeableDrawer } from "@mui/material";
import { sharedDatabase } from "../shared/shared";

export const anchorPosition = `right`;

export default function Menu({ anchorPos = anchorPosition, showDrawer = false, style = {cursor: `pointer`} }: any) {
    let { menu, setMenu } = useContext<any>(sharedDatabase);

    const toggleDrawer = (anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      anchor = anchorPos
      if (event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setMenu({ ...menu, [anchor]: open });
    };

    return <>
        <div className="hamburger" title="Menu" onClick={toggleDrawer(anchorPos, true)} style={style}>
          <span className="top"></span>
          <span className="middle"></span>
          <span className="bottom"></span>
        </div>

        {showDrawer ? (
            <SwipeableDrawer anchor={anchorPos} open={menu[anchorPos]} onClose={toggleDrawer(anchorPos, false)} onOpen={toggleDrawer(anchorPos, true)}>
                <MobileMenu />
            </SwipeableDrawer>
        ) : <></>}
    </>
}