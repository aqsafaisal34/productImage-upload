import './App.css';
import axios from 'axios';
import { useEffect, useState } from "react";

function App() {

const [productname, setproductname] = useState("")
const [productdescription, setproductdescription] = useState("")
const [ productprice, setproductprice] = useState("")
const [ productcode, setproductcode] = useState("")

const [products, setproducts] = useState([]);
const [toggleRefresh, setToggleRefresh] = useState(true);

useEffect(() => {

  let getAllProducts = async () => {
    let response = await axios.get('http://localhost:5001/users');
    setproducts(response.data.data)
  }
  getAllProducts();

}, [toggleRefresh])





  const addProduct = async (e) => {
    e.preventDefault();

    
    var productImage = document.getElementById("productImage");
    console.log("fileInput: ", productImage.files); // local url


    let formData = new FormData();
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax


    formData.append("productname", productname); // this is how you add some text data along with file
    formData.append("productdescription", productdescription); // this is how you add some text data along with file
    formData.append("productprice", productprice); // this is how you add some text data along with file
     formData.append("productcode", productcode); // this is how you add some text data along with file

    formData.append("productImage", productImage.files[0]); // file input is for browser only, use fs to read file in nodejs client


    axios({
      method: 'post',
      url: "http://localhost:5001/",
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      // withCredentials: true
    })
      .then(res => {
        console.log(`upload Success` + res.data);
        setToggleRefresh(!toggleRefresh);
        
      })
      .catch(err => {
        console.log(err);
      })


  }



    return (
      <div className="App">

        <form onSubmit={addProduct} >
          Product Name: <input name="productname" type="text" required id="productname" onChange={(e)=>{setproductname(e.target.value)}} />
          <br />
          Description: <input name="productdescription" type="text"  required id="productdescription" onChange={(e)=>{setproductdescription(e.target.value)}} />
          <br />
          Price: <input name="productprice" type="number"  required id="productprice" onChange={(e)=>{setproductprice(e.target.value)}}  />
          <br />
          Code: <input name="productcode" type="number"  required id="productcode" onChange={(e)=>{setproductcode(e.target.value)}} />
          <br />
          Picture: <input name="productImage" type="file" id="productImage" accept="image/*" onChange={() => {
            ////// to display imager instantly on screen
            var productImage = document.getElementById("productImage");
            var url = URL.createObjectURL(productImage.files[0])
            console.log("url: ", url);
            document.getElementById("img").innerHTML = `<img width="200px" src="${url}" alt="" id="img"> `
          }}
          />

          <div id="img"></div>
          <br />
          <br />
          <button type="submit">Add Product</button>

        </form>

        <h1>Products List: </h1>

<div>
  {products.map(eachproduct => (
    <div key={eachproduct.id}>
      <span>{eachproduct.productname}</span>
      <span>{eachproduct.productdescription}</span>
      <img width="100px" src={eachproduct.profilePicture} alt="" />
    </div>
  ))}
</div>


      </div>
    );
  }
  export default App;


