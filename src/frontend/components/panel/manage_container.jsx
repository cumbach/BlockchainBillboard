import React from 'react';
// import $ from "jquery";
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
// import SelectedPixels from './panel_components/selected_pixels';
// import CommentLinkField from './panel_components/comment_link_field';
// import TabulatedCosts from './panel_components/tabulated_costs';
// import ActionButton from './panel_components/action_button';

class ManageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.previewFile = this.previewFile.bind(this)
  }

  previewFile() {
    var preview = document.querySelector('img'); //selects the query named img
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
      setTimeout(function(){
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var img = document.getElementById('myimg');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        context.drawImage(img, 0, 0 );
        var myData = context.getImageData(0, 0, img.width, img.height);
        console.log(myData);
      }, 1000);
    }

    if (file) {
      reader.readAsDataURL(file); //reads the data as a URL
    } else {
      preview.src = "";
    }
  }

  componentDidMount() {
    this.previewFile();
  }

  render() {
    return (
      <div className='action-container manage-container'>
        Manage (THIS NEEDS TO BE CONSIDERED MORE)
        <input type="file" onChange={this.previewFile}/><br/>
        <img id="myimg" src="" alt="preview..."/>
      </div>
    );
  }
}

export default ManageContainer;
