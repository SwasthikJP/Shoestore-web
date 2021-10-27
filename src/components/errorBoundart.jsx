import React from "react";
import meme from "../images/Bhaisahab-Ye-Kis-Line-Mei-Aa-Gaye-Aap-meme-template-of-welcome-movie.jpg";
import "../css files/errorboundary.css";
export default class ErrorBoundary extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  

  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return  <div className="error_column">
          <h1 >ERROR 404</h1>
            <img src={meme} alt="meme" />
          
          <p className="err_p">Page not found, <a href="https://web-shoestore.netlify.app/">Click here to return to the Home page.</a></p>
          </div>;
        
      }
  
      return this.props.children; 
    }
  }