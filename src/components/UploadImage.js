import React, { useEffect, useState } from "react";
import firebase from "../util/firebase";

function UploadImage(props) {
  const [dataFireBase, setDataFireBase] = useState([]);
  //   const [imageUrl, setImageUrl] = useState([]);
  const [dataInput, setdataInput] = useState({
    key: "",
    title: "",
    description: "",
    image: "",
  });
  //   const readImages = async (e) => {
  //     const file = e.target.files[0];
  //     const id = "Product_" + Date.now();
  //     const storageRef = firebase.storage().ref("images").child(id);
  //     const imageRef = firebase.database().ref("images").child(id);
  //     var tutorialsRef = firebase.firestore().collection("/tutorials");
  //     await storageRef.put(file);
  //     storageRef.getDownloadURL().then((url) => {
  //       imageRef.set({ image: url, title: "Hoang" });
  //       const newState = [...imageUrl, { id, url }];
  //       setImageUrl(newState);
  //       tutorialsRef
  //         .add({
  //           title: "One",
  //           description: "Two",
  //           image: url,
  //         })
  //         .then(function (docRef) {
  //           console.log("Tutorial created with ID: ", docRef.id);
  //         })
  //         .catch(function (error) {
  //           console.error("Error adding Tutorial: ", error);
  //         });
  //     });
  //   };
  //   const getImageUrl = () => {
  //   const imageRef = firebase.database().ref("images").child("daily");
  //   imageRef.on("value", (snapshot) => {
  //     const imageUrls = snapshot.val();
  //     const urls = [];
  //     for (let id in imageUrls) {
  //       urls.push({ id, url: imageUrl[id] });
  //     }
  //     const newState = [...imageUrl, ...urls];
  //     setImageUrl(newState);
  //   });
  //   };
  //   const deleteImage = (id) => {
  //     const storageRef = firebase.storage().ref("images").child(id);
  //     const imageRef = firebase.database().ref("images").child("daily").child(id);
  //     storageRef.delete().then(() => {
  //       imageRef.remove();
  //     });
  //   };
  const handleClickGetAll = () => {
    var tutorialsRef = firebase.firestore().collection("/tutorials");
    /*Cách 1 */
    tutorialsRef.onSnapshot((querySnapshot) => {
      const boards = [];
      querySnapshot.forEach((doc) => {
        const { title, description, image } = doc.data();
        boards.push({ key: doc.id, title, description, image });
        console.log(boards, "boards");
      });
      setDataFireBase(boards);
    });
    /*Cách 2  */
    // tutorialsRef.get().then(function (snapshot) {
    //   snapshot.forEach(function (childSnapshot) {
    //     const { title, description, url } = childSnapshot.data();
    //     setDataFireBase({ title, description, url });
    //     console.log(DataFireBase, "one");
    //   });
    // });
  };
  const deleteItem = (id) => {
    firebase
      .firestore()
      .collection("/tutorials")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        setdataInput({ title: "", description: "", image: "", key: "" });

        // this.props.history.push("/");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  useEffect(() => {
    // getImageUrl()
    handleClickGetAll();
  }, []);
  const handlText = (e) => {
    // const file = e.target.files;

    const { value, name } = e.target;
    // console.log(value, name, "3333333333", e);
    if (name === "image") {
      if (e.target.files.length > 0 && e.target.files !== null) {
        const file = e.target.files[0];
        setdataInput((prevState) => ({
          ...prevState,
          image: file,
        }));
      }
      // console.log(e.target.files[0], "handleSubmit");
    } else {
      setdataInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const sumbitSaveProduct = async (e) => {
    e.preventDefault();
    console.log(typeof dataInput.image);
    // console.log(e);
    const id = "Product_" + Date.now();
    const storageRef = firebase.storage().ref("images").child(id);
    // // const imageRef = firebase.database().ref("images").child(id);
    var tutorialsRef = firebase.firestore().collection("/tutorials");
    if (dataInput.key === "") {
      await storageRef.put(dataInput.image);
      storageRef.getDownloadURL().then((url) => {
        //   imageRef.set({ image: url, title: "Hoang" });
        tutorialsRef
          .add({
            title: dataInput.title,
            description: dataInput.description,
            image: url,
          })
          .then(function (docRef) {
            setdataInput({ title: "", description: "", image: "", key: "" });

            console.log("Tutorial created with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding Tutorial: ", error);
          });
      });
    } else {
      if (typeof dataInput.image === "string") {
        const updateRef = firebase
          .firestore()
          .collection("tutorials")
          .doc(dataInput.key);
        updateRef
          .set({
            title: dataInput.title,
            description: dataInput.description,
            image: dataInput.image,
          })
          .then((docRef) => {
            setdataInput({ title: "", description: "", image: "", key: "" });
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      } else {
        await storageRef.put(dataInput.image);
        storageRef.getDownloadURL().then((url) => {
          //   imageRef.set({ image: url, title: "Hoang" });
          const updateRef = firebase
            .firestore()
            .collection("tutorials")
            .doc(dataInput.key);
          updateRef
            .set({
              title: dataInput.title,
              description: dataInput.description,
              image: url,
            })
            .then((docRef) => {
              setdataInput({ title: "", description: "", image: "", key: "" });
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        });
      }
    }
  };
  const editItem = (id) => {
    const ref = firebase.firestore().collection("tutorials").doc(id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        setdataInput({
          key: doc.id,
          title: board.title,
          description: board.description,
          image: board.image,
        });
      } else {
        console.log("No such document!");
      }
    });
  };
  return (
    <div>
      <h1>Upload Image</h1>

      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>description</th>
            <th>url</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataFireBase.length > 0 &&
            dataFireBase.map((data, index) => (
              <tr key={index}>
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>
                  <img src={data.image} width="150px" height="150px"></img>
                </td>
                <td>
                  <button onClick={() => editItem(data.key)}>Edit</button>
                  <button onClick={() => deleteItem(data.key)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {dataInput.key === "" ? <h1>Cread</h1> : <h1>Edit</h1>}

      <form onSubmit={sumbitSaveProduct} enctype="multipart/form-data">
        <input
          type="text"
          name="title"
          onChange={handlText}
          value={dataInput.title}
        ></input>
        <br></br>
        <input
          type="text"
          name="description"
          onChange={handlText}
          value={dataInput.description}
        ></input>
        
        <br></br>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handlText}
          key={dataInput.image}
        />
        <br></br>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UploadImage;
