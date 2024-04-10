import React, { useState, useEffect, useRef } from "react";
import './singleselect.scss';

const Dropdown = ({ data, placeholder, defaultDropdownItem, onSelectChange }) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultDropdownItem || null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id) => {
    const clickedItem = data.find((item) => item.id === id);
    setSelectedItem(clickedItem);
    onSelectChange(clickedItem);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Update the selected item when the defaultDropdownItem prop changes
  useEffect(() => {
    setSelectedItem(defaultDropdownItem || null);
  }, [defaultDropdownItem]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedItem ? selectedItem.label : placeholder}
        <img
          src="https://www.svgrepo.com/show/80156/down-arrow.svg"
          alt="arrow"
          style={{ transform: `${isOpen ? "rotate(180deg)" : "none"}`, width: "25px", transition: "0.6s ease" }}
        />
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}
      style={{transition: "0.5s ease-in-out" }}
      >
        {data.map((item) => (
          <div
            key={item.id}
            className={`dropdown-item ${selectedItem && item.id === selectedItem.id ? "selected" : "false"}`}
            onClick={() => handleItemClick(item.id)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export const SingleSelect = ({dropdowns}) => {
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
      dropdowns.forEach(dropdown => {
          const defaultItem = dropdown.defaultItem;
          if (defaultItem) {
              handleDropdownChange(dropdown.id, defaultItem);
          }
      });
  }, []);

  const handleDropdownChange = (dropdownId, selectedItem) => {
      setSelectedData(prevData => ({
          ...prevData,
          [dropdownId]: selectedItem
      }));
  };

  return (
      <>
          <div className="dropdownParent" id="dropdownParent">
              {dropdowns.map(dropdown => (
                  <div className="calculate-box" key={dropdown.id}>
                      <Dropdown
                          key={dropdown.id}
                          data={dropdown.data}
                          placeholder={dropdown.placeholder}
                          defaultItem={selectedData[dropdown.id]}
                          defaultDropdownItem={selectedData[dropdown.id]}
                          onSelectChange={(selectedItem) => handleDropdownChange(dropdown.id, selectedItem)}
                      />
                  </div>
              ))}
          </div>
      </>
  );
}

export default SingleSelect;