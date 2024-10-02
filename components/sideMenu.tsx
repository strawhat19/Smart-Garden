import { useState } from "react";
import MobileMenu from "./mobileMenu";
import { Modal, SwipeableDrawer } from "@mui/material";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SideMenu() {
    type Anchor = 'left';
    const [open, setOpen] = useState<any>(false);
    const [menu, setMenu] = useState<any>({left: false});

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        anchor = `left`
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
        <div className="sideMenu">

            <div className="hamburger" title="Menu" onClick={toggleDrawer(`left`, true)}>
              <span className="top"></span>
              <span className="middle"></span>
              <span className="bottom"></span>
            </div>

            <SwipeableDrawer anchor={`left`} open={menu[`left`]} onClose={toggleDrawer(`left`, false)} onOpen={toggleDrawer(`left`, true)}>
              <MobileMenu />
            </SwipeableDrawer>

            <div className="search" title="Search" onClick={(event) => setOpen(true)}>
              <FontAwesomeIcon icon={faSearch} />
            </div>

            <Modal open={open} onClose={(event) => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <div className="innerModal">
                <div className="innerContent">
                  <span className="searchText"><FontAwesomeIcon icon={faSearch} /> Search</span>
                  <input type="text" placeholder='Search' className='searchField'/>
                </div>
              </div>
            </Modal>

        </div>
    </>
}