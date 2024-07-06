import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";
import './PostThumbnail.css'; // Import the custom CSS file if needed

const PostThumbnail = (props) => {

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <Link
      to={"/post/" + props.post.id}
      as={NavLink}
      className="thumbnail"
    >
      <motion.div
        className="h-100"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <Card className="h-100 boxShadow bg-primary-light text-primary-dark">
          <Card.Header className="border rounded m-2 fs-4 bg-accent-light text-primary-dark text-center">
          {props.post.title}
            
          </Card.Header>
          <Card.Body className="border rounded m-2" >
            <Card.Title className=" fs-6 text-center  text-primary-dark">{props.post.blogUser} ✨</Card.Title>
            <Card.Text style={{ textAlign: "justify" }} className=" text-secondary">
              {props.post.content.slice(0, 200) + " . . ."}
            </Card.Text>
          </Card.Body>
          
        </Card>
      </motion.div>
    </Link>
  );
};

export default PostThumbnail;
