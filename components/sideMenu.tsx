import Menu from "./menu";
import { useContext } from "react";
import { Modal } from "@mui/material";
import { sharedDatabase } from "../shared/shared";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SideMenu() {
    let { open, setOpen } = useContext<any>(sharedDatabase);

    return <>
      <div className="sideMenu">

        <Menu showDrawer={true} />

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