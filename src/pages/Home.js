// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { Card, PageHeader, Skeleton } from "antd";
// import "./Home.css";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Button, Popover } from "antd";
// import {
//   CaretDownOutlined,
//   LogoutOutlined,
//   MailOutlined,
// } from "@ant-design/icons";

// const { Meta } = Card;

// const Home = () => {
//   const { user } = useSelector((state) => state.user);

//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleScroll = useCallback(() => {
//     if (
//       window.innerHeight + window.scrollY >=
//       document.documentElement.scrollHeight - 5
//     ) {
//       setPage((prevPage) => prevPage + 1);
//       fetchData();
//     }
//   }, []);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://randomuser.me/api/?results=20&page=${page}`
//       );
//       setUsers((prevUsers) => [...prevUsers, ...response.data.results]);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setLoading(false);
//     }
//   };
//   function formatDate(dateString) {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();

//     return `${day}/${month}/${year}`;
//   }

//   return (
//     <div className="site-page-header-home">
//       <PageHeader
//         className="site-page-header"
//         title="C.I"
//         subTitle="Contact Info"
//         extra={[
//           <h4 style={{ color: "grey" }} className="about-contact">
//             <Popover
//               placement="bottom"
//               content={
//                 <div>
//                   <p style={{ fontSize: "16px" }}>
//                     <MailOutlined /> : {user?.email}
//                   </p>
//                   <p
//                     onClick={() => {
//                       localStorage.clear();
//                       navigate("/login");
//                     }}
//                     style={{ cursor: "pointer", fontSize: "15px" }}
//                   >
//                     <LogoutOutlined /> {"  "}
//                     Logout
//                   </p>
//                 </div>
//               }
//             >
//               {user?.name}
//               <CaretDownOutlined />
//             </Popover>
//           </h4>,
//         ]}
//       />
//       <div className="card-container">
//         {users.map((contactUser, index) => (
//           <div key={index} className="card-wrapper">
//             <Card
//               hoverable
//               style={{ width: 330, height: 480, cursor: "pointer" }}
//               cover={<img alt="example" src={contactUser.picture.medium} />}
//             >
//               <Skeleton loading={loading} active>
//                 <Meta
//                   title={
//                     contactUser.name.title +
//                     ". " +
//                     contactUser.name.first +
//                     " " +
//                     contactUser.name.last
//                   }
//                   description={contactUser.email}
//                 />
//                 <p>{contactUser.phone + " / " + contactUser.cell}</p>
//                 <br />
//                 <div className="popJustify">
//                   <Popover
//                     content={
//                       <div>
//                         <p>
//                           {contactUser.location.street.number +
//                             " " +
//                             contactUser.location.street.name}
//                         </p>
//                         <p>
//                           {contactUser.location.city +
//                             ", " +
//                             contactUser.location.state +
//                             "- " +
//                             contactUser.location.postcode}
//                         </p>
//                         <p>{contactUser.location.country}</p>
//                         <p></p>
//                       </div>
//                     }
//                     title="Address"
//                   >
//                     Address
//                   </Popover>
//                   <Popover
//                     content={
//                       <div>
//                         <p>{"Age : " + contactUser.dob.age}</p>
//                         <p>{"Gender : " + contactUser.gender}</p>
//                         <p>{"D.O.B : " + formatDate(contactUser.dob.date)}</p>

//                         <p></p>
//                       </div>
//                     }
//                     title="Address"
//                   >
//                     Personal Details
//                   </Popover>
//                 </div>
//               </Skeleton>
//             </Card>
//           </div>
//         ))}
//       </div>
//       {loading && (
//         <div className="loading-container">
//           <Skeleton active />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Card, PageHeader, Skeleton } from "antd";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Popover } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  LogoutOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const Home = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = useCallback(() => {
    // Show the 'Back to Top' button when the scroll position is greater than 200
    setShowBackToTop(window.scrollY > 200);

    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 5
    ) {
      setPage((prevPage) => prevPage + 1);
      fetchData();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://randomuser.me/api/?results=20&page=${page}`
      );
      setUsers((prevUsers) => [...prevUsers, ...response.data.results]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="site-page-header-home">
      <PageHeader
        className="site-page-header"
        title="C.I"
        subTitle="Contact Info"
        extra={[
          <h4 style={{ color: "grey" }} className="about-contact">
            <Popover
              placement="bottom"
              content={
                <div>
                  <p style={{ fontSize: "16px" }}>
                    <MailOutlined /> : {user?.email}
                  </p>
                  <p
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                    style={{ cursor: "pointer", fontSize: "15px" }}
                  >
                    <LogoutOutlined /> {"  "}
                    Logout
                  </p>
                </div>
              }
            >
              {user?.name}
              <CaretDownOutlined />
            </Popover>
          </h4>,
        ]}
      />
      <div className="card-container">
        {users.map((contactUser, index) => (
          <div key={index} className="card-wrapper">
            <Card
              hoverable
              style={{ width: 330, height: 480, cursor: "pointer" }}
              cover={<img alt="example" src={contactUser.picture.medium} />}
            >
              <Skeleton loading={loading} active>
                <Meta
                  title={
                    contactUser.name.title +
                    ". " +
                    contactUser.name.first +
                    " " +
                    contactUser.name.last
                  }
                  description={contactUser.email}
                />
                <p>{contactUser.phone + " / " + contactUser.cell}</p>
                <br />
                <div className="popJustify">
                  <Popover
                    content={
                      <div>
                        <p>
                          {contactUser.location.street.number +
                            " " +
                            contactUser.location.street.name}
                        </p>
                        <p>
                          {contactUser.location.city +
                            ", " +
                            contactUser.location.state +
                            "- " +
                            contactUser.location.postcode}
                        </p>
                        <p>{contactUser.location.country}</p>
                        <p></p>
                      </div>
                    }
                    title="Address"
                  >
                    Address
                  </Popover>
                  <Popover
                    content={
                      <div>
                        <p>{"Age : " + contactUser.dob.age}</p>
                        <p>{"Gender : " + contactUser.gender}</p>
                        <p>{"D.O.B : " + formatDate(contactUser.dob.date)}</p>

                        <p></p>
                      </div>
                    }
                    title="Address"
                  >
                    Personal Details
                  </Popover>
                </div>
              </Skeleton>
            </Card>
          </div>
        ))}
      </div>
      {loading && (
        <div className="loading-container">
          <Skeleton active />
        </div>
      )}
      <Button
        type="primary"
        shape="circle"
        icon={<CaretUpOutlined />}
        size="large"
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 1000,
          display: showBackToTop ? "block" : "none",
        }}
      />
    </div>
  );
};

export default Home;
